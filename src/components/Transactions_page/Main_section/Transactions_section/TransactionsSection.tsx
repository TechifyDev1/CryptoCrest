import { Dispatch, SetStateAction } from 'react';
import './Transactions.css';
import { Transaction } from '../../../../type';

interface TransactionListProps {
  transactions: Transaction[];
  openDetails: Dispatch<SetStateAction<boolean>>;
  setChosenTrans: Dispatch<SetStateAction<Transaction | undefined>>;
}

const TransactionSection: React.FC<TransactionListProps> = ({
  transactions,
  openDetails,
  setChosenTrans,
}) => {
  return (
    <div className="transaction-list">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Asset</th>
            <th>Amount</th>
            <th>Fees</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr
                key={transaction.id}
                onClick={() => {
                  setChosenTrans(transaction);
                  openDetails((prev) => !prev);
                }}
              >
                <td>{transaction.date}</td>
                <td>{transaction.type}</td>
                <td>{transaction.asset}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.fees}</td>
                <td className={`status ${transaction.status.toLowerCase()}`}>
                  {transaction.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="no-data">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionSection;
