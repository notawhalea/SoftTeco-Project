import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Statistic, Card } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import millify from "millify";
import "./Cryptocur.module.css";
import styles from "./Home.module.css";

const { Title } = Typography;

const optionsCoins = {
  method: "GET",
  url: "https://coinranking1.p.rapidapi.com/coins",
  params: {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
  },
  headers: {
    "X-RapidAPI-Key": "eb71184572msh8f332283060f7cbp1f341fjsnc4685458b6c2",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};
const Cryptocurrencies = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiReturn = await axios
        .request(optionsCoins)
        .then(function (response) {
          setCryptos(response.data?.data?.coins);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchData();
  }, []);
  console.log("resp", cryptos);
  return (
    <div style={{ marginTop: "1%", marginLeft: "8%", marginRight: "9%" }}>
      <Title level={1} style={{ marginLeft: "33%" }}>
        Top 50 World Cryptocurrencies
      </Title>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={4}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.name}`}>
              <Card
                title={currency.name}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p className="title-first">{`${currency.rank}. ${currency.name}`}</p>
                <p className="title-next" style={{ color: "gray" }}>
                  Price: {millify(currency.price)}
                </p>
                <p className="title-next" style={{ color: "gray" }}>
                  Market Cap: {millify(currency.marketCap)}
                </p>
                <p className="title-next" style={{ color: "gray" }}>
                  Daily Change: {millify(currency.change)}%
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cryptocurrencies;
