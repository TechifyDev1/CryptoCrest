import React, { useContext, useEffect, useState } from 'react';
import './Highlights.css';
import { transactionContext } from '../../../../contexts/TransactionsContext';
import { CryptoContext } from '../../../../contexts/CryptoContext';

const HighlitsSection: React.FC = () => {
  const transactionsContext = useContext(transactionContext);
  const [totalIncome, setTotalIncome] = useState<any[]>([]);
  const tokenContext = useContext(CryptoContext);
  const [userCurrentToken, setUserCurrentToken] = useState<any[]>([]);
  useEffect(() => {
    if (transactionsContext?.transactions) {
      // Filter transactions
      const filtered = transactionsContext.transactions.filter(
        (tr) =>
          tr.type.toLowerCase() === 'sell' &&
          tr.status.toLowerCase() === 'completed'
      );
      setUserCurrentToken(tokenContext.crypto.slice(0, 2));

      setTotalIncome(filtered); // Set totalIncome with filtered transactions
    }
  }, [transactionsContext]);

  return (
    <div className="highlights-section">
      <div className="total-income">
        <span style={{ fontWeight: 'bold' }}>Total Income</span>
        <h3>
          {`$${totalIncome.reduce(
            (sum, inc) => sum + parseInt(inc.amount),
            0
          )}`}
        </h3>
      </div>
      <div className="ethereum-income">
        <span style={{ fontWeight: 'bold' }}>
          {userCurrentToken[0].name} Wallet
        </span>
        <h3>{userCurrentToken[0].balance}</h3>
      </div>
      <div className="bitcoin-income">
        <span style={{ fontWeight: 'bold' }}>
          {userCurrentToken[1].name} Wallet
        </span>
        <h3>{userCurrentToken[1].balance}</h3>
      </div>
    </div>
  );
};

export default HighlitsSection;
