
// lib/utils/getUserAddress.ts
export async function getUserAddress(): Promise<string> {
    if (typeof window === 'undefined') {
      throw new Error('getUserAddress must be called in the browser');
    }
  
    const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
  
    await web3Enable('NeverReset');
    const allAccounts = await web3Accounts();
  
    if (allAccounts.length === 0) {
      throw new Error('No accounts found. Please connect a wallet.');
    }
  
    return allAccounts[0].address;
  }
  