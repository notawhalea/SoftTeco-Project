import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cryptocurrencies from "./components/Cryptocurrencies";
import Exchanges from "./components/Exchanges";
import News from "./components/News";
import NotFound from "./components/NotFound";
import MainLayout from "./layouts/MainLayout";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/news" element={<News />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
