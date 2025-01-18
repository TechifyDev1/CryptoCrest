import React from 'react';
import './Recent.css';


interface RecentTransactionsProps {
    transactions: { date: string; asset: string; type: string; quantity: number; value: number; }[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
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
                            {transactions.map((transaction, index) => (
                                <tr key={index} className={`transaction-${transaction.type.toLowerCase()}`}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.asset}</td>
                                    <td className={`type ${transaction.type.toLowerCase()}`}>{transaction.type}</td>
                                    <td>{transaction.quantity.toFixed(2)}</td>
                                    <td>${transaction.value.toFixed(2)}</td>
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
