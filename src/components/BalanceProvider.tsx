'use client';

import { getUserAddress } from '@/lib/utils/getUserAddress';
import { web3Enable } from '@polkadot/extension-dapp';
import { useEffect, useState } from 'react';
import { getApi } from '../utils/polkadot'; // Assuming that's where getApi lives
import Wallet from './Wallet';

export default function BalanceProvider() {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        await web3Enable('NeverReset'); // required if not already called

        const userAddress = await getUserAddress();
        const api = await getApi();

        const { data: { free } } = await api.query.system.account(userAddress);

        const DOTBalance = Number(free) / 10 ** 12;

        // Example conversion rate — 1 DOT = $6.80
        const USDConversionRate = 6.8;
        const balanceInUSD = DOTBalance * USDConversionRate;

        setBalance(balanceInUSD);
      } catch (err) {
        console.error('Error fetching balance:', err);
      }
    };

    fetchBalance();
  }, []);

  return <Wallet balance={balance} />;
}
