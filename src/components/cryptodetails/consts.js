import millify from "millify";
import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

export const url = "https://coinranking1.p.rapidapi.com/coin";
export const paramsCoinDetails = {
  referenceCurrencyUuid: "yhjMzLPhuIDl",
  timePeriod: "24h",
};
export const headers = {
  "X-RapidAPI-Key": "eb71184572msh8f332283060f7cbp1f341fjsnc4685458b6c2",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};
export const time = ["7d", "30d", "1y", "3m", "3y", "5y"];

export function createStats(cryptos) {
  return [
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
}

export function createGenericStats(cryptos) {
  return [
    {
      title: "Number Of Markets",
      value: cryptos?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Nfts",
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
}
