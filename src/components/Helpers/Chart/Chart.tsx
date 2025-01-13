import ReactECharts from "echarts-for-react";
import React, { useEffect, useRef, useState } from "react";

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
        }
        checkDimension();
    }, []);

    const options = {
        title: {
            text: "Crypto Price Trend",
            left: "center",
        },
        tooltip: {
            trigger: "axis",
        },
        xAxis: {
            type: "category",
            data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                name: "Bitcoin",
                type: "line",
                data: [30000, 32000, 35000, 28000, 30000, 31000],
                smooth: true, // Makes the line smooth
            },
        ],
    };

    return (
        <div style={{ height: "100%", width: "100%" }} ref={containerRef}>
            {/* Only render the chart after the container is ready */}
            {isReady && (
                <ReactECharts option={options} style={{ height: 400, width: "100%" }} />
            )}
        </div>
    );
};

export default CryptoChart;
