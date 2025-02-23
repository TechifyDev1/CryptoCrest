import ReactECharts from 'echarts-for-react';
import React, { useEffect, useRef, useState } from 'react';

const CryptoChart: React.FC = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the chart container is fully rendered before initializing ECharts
    const checkDimension = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        if (clientWidth > 0 && clientHeight > 0) {
          setIsReady(true);
        }
      } else {
        setTimeout(checkDimension, 100);
      }
    };
    checkDimension();
  }, []);

  const options = {
    title: {
      text: 'Crypto Price Trend',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Bitcoin',
        type: 'line',
        data: [30000, 32000, 35000, 28000, 30000, 31000],
        smooth: false, // Makes the line smooth
      },
      {
        name: 'ETH',
        type: 'bar',
        data: [400, 1222, 3432, 2345, 2334, 45678],
        smooth: true,
      },
    ],
  };

  return (
    <div
      style={{
        height: '50%',
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      ref={containerRef}
    >
      {/* Only render the chart after the container is ready */}
      {isReady && (
        <ReactECharts option={options} style={{ height: 200, width: '50%' }} />
      )}
    </div>
  );
};

export default CryptoChart;
