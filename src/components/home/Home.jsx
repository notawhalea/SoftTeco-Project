import React, { useState, useEffect } from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import Coin from "../coin/Coin";
import styles from "./Home.module.css";
import axios from "axios";

import { url, params, headers } from "./consts";
import { getApiOptions } from "../../utils";

const { Title } = Typography;

const options = getApiOptions(url, params, headers);

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
      <p className={styles.heading}>Global Crypto Stats</p>
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
              title="Total Nfts"
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
        <p className={styles.heading}>Chart of the Week</p>
        <div>
          <p className={styles.underHeadingTitle}>Best Coins</p>
          <div className={styles.underHeading}>
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
          <p className={styles.underHeadingTitle}>Newest Coins</p>
          <div className={styles.underHeading}>
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
