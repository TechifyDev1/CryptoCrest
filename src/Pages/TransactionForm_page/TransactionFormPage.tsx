import { ChangeEvent, useEffect, useState } from 'react';
import SideBar from '../../components/Helpers/Sidebar/SideBar';
import MobileTopNav from '../../components/Helpers/Mobile_topnav/MobileTopNav';
import MobileNav from '../../components/Helpers/Mobile_nav/MobileNav';
import { useNavigate, useParams } from 'react-router-dom';
import './TransactionForm.css';
import { toast } from 'sonner';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/firebase-init';

const transactionFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  interface Transaction {
    id: string;
    type: string;
    asset: string;
    amount: number;
    date: string;
    fees: number;
    description: string;
    status: string;
  }

  const [formData, setFormData] = useState<Transaction>({
    id: '',
    type: '',
    asset: '',
    amount: 0,
    date: '',
    description: '',
    fees: 0,
    status: '',
  });

  useEffect(() => {
    if (id && id !== 'new') {
      const fetchTransaction = async () => {
        const fetchedTransaction = {
          id,
          type: 'Buy',
          asset: 'Bitcoin',
          amount: 2,
          date: '2025-01-01',
          description: 'Description',
          fees: 0.5,
          status: 'Completed',
        };
        setFormData(fetchedTransaction);
      };
      fetchTransaction();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading('loading');
    if (
      formData.type &&
      formData.asset &&
      formData.amount > 0 &&
      formData.date
    ) {
      if (id === 'new') {
        const newTransaction = { ...formData, id: Date.now().toString() };
        const username = auth.currentUser?.displayName?.toLowerCase();
        console.log('Adding transaction:', username, newTransaction);
        if (!username) return;
        const userRef = doc(db, 'users', username);
        const existingTransactions = (await getDoc(userRef)).data()
          ?.transactions;
        try {
          await setDoc(
            userRef,
            {
              transactions: [...(existingTransactions || []), newTransaction],
            },
            { merge: true }
          );
          toast.success('Transaction added successfully');
        } catch (e: any) {
          toast.error(e.message);
        }
      } else {
        console.log('Updating transaction:', formData);
      }
      navigate('/transactions');
    }
  };
  return (
    <div className="transaction-form-page">
      <SideBar currentpage="new" toggleNav={true} />
      <MobileTopNav currentpage="New" />
      <MobileNav />
      <main className="new-main-section">
        <form className="transaction-form" onSubmit={handleSubmit}>
          <h3 style={{ textAlign: 'center', color: 'var(--text-color)' }}>
            {id === 'new' ? 'Add Transaction' : 'Edit Transaction'}
          </h3>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
          <input
            type="text"
            name="asset"
            placeholder="asset (e.g., Bitcoin)"
            value={formData.asset}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="fees"
            placeholder="Fees"
            value={formData.fees}
            onChange={handleChange}
            required
          />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">
            {id === 'new' ? 'Add Transaction' : 'Save Changes'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default transactionFormPage;
