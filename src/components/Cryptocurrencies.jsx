import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Card, Input } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import millify from "millify";

import styles from "./Cryptocur.module.css";

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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const apiReturn = await axios
        .request(optionsCoins)
        .then(function (response) {
          const filteredData = response.data?.data?.coins.filter((coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setCryptos(filteredData);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchData();
  }, [cryptos, searchTerm]);
  return (
    <div style={{ marginTop: "1%" }}>
      <Title level={1} style={{ marginLeft: "33%" }}>
        Top 50 World Cryptocurrencies
      </Title>
      <div className={styles.searchCrypto}>
        <Input
          placeholder="Search Cryptocurrency"
          onChange={(e) => setSearchTerm(e.target.value)}
          size="large"
        />
      </div>
      <Row gutter={[36, 36]} className={styles.cryptoCardContainer}>
        {cryptos.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className={styles.cryptoCard}
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.name}`}>
              <Card
                cover={
                  <img
                    className={styles.cryptoImage}
                    src={currency.iconUrl}
                    alt="crypto-image"
                  />
                }
                hoverable
              >
                <p
                  className={styles.titleFirst}
                >{`${currency.rank}. ${currency.name}`}</p>
                <p className={styles.titleNext}>
                  Price: {millify(currency.price)}
                </p>
                <p className={styles.titleNext}>
                  Market Cap: {millify(currency.marketCap)}
                </p>
                <p className={styles.titleNext}>
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
