# NeverRest Cross-Game Marketplace
![896shots_so](https://github.com/user-attachments/assets/4b3562e3-01a0-471f-b3dd-aeb802b879d8)


## Overview
The **Cross-Game Marketplace** is a blockchain-powered platform built on **Polkadot's modular infrastructure** that enables seamless transfer and ownership of digital assets across different games. This solution allows players to carry their in-game items, such as NFTs, skins, and digital currencies, between games, while also allowing brands like Nike and Gucci to tokenize their assets and extend their reach in the gaming ecosystem.

Our marketplace leverages **Polkadot's Substrate framework**, ensuring **scalability**, **shared security**, and **native interoperability**. Players can own, buy, and sell items across various games, enhancing both gameplay experience and brand engagement.

### Key Features:
- **Cross-game interoperability**: Transfer assets across games and ecosystems.
- **Tokenized assets**: Use NFTs, skins, swords, and digital currencies.
- **Scalable architecture**: Built on Polkadot’s **Substrate framework** with low-cost and high-throughput transactions.
- **Custom blockchain contracts**: Utilizes Polkadot’s parachains and **XCM protocol** for asset movement.
- **User-friendly UI**: A simple UI to interact with blockchain transactions.

---

## Architecture

### Technology Stack:
- **Polkadot**: Modular blockchain framework for building scalable and interoperable decentralized applications.
- **Westend Asset Hub**: Testnet parachain used for asset management.
- **XCM Protocol**: Future implementation for cross-chain asset transfer between parachains.
- **Smart Contracts**: Custom contracts for asset management, listing, and purchasing.

### Smart Contract Overview:
The marketplace uses custom **smart contracts** to facilitate asset listings, transfers, and purchases. These contracts are written in **Solidity** and deployed on Polkadot’s blockchain. Key contract functionality includes:

- **Asset Listing**: Players can list in-game items for sale, specifying asset type (fungible/non-fungible) and price.
- **Asset Purchase**: Players can buy listed assets using native tokens, with transaction validation and transfer logic handled by the contract.
- **Reentrancy Guard**: Prevents attacks during asset transfers with a custom modifier that ensures secure transactions.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrossGameMarketplace {
    address public owner;
    uint public nextAssetId = 1;

    enum AssetType { Fungible, NonFungible }

    struct Asset {
        uint id;
        address owner;
        AssetType assetType;
        uint priceUSD; // Price in USD equivalent (1 token = $1 for simplicity)
        bool listed;
    }

    mapping(uint => Asset) public assets;

    event AssetListed(uint assetId, address indexed owner, AssetType assetType, uint price);
    event AssetPurchased(uint assetId, address indexed newOwner);

    // Reentrancy guard
    bool private locked;
    modifier noReentrancy() {
        require(!locked, "Reentrancy not allowed");
        locked = true;
        _;
        locked = false;
    }

    constructor() {
        owner = msg.sender;
    }

    // List an asset on the marketplace
    function listAsset(AssetType _type, uint _priceUSD) external {
        uint assetId = nextAssetId;
        assets[assetId] = Asset({
            id: assetId,
            owner: msg.sender,
            assetType: _type,
            priceUSD: _priceUSD,
            listed: true
        });

        emit AssetListed(assetId, msg.sender, _type, _priceUSD);
        nextAssetId++;
    }

    // Buy an asset using native currency (assumed to be $1 = 1 token for demo)
    function buyAsset(uint assetId) external payable noReentrancy {
        Asset storage asset = assets[assetId];
        require(asset.listed, "Asset not listed");
        require(msg.value >= asset.priceUSD * 1 ether, "Insufficient payment");

        address seller = asset.owner;
        asset.owner = msg.sender;
        asset.listed = false;

        (bool sent, ) = payable(seller).call{value: msg.value}("");
        require(sent, "Transfer to seller failed");

        emit AssetPurchased(assetId, msg.sender);
    }

    // View asset details
    function getAsset(uint assetId) external view returns (
        uint id,
        address assetOwner,
        AssetType assetType,
        uint priceUSD,
        bool listed
    ) {
        Asset memory a = assets[assetId];
        return (a.id, a.owner, a.assetType, a.priceUSD, a.listed);
    }

    // Withdraw contract balance (only by contract owner)
    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        (bool sent, ) = payable(owner).call{value: address(this).balance}("");
        require(sent, "Withdraw failed");
    }
}
```

---

## Demo
[![Watch the video](https://img.youtube.com/vi/yusI41kxfos/0.jpg)](https://youtu.be/yusI41kxfos)

### Running the Application

1. **Install Dependencies**:
   First, clone the repository:
   ```bash
   git clone https://github.com/Boweii22/NeverRest---Digital-Assets-Platform.git
   cd NeverRest
   ```

2. **Set Up the Environment**:
   Ensure you have **Polkadot.js** or **Substrate Node** running. You can follow the official Polkadot documentation to set up a test environment or use the **Westend Asset Hub** for testing.

3. **Deploy the Contract**:
   Deploy the `CrossGameMarketplace.sol` smart contract using a tool like **Remix** or **Truffle**. Make sure the contract is deployed on the Polkadot-based testnet.

4. **Interact with the Marketplace**:
   Once deployed, you can interact with the marketplace through the UI by listing assets, purchasing them, and viewing asset details.

### Screenshots

1. **Polkadot Connection**:
   ![image](https://github.com/user-attachments/assets/08fc7b2f-65c8-4fbe-a066-1db5b34ddda3)

2. **Checkout Implementation**
   ![image](https://github.com/user-attachments/assets/ce59d8ed-aa8e-46f6-bf52-167b78b1b5f0)


4. **Polkadot Dashboard**:
   ![image](https://github.com/user-attachments/assets/794a77f9-5fd7-483e-b908-00681bf04892)


---

## How We Used Custom Contracts

The **custom contracts** are central to the functionality of the **Cross-Game Marketplace**. By using **Solidity**, we created a smart contract that handles key operations, including:

- **Listing Assets**: Players can list their assets (fungible or non-fungible) along with a price.
- **Buying Assets**: Players can purchase listed assets, and the contract ensures proper transaction handling, including reentrancy protection.
- **Event Emissions**: Events like `AssetListed` and `AssetPurchased` are emitted to track asset interactions.
- **Asset Management**: The contract keeps track of each asset's details (owner, type, price, and availability).

This system ensures that assets are securely listed, transferred, and tracked on-chain, with the Polkadot ecosystem ensuring interoperability across games.

---

## Future Plans

- **Cross-Chain Functionality**: Implementing full cross-chain transactions with **Polkadot’s XCM protocol** to allow assets to move seamlessly between parachains and different ecosystems.
- **SDKs for Developers**: Provide developers with SDKs to easily integrate asset listings and purchases into their games.
- **Brand Partnerships**: Onboard major brands for tokenized collectibles and integrate with popular gaming platforms.

---

## Contributing

If you’d like to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request. We welcome contributions to make the platform more robust and feature-rich!

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---
