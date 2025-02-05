import React, { useContext, useEffect, useState } from 'react';
import './Highlights.css';
import { transactionContext } from '../../../../contexts/TransactionsContext';
import { CryptoContext } from '../../../../contexts/CryptoContext';

const HighlitsSection: React.FC = () => {
  // Access transaction context to get the user's transactions
  const transactionsContext = useContext(transactionContext);
  const [totalIncome, setTotalIncome] = useState<any[]>([]);

  // Access crypto context to get user's cryptocurrency data
  const tokenContext = useContext(CryptoContext);
  const [userCurrentToken, setUserCurrentToken] = useState<any[]>([]);

  useEffect(() => {
    if (transactionsContext?.transactions) {
      // Filter transactions to get only completed 'sell' transactions
      const filtered = transactionsContext.transactions.filter(
        (tr) =>
          tr.type.toLowerCase() === 'sell' &&
          tr.status.toLowerCase() === 'completed'
      );

      // Set the first two cryptocurrencies from the context (assumed to be the main ones)
      setUserCurrentToken(tokenContext.crypto.slice(0, 2));

      // Set totalIncome with the filtered transactions
      setTotalIncome(filtered);
    }
  }, [transactionsContext]);

  return (
    <div className="highlights-section">
      {/* Display the total income from completed sell transactions */}
      <div className="total-income">
        <span style={{ fontWeight: 'bold' }}>Total Income</span>
        <h3>
          {`$${totalIncome.reduce(
            (sum, inc) => sum + parseInt(inc.amount), // Calculate total income
            0
          )}`}
        </h3>
      </div>

      {/* Display wallet balance for the first cryptocurrency */}
      <div className="ethereum-income">
        <span style={{ fontWeight: 'bold' }}>
          {userCurrentToken[0]?.name} Wallet
        </span>
        <h3>{userCurrentToken[0]?.balance}</h3>
      </div>

      {/* Display wallet balance for the second cryptocurrency */}
      <div className="bitcoin-income">
        <span style={{ fontWeight: 'bold' }}>
          {userCurrentToken[1]?.name} Wallet
        </span>
        <h3>{userCurrentToken[1]?.balance}</h3>
      </div>
    </div>
  );
};

export default HighlitsSection;
