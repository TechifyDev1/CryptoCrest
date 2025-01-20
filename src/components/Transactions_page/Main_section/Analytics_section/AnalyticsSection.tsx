import ReactECharts from 'echarts-for-react';
import React from 'react';
import './Analytics.css';

interface AnalyticsSectionProps {
    transactionTrendsData: { date: string; amount: number }[];
    assetDistributionData: { asset: string; value: number }[];
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({
    transactionTrendsData,
    assetDistributionData,
}) => {
    const trendsOptions = {
        title: {
            text: 'Transaction Trends',
            left: 'center',
        },
        xAxis: {
            type: 'category',
            data: transactionTrendsData.map((data) => data.date),
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: transactionTrendsData.map((data) => data.amount),
                type: 'line',
                smooth: true,
                color: '#5470c6',
            },
        ],
    };

    const distributionOptions = {
        title: {
            text: 'Asset Distribution',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            bottom: '0%',
        },
        series: [
            {
                name: 'Assets',
                type: 'pie',
                radius: ['40%', '70%'],
                data: assetDistributionData.map((data) => ({
                    value: data.value,
                    name: data.asset,
                })),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };

    return (
        <div className="analytics-section">
            <h2>Analytics & Insights</h2>
            <div className="charts-container">
                <div className="chart" style={{ backgroundColor: 'var(--shade)' }}>
                    <ReactECharts option={trendsOptions} style={{ backgroundColor: 'var(--shade)' }} />
                </div>
                <div className="chart" style={{ backgroundColor: 'var(--shade)' }}>
                    <ReactECharts option={distributionOptions} style={{ backgroundColor: 'var(--shade)' }} />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsSection;
