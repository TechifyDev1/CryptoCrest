import { useState } from 'react';
import './Filter.css';

const FilterSearchSection: React.FC = () => {
    const [search, setSearch] = useState('');
    const [dateRange, setDateRange] = useState('Last 7 Days');
    const [assetType, setAssetType] = useState('All');
    const [transactionType, setTransactionType] = useState('All');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleFilterReset = () => {
        setSearch('');
        setDateRange('Last 7 Days');
        setAssetType('All');
        setTransactionType('All');
    };

    return (
        <div className="filter-search-section">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={search}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            <div className="filters">
                <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="filter-dropdown"
                >
                    <option value="Last 7 Days">Last 7 Days</option>
                    <option value="Last 30 Days">Last 30 Days</option>
                    <option value="This Year">This Year</option>
                    <option value="Custom Range">Custom Range</option>
                </select>

                <select
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value)}
                    className="filter-dropdown"
                >
                    <option value="All">All Assets</option>
                    <option value="Bitcoin">Bitcoin</option>
                    <option value="Ethereum">Ethereum</option>
                    <option value="Others">Others</option>
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

            <button onClick={handleFilterReset} className="reset-filters">
                Reset Filters
            </button>
        </div>
    );
};

export default FilterSearchSection;
