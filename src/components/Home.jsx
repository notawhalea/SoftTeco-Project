import React, { useState, useEffect } from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import Coin from "./Coin";
import styles from "./Home.module.css";
import axios from "axios";

const { Title } = Typography;

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
const Home = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiReturn = await axios
        .request(options)
        .then(function (response) {
          setCoins(response.data?.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchData();
  }, []);
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
              value={coins.totalCoins}
            />
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Statistic
              title="Total Exchanges"
              value={millify(coins.totalExchanges)}
            />
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Statistic
              title="Total Market Cap"
              value={millify(coins.totalMarketCap)}
            />
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Statistic
              title="Total 24h Volume"
              value={millify(coins.total24hVolume)}
            />
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Statistic
              title="Total Markets"
              value={millify(coins.totalMarkets)}
            />
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Statistic
              title="Bitcoin Dominance"
              value={millify(coins.btcDominance)}
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
            {coins.bestCoins?.map((index) => {
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
            {coins.newestCoins?.map((index) => {
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
