import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import GlobalStyle from "./GlobalStyle";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet></Outlet>
      <Footer />
    </>
  );
};

export default Layout;
