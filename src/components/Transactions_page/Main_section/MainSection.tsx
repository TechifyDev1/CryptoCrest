import React, { useContext, useEffect, useState } from 'react';
import AnalyticsSection from './Analytics_section/AnalyticsSection';
import FilterSearchSection from './FilterSearch_section/FilterSearchSection';
import './Main.css';
import MobileTransactions from './MobileTransactions_section/MobileTransactionsSection';
import SummarySection from './Summery_section/SummerySection';
import TransactionSection from './Transactions_section/TransactionsSection';
import TransactionDetails from './TransactionsDetails_slide/TransactionDetails';
import MobileTopNav from '../../Helpers/Mobile_topnav/MobileTopNav';
import { transactionContext } from '../../../contexts/TransactionsContext';
import { Transaction } from '../../../type';
const MainSection: React.FC<{ toggleSideBar: boolean }> = ({
  toggleSideBar,
}) => {
  const transactionContextValue = useContext(transactionContext);
  const transactions = transactionContextValue
    ? transactionContextValue.transactions
    : [];
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [chosenTrans, setChosenTrans] = useState<Transaction>();
  const [fees, setFees] = useState<number>(0);
  useEffect(() => {
    setFees(
      transactions.reduce(
        (total, tr) => total + parseFloat(`${tr.fees || 0}`),
        0
      )
    );
  }, [transactions]);

  const transactionTrendsData = [
    { date: '2025-01-01', amount: 500 },
    { date: '2025-01-02', amount: 800 },
    { date: '2025-01-03', amount: 300 },
  ];

  const assetDistributionData = [
    { asset: 'Bitcoin', value: 40 },
    { asset: 'Ethereum', value: 30 },
    { asset: 'Ripple', value: 20 },
    { asset: 'Others', value: 10 },
  ];

  return (
    <div className="main-section" style={{ width: toggleSideBar ? '' : '90%' }}>
      <MobileTopNav currentpage="Transactions" />
      <SummarySection
        totalTransactions={transactions.length}
        totalFees={`$${fees}`}
        balanceChange="+$1,200"
      />
      <FilterSearchSection />
      <TransactionSection
        openDetails={setOpenDetails}
        setChosenTrans={setChosenTrans}
        transactions={transactions}
      />
      <TransactionDetails
        openDetails={openDetails}
        onClose={() => {
          setOpenDetails((prev) => !prev);
        }}
        transaction={chosenTrans}
      />
      <MobileTransactions
        transactions={transactions}
        openDetails={setOpenDetails}
        setChosenTrans={setChosenTrans}
      />
      <AnalyticsSection
        transactionTrendsData={transactionTrendsData}
        assetDistributionData={assetDistributionData}
      />
    </div>
  );
};

export default MainSection;
