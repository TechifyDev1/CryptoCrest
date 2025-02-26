import ReactECharts from 'echarts-for-react';
import React, { useEffect, useRef, useState } from 'react';
import './Analytics.css';

const AnalyticsSection: React.FC<{
  transactionTrendsData: any[];
  assetDistributionData: any[];
}> = ({ transactionTrendsData, assetDistributionData }) => {
  const chartContainer1 = useRef<HTMLDivElement>(null);
  const chartContainer2 = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    const checkReadiness = (): void => {
      if (chartContainer1.current && chartContainer2.current) {
        const { clientWidth, clientHeight } = chartContainer1.current;
        if (clientHeight > 0 && clientWidth > 0) {
          const { clientWidth, clientHeight } = chartContainer2.current!;
          if (clientHeight > 0 && clientWidth > 0) {
            setIsReady(true);
          } else {
            setTimeout(checkReadiness, 100);
          }
        } else {
          setTimeout(checkReadiness, 100);
        }
      } else {
        setTimeout(checkReadiness, 100);
      }
    };

    checkReadiness();
  }, [chartContainer1, chartContainer2, assetDistributionData]);
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
    title: { text: 'Asset Distribution', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { bottom: '0%' },
    series: [
      {
        name: 'Assets',
        type: 'pie',
        radius: ['40%', '70%'],
        data: assetDistributionData
          .map((data) => ({
            value: parseFloat(`${data.value}`),
            name: data.asset,
          }))
          .filter((item) => item.value > 0),
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
        <div
          ref={chartContainer1}
          className="chart"
          style={{ backgroundColor: 'var(--shade)' }}
        >
          {isReady ? (
            <ReactECharts
              option={trendsOptions}
              style={{ backgroundColor: 'var(--shade)', width: '100%' }}
            />
          ) : (
            <div>--:--</div>
          )}
        </div>
        <div
          ref={chartContainer2}
          className="chart"
          style={{ backgroundColor: 'var(--shade)' }}
        >
          {isReady ? (
            <ReactECharts
              option={distributionOptions}
              style={{ backgroundColor: 'var(--shade)', width: '100%' }}
            />
          ) : (
            <div>--:--</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
