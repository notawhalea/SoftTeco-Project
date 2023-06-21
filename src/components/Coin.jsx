import React from "react";
import style from "./Coin.module.css";
const Coin = ({ iconUrl, symbol, name, coinrankingUrl }) => {
  return (
    <div className={style.mainEl}>
      <img src={iconUrl} alt={symbol} />
      <h3>{name}</h3>
      <a
        href={coinrankingUrl}
        style={{
          color: "gray",
          fontFamily: "cursive",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Read more
      </a>
    </div>
  );
};

export default Coin;
