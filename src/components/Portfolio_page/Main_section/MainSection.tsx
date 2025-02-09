import React, { useContext } from 'react';
import './Main.css';
import OverviewSection from './Overview_section/OverviewSection';
import PerformanceGraph from './Performance_graph_section/PerformanceGraph';
import PortfolioBreakdown from './Portfolio_breakdown_section/PortfolioBreakdownSection';
import RecentTransactions from './Recent_trans_section/RecentTransactions';
import { transactionContext } from '../../../contexts/TransactionsContext';

const MainSection: React.FC<{ toggleSideBar: boolean }> = ({ toggleSideBar }) => {
    const transactionsContext = useContext(transactionContext);
    const transactions = transactionsContext?.transactions || [];

    const portfolioBreakdownData = [
        { name: 'Bitcoin', value: 5000 },
        { name: 'Ethereum', value: 3000 },
        { name: 'Cardano', value: 1500 },
        { name: 'Other', value: 500 },
    ];

    const portfolioBreakdownData2 = [
        { name: 'Bitcoin', value: 5000, percentage: 50, currentPrice: '$25,000' },
        { name: 'Ethereum', value: 3000, percentage: 30, currentPrice: '$1,500' },
        { name: 'Cardano', value: 1500, percentage: 15, currentPrice: '$0.50' },
    ];

    const performanceData = [
        { date: '2023-12-01', value: 5000 },
        { date: '2023-12-02', value: 5200 },
        { date: '2023-12-03', value: 5100 },
        { date: '2023-12-04', value: 5300 },
        { date: '2023-12-05', value: 5400 },
    ];

    return (
        <div className="main-section" style={{ width: toggleSideBar ? '80%' : '90%' }}>
            <OverviewSection 
                totalValue="$10,000" 
                change24h="3.5%" 
                numberOfAssets={4} 
                bestPerformer="Ethereum" 
                worstPerformer="Cardano" 
                portfolioBreakdown={portfolioBreakdownData} 
            />
            <PortfolioBreakdown breakdownData={portfolioBreakdownData2} />
            <PerformanceGraph data={performanceData} />
            <RecentTransactions transactions={transactions.slice(0, 2)} />
        </div>
    );
};

export default MainSection;
