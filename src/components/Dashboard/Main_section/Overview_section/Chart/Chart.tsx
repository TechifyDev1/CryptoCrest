import ReactECharts from 'echarts-for-react';
import { useContext, useEffect, useRef, useState } from 'react';
import './Chart.css';
import { transactionContext } from '../../../../../contexts/TransactionsContext';
const Chart: React.FC = () => {
    const chartContainer = useRef<HTMLDivElement>(null);
    const [isContainerReady, setIsContainerReady] = useState<boolean>(false);
    const transactionsContext = useContext(transactionContext);
    const [transactions, setTransactions] = useState<any[]>([]);
    useEffect(() => {
        const checkReadiness = (): void => {
            if (chartContainer.current) {
                const { clientWidth, clientHeight } = chartContainer.current;
                if (clientHeight > 0 && clientWidth > 0) {
                    setIsContainerReady(true);
                }
            } else {
                setTimeout(checkReadiness, 100);
            }
        }
        checkReadiness();
        setTransactions(transactionsContext.transactions);
    }, [transactionContext]);
    const options = {
        title: {
            text: "Crypto Price Trend",
            left: "center",
            show: false,
        },
        tooltip: {
            trigger: "axis",
            show: false,
        },
        xAxis: {
            type: "category",
            data: transactions.map(transaction => transaction.date),
            show: false,
        },
        yAxis: {
            show: false,
            type: "value",
        },
        series: [
            {
                name: 'ETH',
                type: 'line',
                data: transactions.map(transaction => transaction.amount),
                smooth: true,
            },
        ],
    };
    return (
        <div className="chart_container" ref={chartContainer}>
            {isContainerReady ? (<ReactECharts option={options} />) : (<div>--:--</div>)}
        </div>
    );
}

export default Chart;
