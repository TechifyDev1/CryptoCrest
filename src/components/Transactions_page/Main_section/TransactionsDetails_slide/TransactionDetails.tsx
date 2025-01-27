import { MdCancel } from 'react-icons/md';
import './Transaction.css';
import { Transaction } from '../../../../type';

interface TransactionDetailModalProps {
  transaction: Transaction | undefined;
  onClose: () => void;
  openDetails: boolean;
}

const TransactionDetails: React.FC<TransactionDetailModalProps> = ({
  transaction,
  onClose,
  openDetails,
}) => {
  return (
    <div
      className="transaction-detail-modal"
      style={{ transform: openDetails ? '' : 'translateX(-100%)' }}
    >
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <MdCancel color="#dc3545" size={40} />
        </button>
        <h2>Transaction Details</h2>
        <div className="detail-item">
          <span className="label">Transaction ID:</span>
          <span className="value">{transaction?.id}</span>
        </div>
        <div className="detail-item">
          <span className="label">Type:</span>
          <span className="value">{transaction?.type}</span>
        </div>
        <div className="detail-item">
          <span className="label">Asset:</span>
          <span className="value">{transaction?.asset}</span>
        </div>
        <div className="detail-item">
          <span className="label">Date:</span>
          <span className="value">{transaction?.date}</span>
        </div>
        <div className="detail-item">
          <span className="label">Amount:</span>
          <span className="value">{transaction?.amount}</span>
        </div>
        <div className="detail-item">
          <span className="label">Fee:</span>
          <span className="value">{transaction?.fees}</span>
        </div>
        <div className="detail-item">
          <span className="label">Status:</span>
          <span className="value">{transaction?.status}</span>
        </div>
        <div className="detail-item">
          <span className="label">Description:</span>
          <span className="value">{transaction?.description}</span>
        </div>
        <div
          className="action-btns"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <button className="edit-btn" onClick={onClose}>
            Edit
          </button>
          <button className="delete-btn">Delete Transaction</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
