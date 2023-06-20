import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { TbCurrencyEthereum } from "react-icons/tb";

const Navbar = () => {
  const [mobile, setMobile] = useState(false);
  return (
    <>
      <nav className="navbar">
        <div style={{ display: "flex" }}>
          <TbCurrencyEthereum className="curr-logo" />
          <NavLink
            to="/"
            end
            style={{ textDecoration: "none", color: "black" }}
          >
            <h3 className="logo">CryptØn</h3>
          </NavLink>
        </div>
        <ul
          className={mobile ? "nav-links-mobile" : "nav-links"}
          onClick={() => setMobile(false)}
        >
          <li>
            <Link to="/" className="home">
              Home
            </Link>
          </li>
          <li>
            <Link to="/cryptocurrencies" className="cryptocurrencies">
              CryptoCurrencies
            </Link>
          </li>
          <li>
            <Link to="/exchanges" className="exchanges">
              Exchanges
            </Link>
          </li>
          <li>
            <Link to="/news" className="news">
              News
            </Link>
          </li>
        </ul>
        <button className="mobile-menu-icon" onClick={() => setMobile(!mobile)}>
          {mobile ? <ImCross /> : <FaBars />}
        </button>
      </nav>
    </>
  );
};
export default Navbar;
