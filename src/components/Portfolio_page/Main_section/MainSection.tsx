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
    const [bestAsset, setBestAsset] = useState<string>('');
    const [worstAsset, setWorstAsset] = useState<string>('');
    const [portfolioBreakdownData, setPortfolioBreakdownData] = useState<any[]>([]);
    const coinSet = new Set();
    useEffect(() => {
        const fetchHourlyChange = async () => {
            cryptosContext.crypto.forEach(crypto => {
                coinSet.add(crypto.coinId);
            });
    
            const res = await axios.get(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${[...coinSet].join(",")}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
            );
    
            const data = res.data; // Extract data
    
            // ✅ Calculate Total Market Cap
            const totalMarketCap = data.reduce((acc: any, curr: any) => acc + (curr.market_cap || 0), 0);
    
            // ✅ Calculate Weighted 24h Change
            const weighted24hChange =
                data.reduce((acc: any, curr: any) => acc + ((curr.market_cap || 0) * (curr.price_change_percentage_24h || 0)), 0) /
                totalMarketCap;
    
            // ✅ Find Best and Worst Performer
            let bestPerformer = data[0];  // Start with the first asset
            let worstPerformer = data[0]; // Start with the first asset
    
            data.forEach((asset: any) => {
                if (asset.price_change_percentage_24h > bestPerformer.price_change_percentage_24h) {
                    bestPerformer = asset;
                }
                if (asset.price_change_percentage_24h < worstPerformer.price_change_percentage_24h) {
                    worstPerformer = asset;
                }
            });
    
            // ✅ Update State
            setBestAsset(bestPerformer.name);
            setWorstAsset(worstPerformer.name);
            setHoursChange(weighted24hChange);
        };
    
        fetchHourlyChange();
        if (cryptosContext.crypto.length > 0) {
            setPortfolioBreakdownData(cryptosContext.crypto.map(({ coinId, balance }) => ({ name: coinId, value: balance })));
        }
    }, [cryptosContext.crypto]);
    

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
                change24h={`${hoursChange.toFixed(1)}`} 
                numberOfAssets={cryptosContext.crypto.length} 
                bestPerformer={bestAsset}
                worstPerformer={worstAsset} 
                portfolioBreakdown={portfolioBreakdownData} 
            />
            <PortfolioBreakdown breakdownData={portfolioBreakdownData2} />
            <PerformanceGraph data={performanceData} />
            <RecentTransactions transactions={transactions.slice(0, 3)} />
        </div>
    );
};

export default MainSection;
