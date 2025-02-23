import ReactECharts from 'echarts-for-react';
import React from 'react';
import './Breakdown.css';

interface PortfolioBreakdownProps {
  breakdownData: {
    name: string;
    value: number;
    percentage: number;
    currentPrice: string;
  }[];
}

const PortfolioBreakdown: React.FC<PortfolioBreakdownProps> = ({
  breakdownData,
}) => {
  const chartData = breakdownData.map((item) => ({
    name: item.name,
    value: item.value,
  }));

  const chartOptions = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
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
        data: chartData,
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
    <div className="portfolio-breakdown">
      <h2>Portfolio Breakdown</h2>
      <div className="breakdown-content">
        <div className="chart-container">
          <ReactECharts
            option={chartOptions}
            style={{ height: '300px', width: '100%' }}
          />
        </div>
        <div className="breakdown-table">
          <table>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Value</th>
                <th>% of Portfolio</th>
                <th>Current Price</th>
              </tr>
            </thead>
            <tbody>
              {breakdownData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.value.toFixed(2)}</td>
                  <td>{item.percentage.toFixed(2)}%</td>
                  <td>{item.currentPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBreakdown;
