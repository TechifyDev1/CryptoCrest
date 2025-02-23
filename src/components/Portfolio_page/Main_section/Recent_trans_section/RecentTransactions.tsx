import React from 'react';
import './Recent.css';

interface RecentTransactionsProps {
  transactions: {
    date: string;
    asset: string;
    type: string;
    amount: number;
    value: number;
  }[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
}) => {
  return (
    <div className="recent-transactions">
      <h2>Recent Transactions</h2>
      {transactions.length > 0 ? (
        <div className="transactions-table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Asset</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction: any, index: any) => (
                <tr
                  key={index}
                  className={`transaction-${transaction.type.toLowerCase()}`}
                >
                  <td>{transaction.date}</td>
                  <td>{transaction.asset}</td>
                  <td className={`type ${transaction?.type.toLowerCase()}`}>
                    {transaction?.type}
                  </td>
                  <td>{Number(transaction?.amount).toFixed(2)}</td>
                  <td>${Number(transaction.value).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-transactions">No recent transactions available.</p>
      )}
    </div>
  );
};

export default RecentTransactions;
