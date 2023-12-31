import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Card, Col, Row, Typography } from "antd";
import styles from "./News.module.css";
import moment from "moment";
import { url, params, headers } from "./consts";
import { getApiOptions } from "../../utils";

const { Title, Text } = Typography;

const demoImage =
  "https://s2.coinmarketcap.com/static/img/coins/200x200/1975.png";
const optionsNews = getApiOptions(url, params, headers);
const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiReturn = await axios
        .request(optionsNews)
        .then(function (response) {
          setNews(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchData();
  }, []);
  return (
    <div className={styles.mainEl}>
      <p className={styles.todayNews}>Today's Cryptocurrency News</p>
      <Row gutter={[24, 24]}>
        {news.value?.map((newItem) => (
          <Col xs={24} sm={12} lg={8} key={newItem.name}>
            <Card hoverable className={styles.newsCard}>
              <a href={newItem.url} target="_blank" rel="noreferrer">
                <div className={styles.newsImageContainer}>
                  <Title className={styles.newsTitle} level={4}>
                    {newItem.name}
                  </Title>
                </div>
                <div style={{ display: "flex" }}>
                  <img
                    src={newItem?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news-content"
                  />
                  <p className={styles.parDescription}>{newItem.description}</p>
                </div>

                <div className={styles.providerContainer}>
                  <div>
                    <Avatar
                      src={
                        newItem.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt="news-avatar"
                    />
                    <Text className={styles.providerName}>
                      {newItem.provider[0]?.name}
                    </Text>
                  </div>
                  <p className={styles.timeFromNow}>
                    {moment(newItem.datePublished).startOf("ss").fromNow()}
                  </p>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
