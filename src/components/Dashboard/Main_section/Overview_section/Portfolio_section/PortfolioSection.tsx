import React, { useContext, useEffect, useState } from "react";
import './Portfolio.css';
import { transactionContext } from "../../../../../contexts/TransactionsContext";
import { CryptoContext } from "../../../../../contexts/CryptoContext";

const PortfolioSection: React.FC = () => {
    // Get the transactions context
    const transactionsContext = useContext(transactionContext);
    // State to store total income
    const [totalIncome, setTotalIncome] = useState<number>(0);
    // Get the cryptos context
    const cryptosContext = useContext(CryptoContext);
    // State to store recent cryptos
    const [recentCryptos, setRecentCryptos] = useState<any[]>([]);

    useEffect(() => {
        // Calculate total income from transactions
        setTotalIncome(transactionsContext.transactions.reduce((acc: any, curr: any) => {
            if((curr.type.toLowerCase()) != "buy") {
                console.log(curr.value, typeof curr.value);
                return (acc + Number(curr.value)).toFixed(2);
            } else {
                return acc;
            }
        }, 0));
        // Get the first 3 cryptos from the context
        setRecentCryptos(cryptosContext.crypto.slice(0, 3));
        
    }, [transactionsContext]);

    return (
        <div className="recent_trans">
            <div className="header">
                <p>Your portfolio</p>
            </div>
            <div className="balance-section">
                <span><h2>${totalIncome}</h2></span>
                <span>Total balance</span>
            </div>
            <div className="coins-balances">
                {/* Render recent cryptos */}
                {recentCryptos ? recentCryptos.map((crypto: any, index: number) => (
                <div className="coin" key={index}>
                    <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem', alignItems: 'center' }}>
                        <img src={crypto.img} width={25} alt={crypto.name} style={{borderRadius: "50%"}} />
                        {crypto.name}
                    </div>
                    <div className="amt-container">
                        <span><b>{crypto.balance + " " + crypto.symbol}</b></span>
                        <span>${crypto.price * crypto.balance}</span>
                    </div>
                </div>
                )) : (
                    <div style={{width: "100%", textAlign: "center"}}>
                        <i>Add transactions to see</i>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PortfolioSection;
