import React, { useContext, useEffect, useState } from 'react';
import './Highlights.css';
import { transactionContext } from '../../../../contexts/TransactionsContext';

const HighlitsSection: React.FC = () => {
  const transactionsContext = useContext(transactionContext);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalIncome, setTotalIncome] = useState<any[]>([]);
  useEffect(() => {
    setTransactions(transactionsContext?.transactions || []);
    setTotalIncome(
      transactions.filter(
        (tr) =>
          tr.type !== 'buy' && tr.status !== 'fail' && tr.status !== 'pending'
      )
    );
  }, [transactionsContext]);
  useEffect(() => {
    const filtered = transactionsContext?.transactions.filter(
      (tr) => tr.type === 'sell' && tr.status === 'completed'
    );
    console.log(filtered);
  }, [transactions]);
  return (
    <div className="highlights-section">
      <div className="total-income">
        <span style={{ fontWeight: 'bold' }}>Total Income</span>
        <h3>
          {totalIncome.reduce((sum, inc) => {
            sum + inc.amount;
          }, 0)}
        </h3>
      </div>
      <div className="ethereum-income">
        <span style={{ fontWeight: 'bold' }}>Ethereum wallet</span>
        <h3>$14, 023</h3>
      </div>
      <div className="bitcoin-income">
        <span style={{ fontWeight: 'bold' }}>Bitcoin wallet</span>
        <h3>$14, 023</h3>
      </div>
    </div>
  );
};

export default HighlitsSection;
