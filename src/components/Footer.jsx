import React from "react";
import { TbCurrencyEthereum } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div style={{ display: "flex" }}>
        <TbCurrencyEthereum className={styles.logo} />
        <NavLink to="/" end style={{ textDecoration: "none", color: "white" }}>
          <h3 className="logo">CryptØn</h3>
        </NavLink>
      </div>
      <div>All rights reserved</div>
      <div>
        Created by <a href="https://github.com/notawhalea">Nikita</a> &&
        <a href="https://github.com/AndrewZanko"> Andrey</a>
      </div>
    </div>
  );
};

export default Footer;
