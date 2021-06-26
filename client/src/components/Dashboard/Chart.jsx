import React, { useState, useEffect } from "react";
import Title from "../common/Title";
import LineChart from "../common/LineChart";
import Axios from "axios";

const Chart = () => {
    const [chartData, setChartData] = useState(undefined);

    useEffect(() => {
        const getData = async () => {
            const url = `http://localhost:3001/api/data/random`;
            const response = await Axios.get(url);
            if (response.data.status === "success") {
                setChartData(response.data);
            }
        };
        getData();
    }, []);

    return (
        <React.Fragment>
            {chartData && (
                <div style={{ maxHeight: "330px", minHeight: "200px" }}>
                    <Title>Explore {chartData.name}'s Stock Chart</Title>
                    <LineChart
                        pastDataPeriod={chartData.data}
                        stockInfo={{ ticker: chartData.ticker }}
                        duration={"3 years"}
                    />
                </div>
            )}
        </React.Fragment>
    );
};

export default Chart;
