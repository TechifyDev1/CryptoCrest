import React, { useEffect, useRef, useState } from 'react';
import OverviewChart from './Charts/OverviewChart';
import './Overview.css';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../../Firebase/firebase-init';
import { toast } from 'sonner';
import axios from 'axios';

const OverviewContainer: React.FC = () => {
  const [dates, setDates] = useState<any[]>([]);
  const [purchaseAmounts, setPurchaseAmount] = useState<any[]>([]);
  const [revenueAmounts, setRevenueAmounts] = useState<any[]>([]);
  const [marketPrices, setMarketPrices] = useState<any[]>([]);
  const fetchedRef = useRef<boolean>(false);

  useEffect(() => {
    const getPurchaseData = async () => {
      try {
        if (fetchedRef.current) return;
        const username = auth.currentUser?.displayName?.toLowerCase();
        if (!username) throw new Error('Please sign in to view data');

        const userRef = doc(db, 'users', username);
        const data = (await getDoc(userRef)).data();
        if (!data) throw new Error('No data found');

        const transactions = data.transactions;
        const purchases = transactions.filter(
          (t: any) => t.type.toLowerCase() === 'buy'
        );
        const revenue = transactions.filter(
          (t: any) => t.type.toLowerCase() === 'sell'
        );

        const marketPrice = await axios.get(
          'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=30'
        );

        setMarketPrices(marketPrice.data.prices.map((entry: any) => entry[1]));

        setDates(
          marketPrice.data.prices.map((entry: any) => {
            return new Date(entry[0]).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
            });
          })
        );

        console.log((await marketPrice).data);

        setPurchaseAmount(purchases.map((t: any) => t.amount));
        setRevenueAmounts(revenue.map((t: any) => t.amount));

        toast.success('Data fetched successfully');
        fetchedRef.current = true;
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
      }
    };

    const unsub = auth.onAuthStateChanged((user) => {
      if (user) getPurchaseData();
      else toast.error('Please sign in to continue');
    });

    return () => unsub();
  }, []);

  const options = {
    title: {
      text: 'Crypto Price Trend',
      left: 'center',
      show: true,
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: dates,
      show: true,
    },
    yAxis: {
      show: true,
      type: 'value',
    },
    series: [
      {
        name: 'Purchases',
        type: 'line',
        data: purchaseAmounts,
        smooth: false,
      },
      {
        name: 'Revenue',
        type: 'line',
        data: revenueAmounts,
        smooth: false,
      },
      {
        name: 'Market trends',
        type: 'line',
        data: marketPrices,
        smooth: false,
      },
    ],
  };

  return (
    <div className="overview-container">
      <div className="header">
        <h2>Dashboard</h2>
        <span>Dashboard / Crypto Overview</span>
      </div>
      <div className="charts-container">
        <OverviewChart option={options} />
      </div>
    </div>
  );
};

export default OverviewContainer;
