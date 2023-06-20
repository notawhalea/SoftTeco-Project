import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../app/services/cryptoApi";

const { Title } = Typography;

const Home = () => {
  const { data, isLoading, error } = useGetCryptosQuery();
  console.log(data);
  // const options = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "x-access-token":
  //       "coinranking21292cbb5e73cd72f912fab5b762129de649b0013c285868",
  //   },
  // };
  //
  // fetch("https://api.coinranking.com/v2/reference-currencies", options)
  //   .then((response) => response.json())
  //   .then((result) => console.log(result));
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value="5" />
        </Col>
      </Row>
    </>
  );
};

export default Home;
