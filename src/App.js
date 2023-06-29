import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cryptocurrencies from "./components/cryptocurrencies/Cryptocurrencies";
import Nfts from "./components/Nfts";
import News from "./components/news/News";
import NotFound from "./components/NotFound";
import MainLayout from "./layouts/MainLayout";
import Home from "./components/home/Home";
import CryptoDetails from "./components/cryptodetails/CryptoDetails";
import RHForm from "./components/RHForm";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/nfts" element={<Nfts />} />
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route path="/news" element={<News />} />
            <Route path="/form" element={<RHForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
