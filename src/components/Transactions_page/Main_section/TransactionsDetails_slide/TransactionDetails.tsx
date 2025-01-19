import './Transaction.css';

interface TransactionDetailModalProps {
    transaction: {
        id: string;
        type: string;
        date: string;
        amount: string;
        fee: string;
        status: string;
        description: string;
    } | undefined;
    onClose: () => void;
}

const TransactionDetails: React.FC<TransactionDetailModalProps> = ({ transaction, onClose }) => {
    return (
        <div className="transaction-detail-modal">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>X</button>
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
                    <span className="label">Date:</span>
                    <span className="value">{transaction?.date}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Amount:</span>
                    <span className="value">{transaction?.amount}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Fee:</span>
                    <span className="value">{transaction?.fee}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Status:</span>
                    <span className="value">{transaction?.status}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Description:</span>
                    <span className="value">{transaction?.description}</span>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetails;
