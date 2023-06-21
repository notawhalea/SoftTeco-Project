import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../app/services/cryptoApi";
import result from "../app/features/cryptoSlice";
import Coin from "./Coin";
import styles from "./Home.module.css";

const { Title } = Typography;

const Home = () => {
  // const { data, isLoading, error } = useGetCryptosQuery();
  // console.log(data);
  console.log(result);
  const globalStats = result.data;
  console.log(result.data.total);
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

      <div className="home-heading-container">
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
