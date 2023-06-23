import React from "react";
import style from "./Coin.module.css";
const Coin = ({ iconUrl, symbol, name, coinrankingUrl }) => {
  return (
    <div className={style.mainEl}>
      <img src={iconUrl} alt={symbol} />
      <h3>{name}</h3>
      <a href={coinrankingUrl} className={style.linkEl} target="_blank">
        Read more
      </a>
    </div>
  );
};

export default Coin;
