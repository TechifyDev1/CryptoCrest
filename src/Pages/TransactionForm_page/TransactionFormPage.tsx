import { ChangeEvent, useContext, useEffect, useState } from 'react';
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
import { transactionContext } from '../../contexts/TransactionsContext';
import { calculateFees } from '../../Tatum/calculateFees';

const transactionFormPage: React.FC = () => {
  // States
  const { id } = useParams<{ id: string }>();
  const [showAvailableCoins, setShowAvailableCoins] = useState(false);
  const [typedCoin, setTypedCoin] = useState('');
  const [fees, setFees] = useState<number | string>("");
  const [transactionsType, setTransactionType] = useState<string>("");
  const [asset, setAsset] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<number>(0);

  const handleCoinSelection = async (coin: string) => {
    setFormData((prev) => ({ ...prev, asset: coin }));
    setTypedCoin(coin);
    setAsset(coin)
    setShowAvailableCoins(false);
    const cryptoInfo = await fetchCryptoPrice(asset);
    const price = cryptoInfo?.price;
    if (!price) return;
    setFees(calculateFees(price));
  };

  const navigate = useNavigate();
  const transactionsContext = useContext(transactionContext);
  const transactions = transactionsContext.transactions;

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
    // Check if there is an 'id' and it's not "new"
    if (id && id !== "new") {
      // Define an async function to fetch the transaction
      const fetchTransaction = async () => {
        // Find the transaction with the given id from the transactions list
        const fetchedTransaction = transactions.find(
          (transaction) => transaction.id === id
        );
  
        // If transaction is not found, show an error message and navigate away
        if (!fetchedTransaction) {
          toast.error("Transaction not found");
          navigate("/transactions"); // Redirect user to the transactions page
          return;
        }
  
        console.log("Fetched Transaction:", fetchedTransaction);
  
        // Set the form data with the found transaction
        setFormData(fetchedTransaction);
      };
  
      fetchTransaction(); // Call the function to fetch the transaction
    } else {
      // If 'id' is "new", initialize form with default values
      setFormData({
        id: Date.now().toString(), // Generate a unique ID based on timestamp
        type: transactionsType, // Set transaction type
        asset: asset, // Set asset
        amount: amount, // Set amount
        date: date.toString(), // Convert date to string format
        description: description, // Set description
        fees: typeof fees === "string" ? parseFloat(fees) : fees, // Ensure fees is a number
        status: status, // Set status
        value: value, // Set value
      });
    }
  
  // Dependencies array: This effect will re-run if any of these dependencies change
  }, [id, fees, amount, date, status, value, description, asset, transactionsType, transactions, navigate]);
  

  

const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => setTransactionType(e.target.value);
const handleAssetChange = async (e: ChangeEvent<HTMLInputElement>) => {
  setAsset(e.target.value);
  handleCoinSelection(e.target.value);
  setShowAvailableCoins(true);
  try {
    const cryptoInfo = await fetchCryptoPrice(e.target.value);
    if (!cryptoInfo) throw new Error("Error")
    setFees(calculateFees(cryptoInfo.price));
  } catch (error: any) {
    if (error.response && error.response.status === 429) {
      toast.error('Too many requests. Please try again later.');
    } else {
      toast.error('Failed to fetch crypto price. Please try again.');
      console.log(error.message)
    }
  }
}
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => setAmount(parseInt(e.target.value));
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value);
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value);
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading(id === 'new' ? 'Adding transaction...' : 'Updating transaction...');
  
    if (formData.type && formData.asset && formData.amount > 0 && formData.date) {
      if (id === 'new') {
        if (!formData.asset || typeof formData.asset !== 'string') {
          toast.error('Invalid asset selected');
          return;
        }
  
        // Fetch price details
        const result = await fetchCryptoPrice(formData.asset);
        
        if (!result) {
          toast.error('Failed to fetch crypto price, please try again.');
          return;
        }
  
        const { price, coinId, img, symbol } = result;
  
        setValue(price);
  
        const newTransaction = {
          ...formData,
          id: Date.now().toString(),
          value: price * formData.amount,
        };
  
        const username = auth.currentUser?.displayName?.toLowerCase();
        if (!username) {
          toast.error("You're not authenticated");
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
                    price: Number(price),
                    name: currency.name,
                    coinId,
                    img,
                    symbol,
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
                    price: Number(price),
                    name: formData.asset,
                    coinId,
                    img,
                    symbol,
                  },
                },
                { merge: true }
              );
            }
          });
  
          toast.dismiss(toastId);
          toast.success('Transaction added successfully');
          navigate('/dashboard');
        } catch (e: any) {
          toast.dismiss(toastId);
          toast.error(e.message || 'An unexpected error occurred');
        }
      } else {
        console.log('Updating transaction:', formData);
      }
    } else {
      console.log('Something happened');
    }
    toast.dismiss(toastId);
  };
  

  return (
    <div className="transaction-form-page">
      <SideBar currentpage="new" toggleNav={true} />
      <MobileTopNav currentpage={id === "new" ? "New Transaction" : "Edit Transaction"} />
      <MobileNav />
      <main className="new-main-section">
        <form className="transaction-form" onSubmit={handleSubmit}>
          <h3 style={{ textAlign: 'center', color: 'var(--text-color)' }}>
            {id === 'new' ? 'Add Transaction' : 'Edit Transaction'}
          </h3>
          <select
            name="type"
            value={formData.type || transactionsType}
            onChange={handleTypeChange}
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
            value={formData.asset || asset}
            onChange={handleAssetChange}
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
            value={formData.amount || amount === 0 ? '' : amount}
            onChange={handleAmountChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date || date === '' ? '' : date}
            onChange={handleDateChange}
            placeholder="Date of Transaction"
            required
          />
          <input
            type="number"
            name="fees"
            placeholder="Fees"
            value={formData.fees || fees === null ? '' : fees}
            onChange={handleAmountChange}
            required
            disabled
          />
          <select name="status" value={formData.status || status} onChange={handleStatusChange}>
            <option value="">Select Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description || description}
            onChange={handleDescriptionChange}
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
//Export the transacion form page
export default transactionFormPage;
