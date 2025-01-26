import { useEffect, useState } from "react";
import SideBar from "../../components/Helpers/Sidebar/SideBar";
import MobileTopNav from "../../components/Helpers/Mobile_topnav/MobileTopNav";
import MobileNav from "../../components/Helpers/Mobile_nav/MobileNav";
import { useNavigate, useParams } from "react-router-dom";
import './TransactionForm.css';
import { toast } from "sonner";

const transactionFormPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    interface Transaction {
        id: string;
        type: string;
        cryptocurrency: string;
        amount: number;
        date: string;
        description: string;
      }
  
    const [formData, setFormData] = useState<Transaction>({
      id: '',
      type: '',
      cryptocurrency: '',
      amount: 0,
      date: '',
      description: '',
    });
  
    useEffect(() => {
      if (id && id !== 'new') {
        // Fetch transaction details for editing
        const fetchTransaction = async () => {
          // Example: Fetch from backend or state
          const fetchedTransaction = {
            id,
            type: 'Buy',
            cryptocurrency: 'Bitcoin',
            amount: 2,
            date: '2025-01-01',
            description: 'Description',
          };
          setFormData(fetchedTransaction);
        };
        fetchTransaction();
      }
    }, [id]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      toast.loading('loading')
      if (formData.type && formData.cryptocurrency && formData.amount > 0 && formData.date) {
        if (id === 'new') {
          // Add transaction logic
          console.log('Adding transaction:', formData);
        } else {
          // Update transaction logic
          console.log('Updating transaction:', formData);
        }
        navigate('/transactions'); // Redirect after submission
      }
    };
  return (
    <div className="transaction-form-page">
        <SideBar currentpage="new" toggleNav={true} />
        <MobileTopNav currentpage="New" />
        <MobileNav />
        <main className="new-main-section">
        <form className="transaction-form" onSubmit={handleSubmit}>
      <h3 style={{textAlign: 'center', color: 'var(--text-color)'}}>{id === 'new' ? 'Add Transaction' : 'Edit Transaction'}</h3>
      <select name="type" value={formData.type} onChange={handleChange} required>
        <option value="">Select Type</option>
        <option value="Buy">Buy</option>
        <option value="Sell">Sell</option>
      </select>
      <input
        type="text"
        name="cryptocurrency"
        placeholder="Cryptocurrency (e.g., Bitcoin)"
        value={formData.cryptocurrency}
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
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      <button type="submit">{id === 'new' ? 'Add Transaction' : 'Save Changes'}</button>
    </form>
        </main>
    </div>
  );
}

export default transactionFormPage;