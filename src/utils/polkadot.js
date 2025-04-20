import { ApiPromise, WsProvider } from '@polkadot/api';

let apiInstance = null;

export const getApi = async (endpoint = 'wss://westend-asset-hub-rpc.polkadot.io') => {
  // Return existing connected instance if available
  if (apiInstance && apiInstance.isConnected) {
    return apiInstance;
  }

  try {
    // Create new connection if none exists
    const provider = new WsProvider(endpoint);
    apiInstance = await ApiPromise.create({ provider });
    
    // Wait for API to be fully ready
    await apiInstance.isReady;
    
    console.log(`✅ Connected to ${endpoint}`);
    return apiInstance;
  } catch (error) {
    console.error('❌ Failed to create API:', error);
    apiInstance = null; // Reset on error
    throw error;
  }
};

// Optional: Add disconnect function for cleanup
export const disconnectApi = async () => {
  if (apiInstance) {
    await apiInstance.disconnect();
    apiInstance = null;
  }
};