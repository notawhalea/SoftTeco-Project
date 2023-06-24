import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

import styles from "./LineChart.module.css";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.history[i].price);
  }
  console.log(coinPrice);
  for (let i = 0; i < coinHistory?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.history[i]?.timestamp * 1000).toLocaleDateString()
    );
  }
  console.log(coinTimestamp);
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          type: "linear",
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row>
        <div className={styles.priceChart}>
          <h1>{coinName} Price Chart</h1>
        </div>
        <div className={styles.chartContainer}>
          <div>
            <Title level={5}>Change: {coinHistory?.change}%</Title>
          </div>
          <div>
            <Title level={5}>
              Current {coinName} Price: $ {currentPrice}
            </Title>
          </div>
        </div>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
