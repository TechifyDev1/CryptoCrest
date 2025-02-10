import { ChangeEvent, useEffect, useState } from 'react';
import SideBar from '../../components/Helpers/Sidebar/SideBar';
import MobileTopNav from '../../components/Helpers/Mobile_topnav/MobileTopNav';
import MobileNav from '../../components/Helpers/Mobile_nav/MobileNav';
import { useNavigate, useParams } from 'react-router-dom';
import './TransactionForm.css';
import { toast } from 'sonner';
import { arrayUnion, doc, runTransaction, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/firebase-init';
import { Transaction } from '../../type';
import AvailableCoins from './Available_coins/AvailableCoin';
import { fetchCryptoPrice } from './fetchCryptoPrice';

const transactionFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showAvailableCoins, setShowAvailableCoins] = useState(false);
  const [typedCoin, setTypedCoin] = useState('');

  const handleCoinSelection = (coin: string) => {
    setFormData((prev) => ({ ...prev, asset: coin }));
    setTypedCoin(coin);
    setShowAvailableCoins(false);
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState<Transaction>({
    id: '',
    type: '',
    asset: '',
    amount: 0,
    date: '',
    description: '',
    fees: 0,
    status: '',
    value: 0,
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
          value: 0,
        };
        setFormData(fetchedTransaction);
      };
      fetchTransaction();
    }
  }, [id]);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === 'asset') {
      setTypedCoin(value);
      setShowAvailableCoins(true);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading('Loading...');

    if (
      formData.type &&
      formData.asset &&
      formData.amount > 0 &&
      formData.date
    ) {
      if (id === 'new') {
        const price = await fetchCryptoPrice(formData.asset);
        console.log(price);
        if(price == 0) throw new Error("Please try again");
        const newTransaction = { ...formData, id: Date.now().toString(), value: price*formData.amount };
        const username = auth.currentUser?.displayName?.toLowerCase();

        if (!username) {
          toast.error('You\'re not authenticated');
          return;
        }

        const userRef = doc(db, 'users', username);
        const currencyRef = doc(db, 'currencies', username);

        try {
          await updateDoc(userRef, {
            transactions: arrayUnion(newTransaction),
          });

          await runTransaction(db, async (transaction) => {
            const currencySnapshot = await transaction.get(currencyRef);
            const currencyDoc = currencySnapshot.data();
            if (currencyDoc && formData.asset.toLowerCase() in currencyDoc) {
              const currency = currencyDoc[formData.asset.toLowerCase()];
              const updatedBalance =
                formData.type === 'Buy'
                  ? Number(currency.balance) + Number(formData.amount)
                  : Number(currency.balance) - Number(formData.amount);

              transaction.set(
                currencyRef,
                {
                  [formData.asset.toLowerCase()]: {
                    balance: Number(updatedBalance),
                    price: Number(fetchCryptoPrice(currency)),
                    name: currency.name,
                  },
                },
                { merge: true }
              );
            } else {
              transaction.set(
                currencyRef,
                {
                  [formData.asset.toLowerCase()]: {
                    balance: Number(formData.amount),
                    price: Number(fetchCryptoPrice(formData.asset)),
                    name: formData.asset,
                  },
                },
                { merge: true }
              );
            }
          });

          toast.success('Transaction added successfully');
          navigate('/transactions');
        } catch (e: any) {
          toast.error(e.message || 'An unexpected error occurred');
        }
      } else {
        console.log('Updating transaction:', formData);
      }
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
            placeholder="Asset (e.g., Bitcoin)"
            value={formData.asset}
            onChange={handleChange}
            required
          />
          <AvailableCoins
            typedCoin={typedCoin}
            showAvailableCoins={showAvailableCoins}
            setChosenCoin={handleCoinSelection}
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
