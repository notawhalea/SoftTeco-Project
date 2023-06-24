import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import axios from "axios";

import styles from "./CryptoDetails.module.css";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const [cryptos, setCryptos] = useState([]);
  const { coinId } = useParams();

  const optionsCoins = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
    },
    headers: {
      "X-RapidAPI-Key": "eb71184572msh8f332283060f7cbp1f341fjsnc4685458b6c2",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiReturn = await axios
        .request(optionsCoins)
        .then(function (response) {
          setCryptos(response.data?.data?.coin);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchData();
  }, []);
  console.log("resp", cryptos);

  const [timePeriod, setTimePeriod] = useState("7d");

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptos?.price && millify(cryptos?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptos?.rank, icon: <NumberOutlined /> },
    {
      title: "Number of exchanges",
      value: `${
        cryptos?.numberOfExchanges && millify(cryptos?.numberOfExchanges)
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptos?.marketCap && millify(cryptos?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptos?.allTimeHigh?.price && millify(cryptos?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptos?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptos?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptos?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${cryptos?.supply?.total && millify(cryptos?.supply?.total)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptos?.supply?.circulating && millify(cryptos?.supply?.circulating)
      }`,
      icon: <DollarCircleOutlined />,
    },
  ];

  return (
    <Col className={styles.coinDetailContainer}>
      <Col className={styles.coinHeadingContainer}>
        <Title level={2} className={styles.coinName}>
          {cryptos.name} ({cryptos.symbol}) Price
        </Title>
        <p>
          {cryptos.name} live price in US dollars. View value statistics, market
          cap and supply.
        </p>
        <Select
          defaultValue="7d"
          className={styles.selectTimeperiod}
          placeholder="Select Time Period"
          onChange={(value) => setTimePeriod(value)}
        >
          {time.map((date) => (
            <Option key={date}>{date}</Option>
          ))}
        </Select>
        <Col className={styles.statsContainer}>
          <Col className={styles.coinValueStatistics}>
            <Col className={styles.coinValueStatisticsHeading}>
              <Title level={3} className={styles.coinDetailsHeading}>
                {cryptos.name} Value Statistics
              </Title>
              <p>
                An overview showing the statistics of {cryptos.name}, such as
                the base and quote currency, the rank, and trading volume.
              </p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className={styles.coinStats}>
                <Col className={styles.coinStatsName}>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className={styles.stats}>{value}</Text>
              </Col>
            ))}
          </Col>
          <Col className={styles.otherStatsInfo}>
            <Col className={styles.coinValueStatisticsHeading}>
              <Title level={3} className={styles.coinDetailsHeading}>
                Other Statistics
              </Title>
              <p>
                An overview showing the other stats of {cryptos.name}, such as
                number of markets, total supply, and number of exchanges.
              </p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className={styles.coinStats}>
                <Col className={styles.coinStatsName}>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className={styles.stats}>{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className={styles.coinDescLink}>
          <Col className={styles.coinLinks}>
            <Title level={3} className={styles.coinDetailsHeading}>
              {cryptos.name} Links
            </Title>
            {cryptos.links?.map((link) => (
              <Row className={styles.coinLink} key={link.name}>
                <Title level={5} className={styles.linkName}>
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
