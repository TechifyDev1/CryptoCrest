import ReactECharts from 'echarts-for-react';
import React from 'react';
import './Performance.css';

interface PerformanceGraphProps {
  data: {
    date: string;
    value: number;
  }[];
}

const PerformanceGraph: React.FC<PerformanceGraphProps> = ({ data }) => {
  // Prepare data for the chart
  const dates = data.map((entry) => entry.date);
  const values = data.map((entry) => entry.value);

  const chartOptions = {
    tooltip: {
      trigger: 'axis',
      formatter: 'Date: {b}<br/>Value: ${c}',
    },
    xAxis: {
      type: 'category',
      data: dates,
      boundaryGap: false,
      axisLine: { lineStyle: { color: '#ccc' } },
      axisLabel: { color: '#888' },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#ccc' } },
      axisLabel: { color: '#888', formatter: '${value}' },
      splitLine: { lineStyle: { color: '#eee' } },
    },
    series: [
      {
        name: 'Portfolio Value',
        type: 'line',
        data: values,
        smooth: true,
        lineStyle: {
          color: 'rgba(21, 147, 230, 1)',
          width: 2,
        },
        areaStyle: {
          color: 'rgba(21, 147, 230, 0.5)',
        },
        itemStyle: {
          color: 'rgba(21, 147, 230, 0.5)',
        },
      },
    ],
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      containLabel: true,
    },
    title: {
      text: 'Portfolio Performance',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
    },
  };

  return (
    <div className="performance-graph">
      <ReactECharts
        option={chartOptions}
        style={{ height: '400px', width: '100%' }}
      />
    </div>
  );
};

export default PerformanceGraph;
