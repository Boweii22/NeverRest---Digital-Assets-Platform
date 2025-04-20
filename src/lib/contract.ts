// // src/lib/contract.ts
// import { ethers } from 'ethers';
// import abi from '../abi/MyContract.json'; // adjust path if needed

// const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

// export const getContract = async () => {
// if (typeof window === 'undefined' || !window.ethereum) {
//     throw new Error('MetaMask not found');
//     }

//     const provider = new ethers.providers.Web3Provider(window.ethereum as any);
//     await provider.send('eth_requestAccounts', []);
//     const signer = provider.getSigner();
  
//   const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
//   return { contract, signer };
// };
