import { MdCancel } from 'react-icons/md';
import './Transaction.css';
import { Transaction } from '../../../../type';
import { auth, db } from '../../../../Firebase/firebase-init';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();
  const handleDeleteTransaction = async () => {
    const username = auth.currentUser?.displayName;
    if (!username) return;
    const userRef = doc(db, "users", username);
    const currenciesRef = doc(db, "currencies", username);
    try {
      const docSnap = await getDoc(userRef);
      const allTransactions: Transaction[] = docSnap.data()?.transactions;
      if (!allTransactions) throw new Error("No transactions found");
      const index = allTransactions.findIndex((transaction) => transaction.id === transaction?.id);
      if (index === -1) throw new Error("Transaction not found");
      allTransactions.splice(index, 1);
      await setDoc(userRef, {transactions: allTransactions}, {merge: true});
      const currencySnap = await getDoc(currenciesRef);
      const currencyData = currencySnap.data();
      if (!currencyData) throw new Error("No currencies found");
      const asset = transaction?.asset?.toLowerCase();
      if (!asset) throw new Error("Asset is undefined");
      const currency = currencyData[asset];
      if (!currency) throw new Error("Currency not found");
      const updatedBalance = transaction?.type === "Buy" ? currency.balance - transaction.amount : currency.balance + transaction?.amount;
      await setDoc(currenciesRef, {
        [asset]: {
          ...currency,
          balance: updatedBalance,
        },
      }, {merge: true});
      onClose();
      toast.success("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Error deleting transaction");
    }
  };
  const handleEditTransaction = () => {
    navigate("/transactions/" + transaction?.id);
    onClose();
  };
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
          <button className="edit-btn" onClick={handleEditTransaction}>
            Edit
          </button>
          <button className="delete-btn" onClick={handleDeleteTransaction}>
            Delete Transaction
            </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
