import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Card, Input } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import millify from "millify";

import styles from "./Cryptocur.module.css";
import { url, params, headers } from "./consts";

import constUtils from "../../constUtils";

const { Title } = Typography;

const optionsCoins = constUtils(url, params, headers);
const Cryptocurrencies = () => {
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
  }, [searchTerm]);

  const filteredData = cryptos.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <Row gutter={[24, 24]} className={styles.cryptoCardContainer}>
        {filteredData.map((currency) => (
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
