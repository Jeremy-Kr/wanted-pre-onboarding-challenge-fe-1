import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const handleOnEmailChange = (e) => {
    setLoginEmail(e.target.value);
  };

  const handleOnPasswordChange = (e) => {
    setLoginPassword(e.target.value);
  };

  useEffect(() => {
    if (
      !loginEmail.includes("@") ||
      !loginEmail.includes(".") ||
      loginPassword.length < 8
    ) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  }, [loginEmail, loginPassword]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email: loginEmail, password: loginPassword };
      const res = await axios.post(
        "http://localhost:8080/users/login",
        loginUser
      );
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      setLoginEmail("");
      setLoginPassword("");
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <LoginContainer>
      <h2>Login</h2>
      <LoginForm
        onSubmit={(e) => {
          handleOnSubmit(e);
        }}
      >
        <LoginLabel htmlFor="login-email">이메일</LoginLabel>
        <LoginInput
          type="text"
          id="login-email"
          value={loginEmail}
          onChange={(e) => {
            handleOnEmailChange(e);
          }}
        />
        <LoginLabel htmlFor="login-password">패스워드</LoginLabel>
        <LoginInput
          type="password"
          id="login-password"
          value={loginPassword}
          onChange={(e) => {
            handleOnPasswordChange(e);
          }}
        />
        <LoginButton type="submit" disabled={isInvalid}>
          로그인
        </LoginButton>
      </LoginForm>
      <Link to="/auth/sign_up">아직 회원이 아니신가요?</Link>
    </LoginContainer>
  );
};

const LoginContainer = styled.div``;

const LoginForm = styled.form``;

const LoginInput = styled.input``;

const LoginLabel = styled.label``;

const LoginButton = styled.button`
  ${(props) =>
    props.disabled
      ? "opacity: 0.8; cursor:no-drop"
      : "opacity: 1; cursor:pointer"};
`;

export default Login;
