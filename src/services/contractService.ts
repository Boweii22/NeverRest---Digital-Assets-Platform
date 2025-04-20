import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { Abi } from '@polkadot/api-contract/Abi';
import { web3FromAddress } from '@polkadot/extension-dapp';

const CONTRACT_ADDRESS = '0x707a6fccd993700476956b96466a7699b44e0242'; // From Remix deployment
const WS_PROVIDER = 'wss://westend-asset-hub-rpc.polkadot.io';

let api: ApiPromise;
let contract: ContractPromise;

// Initialize contract connection
export async function initContract() {
  const wsProvider = new WsProvider(WS_PROVIDER);
  api = await ApiPromise.create({ provider: wsProvider });
  
  // Import your contract ABI JSON (export from Remix)
  const abi = new Abi(require('../abi/MyContract.json'));
  contract = new ContractPromise(api, abi, CONTRACT_ADDRESS);
  
  return { api, contract };
}

// Process checkout transaction
export async function processCheckout(
  buyerAddress: string,
  assetIds: number[],
  totalPrice: number
) {
  if (!api || !contract) {
    await initContract();
  }

  const injector = await web3FromAddress(buyerAddress);
  const amount = BigInt(Math.floor(totalPrice * 10**12)); // Convert WND to Planck

  // Process each asset purchase
  const transactions = assetIds.map(assetId => 
    contract.tx.buyAsset(
      { value: amount / BigInt(assetIds.length) }, // Split payment evenly
      assetId
    )
  );

  // Batch transactions if multiple assets
  const tx = assetIds.length > 1 
    ? api.tx.utility.batchAll(transactions)
    : transactions[0];

  return new Promise<string>((resolve, reject) => {
    tx.signAndSend(
      buyerAddress,
      { signer: injector.signer },
      ({ status, dispatchError, txHash }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            const decoded = api.registry.findMetaError(dispatchError.asModule);
            reject(new Error(`${decoded.section}.${decoded.name}: ${decoded.docs.join(' ')}`));
          } else {
            reject(new Error(dispatchError.toString()));
          }
        } else if (status.isInBlock) {
          console.log(`Transaction included at blockHash ${status.asInBlock}`);
        } else if (status.isFinalized) {
          resolve(txHash.toHex());
        }
      }
    ).catch(reject);
  });
}