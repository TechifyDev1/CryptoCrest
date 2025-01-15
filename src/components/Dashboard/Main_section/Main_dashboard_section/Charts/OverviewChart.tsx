import ReactECharts from "echarts-for-react";
import React, { useEffect, useRef, useState } from "react";

const OverviewChart: React.FC<{ option: {} }> = ({ option }) => {
    const chartContainer = useRef<HTMLDivElement>(null);
    const [isReady, setIsReady] = useState<boolean>(false);
    useEffect(() => {
        const checkReadiness = (): void => {
            if (chartContainer.current) {
                const { clientWidth, clientHeight } = chartContainer.current;
                if (clientHeight > 0 && clientWidth > 0) setIsReady(true);
            } else {
                setTimeout(checkReadiness, 100);
            }
        }
        checkReadiness();
    }, []);
    return (
        <div style={{ height: "50%", width: "auto", display: 'flex', justifyContent: 'center', alignItems: 'center' }} ref={chartContainer}>
            {isReady ? (<ReactECharts option={option} style={{ height: 100, width: "100%", display: 'flex' }} />) : (<div>--:--</div>)}
        </div>
    )
}

export default OverviewChart;
