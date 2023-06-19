import React from "react";
import { Button, Avatar, Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectedOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
  RedEnvelopeOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar size="large" icon={<RedEnvelopeOutlined />} />
        <Typography.Title level={2} className="logo">
          <Link to="/">Crypton</Link>
        </Typography.Title>
      </div>
    </div>
  );
};

export default Navbar;
