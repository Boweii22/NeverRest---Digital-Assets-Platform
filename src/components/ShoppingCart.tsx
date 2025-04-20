'use client';

import { useCart } from '@/context/CartContext';
import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getApi } from '../utils/polkadot'; // adjust the path as needed

export default function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeFromCart, getTotalPrice, getItemCount, clearCart } = useCart();
  const [status, setStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [amount, setAmount] = useState('0.01');
  const [recipient, setRecipient] = useState('5HE6KYSG34kKc968trJjeCsAbtoKMGvMRBBNWR3ikQxkLaSu');
  
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      setStatus('⏳ Preparing transaction...');
      setIsProcessing(true);

      // Retrieve user address (from Polkadot extension or other source)
    const userAddress = await getUserAddress();


      const api = await getApi();
      const injector = await web3FromAddress(userAddress);
      const amountInPlanck = BigInt(Math.floor(parseFloat(amount) * 10 ** 12));

      const tx = api.tx.balances.transferAllowDeath(
        recipient,
        amountInPlanck.toString()
      );

      const unsub = await tx.signAndSend(
        userAddress,
        { signer: injector.signer },
        async({ status: txStatus, dispatchError, txHash }: any) => {
          if (dispatchError) {
            if (dispatchError.isModule) {
              const decoded = api.registry.findMetaError(dispatchError.asModule);
              const { docs, name, section } = decoded;
              setStatus(`❌ ${section}.${name}: ${docs.join(' ')}`);
            } else {
              setStatus(`❌ Error: ${dispatchError.toString()}`);
            }
            unsub();
          } else if (txStatus.isInBlock) {
            setStatus(`📦 Included in block! Tx Hash: ${txHash.toHex()}`);
          } else if (txStatus.isFinalized) {
            setStatus('🎉 Finalized! Tokens sent successfully.');
            unsub();
            handleTransactionSuccess(txHash);

            // ✅ Query and log user's updated balance
          const { data: balance } = await api.query.system.account(userAddress);
          console.log(`🔎 Final balance for ${userAddress}:`);
          console.log(`Free: ${balance.free.toHuman()}`);
          } else {
            setStatus(`⏳ Status: ${txStatus.type}`);
          }
        }
      );
    } catch (error: unknown) {
      console.error('💥 Error during checkout:', error);
      setStatus(`❌ ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  async function getUserAddress(): Promise<string> {
    const allInjected = await web3Enable('my-app');
    if (allInjected.length === 0) {
      throw new Error('No injected extension found');
    }
    const injector = allInjected[0]; // Use the first available injector
    const accounts = await injector.accounts.get();
    if (accounts.length === 0) {
      throw new Error('No accounts available');
    }
    return accounts[0].address; // Return the address of the first account
  }

  const handleTransactionSuccess = (txHash: string) => {
    // Create order data
    const orderData = {
      items: items.map(item => ({
        ...item,
        isPurchased: true,
        purchaseDate: new Date().toISOString()
      })),
      total: getTotalPrice(),
      orderDate: new Date().toISOString(),
      orderId: txHash, // Using transaction hash as order ID
      txHash
    };

    // Save to localStorage
    localStorage.setItem('lastOrder', JSON.stringify(orderData));

    // Add purchased items to My Items
    const existingItems = JSON.parse(localStorage.getItem('myItems') || '[]');
    const updatedItems = [...existingItems, ...orderData.items];
    localStorage.setItem('myItems', JSON.stringify(updatedItems));

    // Remove purchased items from available items
    const availableItems = JSON.parse(localStorage.getItem('availableItems') || '[]');
    const purchasedItemIds = new Set(items.map(item => item.id));
    const updatedAvailableItems = availableItems.filter((item: any) => 
      !purchasedItemIds.has(item.id)
    );
    localStorage.setItem('availableItems', JSON.stringify(updatedAvailableItems));

    // Clear cart and redirect
    clearCart();
    router.push('/checkout-success');  // Redirect to success page
  };

  return (
    <div className="relative">
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="text-white font-medium">{getItemCount()}</span>
      </button>

      {/* Cart Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-gray-800 rounded-lg shadow-xl z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Shopping Cart</h3>
            
            {/* Status Messages */}
            {status && (
              <div className={`mb-4 p-2 rounded text-sm ${
                status.includes('Error') ? 'bg-red-900 text-red-100' : 
                status.includes('success') ? 'bg-green-900 text-green-100' : 
                'bg-blue-900 text-blue-100'
              }`}>
                {status}
              </div>
            )}

            {items.length === 0 ? (
              <p className="text-gray-400">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 max-h-96 overflow-auto">
                  {items.map((item) => (
                    <div key={item.cartItemId} className="flex items-center space-x-4 bg-gray-700 p-2 rounded-lg">
                      <div className="relative w-16 h-16">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{item.name}</h4>
                        <p className="text-yellow-400">${item.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-400">ID: {item.id}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-red-400 hover:text-red-300"
                        disabled={isProcessing}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center text-white mb-4">
                    <span>Total:</span>
                    <span className="font-bold text-yellow-400">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing || items.length === 0}
                    className={`w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 ${
                      isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isProcessing ? (
                      <svg
                        className="animate-spin w-5 h-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v1m0 14v1m7-7h1m-14 0h1m6 6l.707.707M18.364 5.636l-.707-.707M5.636 5.636l-.707.707m6 6l.707-.707"
                        />
                      </svg>
                    ) : (
                      <span>Proceed to Checkout</span>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
