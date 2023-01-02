import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import Layout from "../components/common/Layout";
import Todo from "../components/todo/Todo";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Todo />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/sign_up" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
