import './Summery.css';

interface SummaryProps {
    totalTransactions: number;
    totalFees: string;
    balanceChange: string;
}

const SummarySection: React.FC<SummaryProps> = ({ totalTransactions, totalFees, balanceChange }) => {
    return (
        <div className="summary-section">
            <div className="summary-card">
                <h3 className="summary-label">Total Transactions</h3>
                <p className="summary-value">{totalTransactions}</p>
            </div>
            <div className="summary-card">
                <h3 className="summary-label">Total Fees</h3>
                <p className="summary-value">{totalFees}</p>
            </div>
            <div className="summary-card">
                <h3 className="summary-label">Balance Change</h3>
                <p className={`summary-value ${balanceChange.startsWith('-') ? 'negative' : 'positive'}`}>
                    {balanceChange}
                </p>
            </div>
        </div>
    );
};

export default SummarySection;
