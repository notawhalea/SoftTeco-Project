import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Card, Col, Row, Typography } from "antd";
import styles from "./News.module.css";
import moment from "moment";

const { Title, Text } = Typography;

const demoImage =
  "data:image/png;base64,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";

const optionsNews = {
  method: "GET",
  url: 'https://bing-news-search1.p.rapidapi.com/news/search?q=cryptocurrency&qft=interval%3d"7"&form=PTFTNR&count=47',
  params: {
    safeSearch: "Off",
    textFormat: "Raw",
  },
  headers: {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Key": "eb71184572msh8f332283060f7cbp1f341fjsnc4685458b6c2",
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  },
};
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
      <Title level={1} style={{ marginLeft: "31%" }}>
        Today's news about cryptocurrencies
      </Title>
      <Row gutter={[24, 24]}>
        {news.value?.map((newItem) => (
          <Col xs={24} sm={12} lg={8} key={newItem.name}>
            <Card hoverable className={styles.newsCard}>
              <a href={newItem.url} target="_blank" rel="noreferrer">
                <div className={styles.newsImageContainer}>
                  <Title className={styles.newsTitle} level={4}>
                    {newItem.name.length > 75
                      ? `${newItem.name.substring(0, 75)}...`
                      : newItem.name}
                  </Title>
                </div>
                <div style={{ display: "flex" }}>
                  <img
                    src={newItem?.image?.thumbnail?.contentUrl || demoImage}
                    alt=""
                  />
                  <p className={styles.parDescription}>
                    {newItem.description.length > 125
                      ? `${newItem.description.substring(0, 125)}...`
                      : newItem.description}
                  </p>
                </div>

                <div className={styles.providerContainer}>
                  <div>
                    <Avatar
                      src={
                        newItem.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt=""
                    />
                    <Text className={styles.providerName}>
                      {newItem.provider[0]?.name}
                    </Text>
                  </div>
                  <Text style={{ marginTop: "1%" }}>
                    {moment(newItem.datePublished).startOf("ss").fromNow()}
                  </Text>
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
