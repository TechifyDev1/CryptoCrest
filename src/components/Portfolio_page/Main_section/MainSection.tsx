import React, { useContext, useEffect, useState } from 'react';
import './Main.css';
import OverviewSection from './Overview_section/OverviewSection';
import PerformanceGraph from './Performance_graph_section/PerformanceGraph';
import PortfolioBreakdown from './Portfolio_breakdown_section/PortfolioBreakdownSection';
import RecentTransactions from './Recent_trans_section/RecentTransactions';
import { transactionContext } from '../../../contexts/TransactionsContext';
import { CryptoContext } from '../../../contexts/CryptoContext';
import axios from 'axios';

const MainSection: React.FC<{ toggleSideBar: boolean }> = ({ toggleSideBar }) => {
    const transactionsContext = useContext(transactionContext);
    const transactions = transactionsContext?.transactions || [];
    const cryptosContext = useContext(CryptoContext);
    const totalValue = cryptosContext.crypto.reduce((acc, curr) => {return Number(acc) + Number(curr.balance * curr.price)}, 0);
    const [hoursChange, setHoursChange] = useState<number>(0);
    const coinSet = new Set();
    useEffect(() => {
        const fetchHourlyChange = async () => {
            
            cryptosContext.crypto.forEach(crypto => {
                coinSet.add(crypto.coinId);
            });
    
            for (const coin of coinSet) {
                try {
                    const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_24hr_change=true`);
                    
                    // access 24H change
                    console.log(`${coin} 24H Change:`, res.data[coin as any]?.usd_24h_change); 
                    
                } catch (error) {
                    console.error(`Error fetching data for ${coin}:`, error);
                }
            }
        };
    
        fetchHourlyChange();
    }, [cryptosContext]);

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
                totalValue={`$${totalValue.toLocaleString()}`}
                change24h="3.5%" 
                numberOfAssets={4} 
                bestPerformer="Ethereum" 
                worstPerformer="Cardano" 
                portfolioBreakdown={portfolioBreakdownData} 
            />
            <PortfolioBreakdown breakdownData={portfolioBreakdownData2} />
            <PerformanceGraph data={performanceData} />
            <RecentTransactions transactions={transactions.slice(0, 3)} />
        </div>
    );
};

export default MainSection;
