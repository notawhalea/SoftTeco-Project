import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { TbCurrencyEthereum } from "react-icons/tb";

const Navbar = () => {
  const [mobile, setMobile] = useState(false);
  return (
    <>
      <nav className={styles.navbar}>
        <div style={{ display: "flex" }}>
          <TbCurrencyEthereum className={styles.currLogo} />
          <NavLink
            to="/"
            end
            style={{ textDecoration: "none", color: "black" }}
          >
            <h3 className={styles.logo}>CryptØn</h3>
          </NavLink>
        </div>
        <ul
          className={mobile ? styles.navLinksMobile : styles.navLinks}
          onClick={() => setMobile(false)}
        >
          <li>
            <Link to="/" style={{ color: "black" }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/cryptocurrencies" style={{ color: "black" }}>
              Cryptocurrencies
            </Link>
          </li>
          <li>
            <Link to="/nfts" style={{ color: "black" }}>
              Nfts
            </Link>
          </li>
          <li>
            <Link to="/news" style={{ color: "black" }}>
              News
            </Link>
          </li>
        </ul>
        <button
          className={styles.mobileMenuIcon}
          onClick={() => setMobile(!mobile)}
        >
          {mobile ? <ImCross /> : <FaBars />}
        </button>
      </nav>
    </>
  );
};
export default Navbar;
