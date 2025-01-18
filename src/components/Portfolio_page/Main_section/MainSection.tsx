import React from 'react';
import './Main.css';
import OverviewSection from './Overview_section/OverviewSection';
import PerformanceGraph from './Performance_graph_section/PerformanceGraph';
import PortfolioBreakdown from './Portfolio_breakdown_section/PortfolioBreakdownSection';
import RecentTransactions from './Recent_trans_section/RecentTransactions';
const MainSection: React.FC<{ toggleSideBar: boolean }> = ({ toggleSideBar }) => {
    const portfolioBreakdownData = [
        { name: 'Bitcoin', value: 5000 },
        { name: 'Ethereum', value: 3000 },
        { name: 'Cardano', value: 1500 },
        { name: 'Other', value: 500 },
    ]
    const portfolioBreakdownData2 = [
        { name: 'Bitcoin', value: 5000, percentage: 50, currentPrice: '$25,000' },
        { name: 'Ethereum', value: 3000, percentage: 30, currentPrice: '$1,500' },
        { name: 'Cardano', value: 1500, percentage: 15, currentPrice: '$0.50' },
        { name: 'Other', value: 500, percentage: 5, currentPrice: '-' },
    ]
    const performanceData = [
        { date: '2023-12-01', value: 5000 },
        { date: '2023-12-02', value: 5200 },
        { date: '2023-12-03', value: 5100 },
        { date: '2023-12-04', value: 5300 },
        { date: '2023-12-05', value: 5400 },
    ]
    const transactions = [
        { date: '2023-12-01', asset: 'Bitcoin', type: 'Buy', quantity: 0.05, value: 1250 },
        { date: '2023-12-03', asset: 'Ethereum', type: 'Sell', quantity: 1.5, value: 2400 },
        { date: '2023-12-05', asset: 'Cardano', type: 'Transfer', quantity: 1000, value: 500 },
    ]
    return (
        <div className="main-section" style={{ width: toggleSideBar ? '' : '90%' }}>
            <OverviewSection totalValue="$10,000" change24h="3.5%" numberOfAssets={4} bestPerformer="Ethereum" worstPerformer="Cardano" portfolioBreakdown={portfolioBreakdownData} />
            <PortfolioBreakdown breakdownData={portfolioBreakdownData2} />
            <PerformanceGraph data={performanceData} />
            <RecentTransactions transactions={transactions} />
        </div>
    );
}

export default MainSection;
