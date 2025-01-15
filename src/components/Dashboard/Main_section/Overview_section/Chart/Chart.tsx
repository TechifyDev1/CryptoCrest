import ReactECharts from 'echarts-for-react';
import { useEffect, useRef, useState } from 'react';
import './Chart.css';
const Chart: React.FC = () => {
    const chartContainer = useRef<HTMLDivElement>(null);
    const [isContainerReady, setIsContainerReady] = useState<boolean>(false);
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
    }, []);
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
            data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
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
                data: [4001, 2222, 3432, 2345, 2334, 4567],
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
