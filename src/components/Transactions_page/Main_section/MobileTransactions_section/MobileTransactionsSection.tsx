// MobileTransactions.tsx
import React, { Dispatch, SetStateAction } from 'react';
import './MobileTrans.css';

interface Transaction {
    id: string;
    date: string;
    type: string;
    asset: string;
    amount: string;
    fee: string;
    status: string;
    description: string;
}

interface TransactionListProps {
    transactions: Transaction[];
    openDetails: Dispatch<SetStateAction<boolean>>;
    setChosenTrans: Dispatch<SetStateAction<Transaction | undefined>>
}

const MobileTransactions: React.FC<TransactionListProps> = ({ transactions, openDetails, setChosenTrans, }) => {
    return (
        <div className="mobile-transactions">
            {transactions.map((transaction) => (
                <div
                    key={transaction.id}
                    className="transaction-card"
                    onClick={() => {
                        setChosenTrans(transaction);
                        openDetails(prev => !prev)
                    }}
                >
                    <div className="transaction-header">
                        <span className="transaction-type">{transaction.type}</span>
                        <span className={`transaction-status ${transaction.status.toLowerCase()}`}>
                            {transaction.status}
                        </span>
                    </div>
                    <div className="transaction-details">
                        <div className="detail">
                            <span className="label">Date:</span>
                            <span className="value">{transaction.date}</span>
                        </div>
                        <div className="detail">
                            <span className="label">Amount:</span>
                            <span className="value">{transaction.amount}</span>
                        </div>
                        <div className="detail">
                            <span className="label">Fee:</span>
                            <span className="value">{transaction.fee}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MobileTransactions;
