import React from "react";
import OverviewChart from "./Charts/OverviewChart";
import './Overview.css';

const OverviewContainer: React.FC = () => {
    const options = {
        title: {
            text: "Crypto Price Trend",
            left: "center",
            show: false,
        },
        tooltip: {
            trigger: "axis",
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
                type: 'bar',
                data: [4001, 1222, 3432, 2345, 2334, 4567],
                smooth: true,
            },
        ],
    };
    return (
        <div className="overview-container">
            <div className="header">
                <h2>Dashboard</h2>
                <span>Dashboard/crypto current</span>
            </div>
            <div className="charts-container">
                <div className="chart" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <span className="title">purchase</span>
                        <OverviewChart option={options} />
                    </div>
                    <span className="amount">$14,400</span>
                </div>
                <div className="chart" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <span className="title">revenue</span>
                        <OverviewChart option={options} />
                    </div>
                    <span className="amount">$14,400</span>
                </div>
                <div className="chart" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <span className="title">market price</span>
                        <OverviewChart option={options} />
                    </div>
                    <span className="amount">$14,400</span>
                </div>
            </div>
        </div>
    )
}

export default OverviewContainer;
