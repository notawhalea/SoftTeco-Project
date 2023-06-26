import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select, Card } from "antd";
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
import LineChart from "../LineChart";
import { getApiOptions } from "../../utils";
import { url, paramsCoinDetails, headers } from "./consts";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [cryptos, setCryptos] = useState([]);
  const optionsCoinDetails = getApiOptions(
    url + `/${coinId}`,
    paramsCoinDetails,
    headers
  );
  useEffect(() => {
    const fetchData = async () => {
      const apiReturn = await axios
        .request(optionsCoinDetails)
        .then(function (response) {
          setCryptos(response.data?.data?.coin);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const [timePeriods, setTimePeriods] = useState("7d");
  const [coinHistory, setCoinHistory] = useState();
  //TODO вот так лучше думаю
  useEffect(() => {
    const optionsCoinCharts = getApiOptions(
      url + `/${coinId}/history?timeperiod=${timePeriods}`,
      {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: `${timePeriods}`,
      },
      headers
    );

    const fetchData = async () => {
      const apiReturn = await axios
        .request(optionsCoinCharts)
        .then(function (response) {
          setCoinHistory(response?.data?.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchData();
  }, [timePeriods, setTimePeriods]);

  const time = ["7d", "30d", "1y", "3m", "3y", "5y"];
  //TODO вообще это все можно в одну функцию загонять но тогда будет 10 вызовов с разными парамсами, хз лучше ли это
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
          onChange={(value) => setTimePeriods(value)}
        >
          {time.map((date) => (
            <Option key={date}>{date}</Option>
          ))}
          {console.log(timePeriods)}
        </Select>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptos?.price)}
          coinName={cryptos?.name}
        />
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
            {stats.map(({ icon, title, value }, index) => (
              <Col className={styles.coinStats} key={index}>
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
            {genericStats.map(({ icon, title, value }, index) => (
              <Col className={styles.coinStats} key={index}>
                <Col className={styles.coinStatsName}>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className={styles.stats}>{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <div className={styles.coinDescLink}>
          <div>
            <Title level={3} className={styles.coinDetailsHeading}>
              {cryptos.name} Links
            </Title>
            <Row gutter={[24, 24]} className={styles.coinLink}>
              {cryptos.links?.map((link, index) => (
                <Col xs={24} sm={12} lg={6} key={index}>
                  <Card>
                    <Title level={5} className={styles.linkName}>
                      {link.type}
                    </Title>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.name}
                    </a>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
