import React, { useState, useEffect } from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../app/services/cryptoApi";
import result from "../app/features/cryptoSlice";
import Coin from "./Coin";
import styles from "./Home.module.css";
import axios from "axios";

const { Title } = Typography;

let data = {};

const options = {
  method: "GET",
  url: "https://coinranking1.p.rapidapi.com/stats",
  params: {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
  },
  headers: {
    "X-RapidAPI-Key": "eb71184572msh8f332283060f7cbp1f341fjsnc4685458b6c2",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};

try {
  const response = await axios.request(options);
  data = response;
} catch (error) {
  console.error(error);
}
const Home = () => {
  const globalStats = data.data.data;
  const [coin, setCoins] = useState([]);
  const getData = async () => {
    const { data } = await axios.request(options);
    setCoins(data);
  };
  useEffect(() => {
    getData();
    console.log("sss", coin);
  }, [setCoins]);

  console.log("bbbb", coin);
  console.log(JSON.stringify(coin.data));

  return (
    <div className={styles.homeEl}>
      <Title level={1} className={styles.heading}>
        Global Crypto Stats
      </Title>
      <div>
        <Row gutter={[24, 24]}>
          <Col span={12} style={{ textAlign: "center" }}>
            <Statistic
              title="Total Cryptocurrencies"
              value={globalStats.totalCoins}
            />
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Statistic
              title="Total Exchanges"
              value={millify(globalStats.totalExchanges)}
            />
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Statistic
              title="Total Market Cap"
              value={millify(globalStats.totalMarketCap)}
            />
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Statistic
              title="Total 24h Volume"
              value={millify(globalStats.total24hVolume)}
            />
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Statistic
              title="Total Markets"
              value={millify(globalStats.totalMarkets)}
            />
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Statistic
              title="Bitcoin Dominance"
              value={millify(globalStats.btcDominance)}
            />
          </Col>
        </Row>
      </div>

      <div>
        <Title level={1} className={styles.chartTitle}>
          Chart of the Week
        </Title>
        <div>
          <Title level={2} className={styles.homeTitleBest}>
            Best Coins
          </Title>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {globalStats.bestCoins.map((index) => {
              return (
                <Coin
                  key={index.uuid}
                  iconUrl={index.iconUrl}
                  symbol={index.symbol}
                  name={index.name}
                  coinrankingUrl={index.coinrankingUrl}
                />
              );
            })}
          </div>
        </div>
        <div>
          <Title level={2} className={styles.homeTitleNewest}>
            Newest Coins
          </Title>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {globalStats.newestCoins.map((index) => {
              return (
                <Coin
                  key={index.uuid}
                  iconUrl={index.iconUrl}
                  symbol={index.symbol}
                  name={index.name}
                  coinrankingUrl={index.coinrankingUrl}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
