import { Dispatch, SetStateAction, useState, useEffect, useContext } from 'react';
import './Filter.css';
import { Transaction } from '../../../../type';
import { CryptoContext } from '../../../../contexts/CryptoContext';

const FilterSearchSection: React.FC<{
  setFilteredTransactions: Dispatch<SetStateAction<Transaction[]>>;
  transactions: Transaction[];
}> = ({ setFilteredTransactions, transactions }) => {
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState('All');
  const [assetType, setAssetType] = useState('All');
  const [transactionType, setTransactionType] = useState('All');
  const cryptosContext = useContext(CryptoContext);
  const cryptos = cryptosContext?.crypto;

  useEffect(() => {
    handleFilter();
  }, [search, dateRange, assetType, transactionType]);

  const handleFilter = () => {
    let filtered = [...transactions];

    // Search Filter
    if (search.trim()) {
      filtered = filtered.filter(
        (tr) =>
          tr.asset.toLowerCase().includes(search.toLowerCase()) ||
          tr.type.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Date Range Filter
    if (dateRange !== 'All') {
      const now = new Date();
      filtered = filtered.filter((tr) => {
        const transactionDate = new Date(tr.date);
        switch (dateRange) {
          case 'Last 7 Days':
            return transactionDate >= new Date(now.setDate(now.getDate() - 7));
          case 'Last 30 Days':
            return transactionDate >= new Date(now.setDate(now.getDate() - 30));
          case 'This Year':
            return transactionDate.getFullYear() === new Date().getFullYear();
          default:
            return true;
        }
      });
    }

    // Asset Type Filter
    if (assetType !== 'All') {
      filtered = filtered.filter((tr) => tr.asset === assetType);
    }

    // Transaction Type Filter
    if (transactionType !== 'All') {
      filtered = filtered.filter((tr) => tr.type === transactionType);
    }

    setFilteredTransactions(filtered);
  };

  return (
    <div className="filter-search-section">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filters">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="filter-dropdown"
        >
          <option value="All">All Time</option>
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="This Year">This Year</option>
        </select>

        <select
          value={assetType}
          onChange={(e) => setAssetType(e.target.value)}
          className="filter-dropdown"
        >
          <option value="All">All Assets</option>
          {cryptos?.map((crypto) => (
            <option key={crypto.coinId} value={crypto.name}>
              {crypto.name}
            </option>
          ))}
        </select>

        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="filter-dropdown"
        >
          <option value="All">All Transactions</option>
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
          <option value="Transfer">Transfer</option>
        </select>
      </div>

      <button
        onClick={() => {
          setSearch('');
          setDateRange('All');
          setAssetType('All');
          setTransactionType('All');
          setFilteredTransactions(transactions); // Reset filter
        }}
        className="reset-filters"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSearchSection;
