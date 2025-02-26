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
import { CryptoContext } from '../../../contexts/CryptoContext';

const MainSection: React.FC<{ toggleSideBar: boolean }> = ({
  toggleSideBar,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const transactionContextValue = useContext(transactionContext);
  const currenciesContextValue = useContext(CryptoContext);
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [chosenTrans, setChosenTrans] = useState<Transaction>();
  const [fees, setFees] = useState<number>(0);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [assetDistributionData, setAssetDisptributionData] = useState<
    { asset: string; value: number }[]
  >([]);
  const [transactionTrendsData, setTransactionsTrendsData] = useState<any[]>(
    []
  );

  useEffect(() => {
    if (transactionContextValue) {
      setTransactions(transactionContextValue.transactions);
      setFilteredTransactions(transactionContextValue.transactions);
      setTransactionsTrendsData(
        transactionContextValue.transactions
          ? transactionContextValue.transactions.map(
              ({ asset, description, fees, id, status, type, ...rest }) => rest
            )
          : []
      );
    }
  }, [transactionContextValue]);

  useEffect(() => {
    setAssetDisptributionData(
      currenciesContextValue.crypto.map(({ name, balance }) => ({
        asset: name,
        value: balance,
      }))
    );
  }, [currenciesContextValue]);

  console.log(assetDistributionData);
  useEffect(() => {
    if (filteredTransactions && filteredTransactions.length > 0) {
      setFees(
        filteredTransactions.reduce(
          (total, tr) => total + parseFloat(`${tr.fees || 0}`),
          0
        )
      );

      setTotalBalance(
        filteredTransactions.reduce(
          (acc, tr) => acc + parseFloat(`${tr.amount || 0}`),
          0
        )
      );
    }
  }, [filteredTransactions]);

  return (
    <div className="main-section" style={{ width: toggleSideBar ? '' : '90%' }}>
      <MobileTopNav currentpage="Transactions" />
      <SummarySection
        totalTransactions={
          filteredTransactions ? filteredTransactions.length : [].length
        }
        totalFees={`$${fees}`}
        balanceChange={`$${totalBalance}`}
      />
      <FilterSearchSection
        transactions={transactions}
        setFilteredTransactions={setFilteredTransactions}
      />
      <TransactionSection
        openDetails={setOpenDetails}
        setChosenTrans={setChosenTrans}
        transactions={filteredTransactions}
      />
      <TransactionDetails
        openDetails={openDetails}
        onClose={() => setOpenDetails((prev) => !prev)}
        transaction={chosenTrans}
      />
      <MobileTransactions
        transactions={filteredTransactions}
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
