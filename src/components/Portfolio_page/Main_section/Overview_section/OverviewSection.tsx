import ReactECharts from 'echarts-for-react';
import React from 'react';
import './Overview.css';

interface OverviewSectionProps {
    totalValue: string;
    change24h: string;
    numberOfAssets: number;
    bestPerformer: string;
    worstPerformer: string;
    portfolioBreakdown: { name: string; value: number }[];
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ totalValue, change24h, numberOfAssets, bestPerformer, worstPerformer, portfolioBreakdown }) => {
    const isPositiveChange = parseFloat(change24h) >= 0;

    const pieChartOptions = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
            orient: 'horizontal',
            left: 'left',
        },
        series: [
            {
                name: 'Portfolio Breakdown',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold',
                        color: 'white',
                    },
                },
                labelLine: {
                    show: false,
                },
                data: portfolioBreakdown,
            },
        ],
    };

    return (
        <div className="overview-section">
            <div className="overview-cards">
                <div className="overview-card">
                    <h3>Total Portfolio Value</h3>
                    <p className="portfolio-value">{totalValue}</p>
                </div>
                <div className="overview-card">
                    <h3>24-Hour Change</h3>
                    <p className={`change ${isPositiveChange ? 'positive' : 'negative'}`}>
                        {isPositiveChange ? '+' : ''}{change24h}
                    </p>
                </div>
                <div className="overview-card">
                    <h3>Number of Assets</h3>
                    <p>{numberOfAssets}</p>
                </div>
                <div className="overview-card">
                    <h3>Best Performer</h3>
                    <p>{bestPerformer}</p>
                </div>
                <div className="overview-card">
                    <h3>Worst Performer</h3>
                    <p>{worstPerformer}</p>
                </div>
            </div>
            <div className="overview-chart">
                <ReactECharts
                    option={pieChartOptions}
                    style={{ height: '300px', width: '100%', color: 'white' }}
                />
            </div>
        </div>
    );
};

export default OverviewSection;
