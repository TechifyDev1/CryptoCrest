import React, { useEffect, useRef, useState } from 'react';
import OverviewChart from './Charts/OverviewChart';
import './Overview.css';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../../Firebase/firebase-init';
import { toast } from 'sonner';

const OverviewContainer: React.FC = () => {
  const [purchaseData, setPurchaseData] = useState<any[]>([]);
  const [purchaseDates, setPurchaseDates] = useState<any[]>([]);
  const [purchaseAmounts, setPurchaseAmount] = useState<any[]>([]);
  const fetchedRef = useRef<boolean>(false);
  useEffect(() => {
    const getPurchaseData = async () => {
      try {
        if (fetchedRef.current === true) return;
        const username = auth.currentUser?.displayName?.toLowerCase();
        if (!username) throw new Error('Please sign in to view data');
        const userRef = doc(db, 'users', username);
        const data = (await getDoc(userRef)).data();
        if (!data) throw new Error('No data found');
        const transactions = data.transactions;
        const purchases = transactions.filter(
          (transaction: any) => transaction.type.toLowerCase() === 'buy'
        );
        const formattedDates: any[] = [];
        const unformattedDates = purchases.map((obj: any) => obj.date);
        setPurchaseAmount(purchases.map((obj: any) => obj.amount));
        unformattedDates.forEach((date: any) => {
          let dateObj = new Date(date);
          const formattedDate = dateObj.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });
          formattedDates.push(formattedDate);
        });
        setPurchaseDates(formattedDates);
        setPurchaseData(purchases);
        console.log(purchases);
        console.log(purchases.map((obj: any) => obj.date));
        console.log(formattedDates);
        toast.success('Data fetched successfully');
        fetchedRef.current = true;
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
      }
    };
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        getPurchaseData();
      } else {
        toast.error('Please sign in to continue');
        console.log('no user');
      }
    });
    return () => unsub();
  }, []);
  const options = {
    title: {
      text: 'Crypto Price Trend',
      left: 'center',
      show: false,
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      show: false,
    },
    yAxis: {
      show: false,
      type: 'value',
    },
    series: [
      {
        name: 'ETH',
        type: 'line',
        data: [4001, 1222, 3432, 2345, 2334, 4567],
        smooth: false,
      },
    ],
  };
  const purchaseOptions = {
    title: {
      text: 'Crypto Price Trend',
      left: 'center',
      show: false,
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: purchaseDates,
      show: false,
    },
    yAxis: {
      show: false,
      type: 'value',
    },
    series: [
      {
        type: 'line',
        data: purchaseAmounts,
        smooth: false,
      },
    ],
  };
  return (
    <div className="overview-container">
      <div className="header">
        <h2>Dashboard</h2>
        <span>Dashboard/crypto current</span>
      </div>
      <div className="charts-container">
        <div
          className="chart"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>
            <span className="title">purchase</span>
            <OverviewChart option={purchaseOptions} />
          </div>
          <span className="amount">$14,400</span>
        </div>
        <div
          className="chart"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>
            <span className="title">revenue</span>
            <OverviewChart option={options} />
          </div>
          <span className="amount">$14,400</span>
        </div>
        <div
          className="chart"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>
            <span className="title">market price</span>
            <OverviewChart option={options} />
          </div>
          <span className="amount">$14,400</span>
        </div>
      </div>
    </div>
  );
};

export default OverviewContainer;
