import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const handleOnEmailChange = (e) => {
    setSignUpEmail(e.target.value);
  };

  const handleOnPasswordChange = (e) => {
    setSignUpPassword(e.target.value);
  };

  useEffect(() => {
    if (
      !signUpEmail.includes("@") ||
      !signUpEmail.includes(".") ||
      signUpPassword.length < 8
    ) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  }, [signUpEmail, signUpPassword]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email: signUpEmail,
        password: signUpPassword,
      };
      const res = await axios.post(
        "http://localhost:8080/users/create",
        newUser
      );
      const signUpData = JSON.parse(res.data);
      localStorage.setItem("token", signUpData.token);
      alert(signUpData.message);
      navigate("/");
      setSignUpEmail("");
      setSignUpPassword("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContainer>
      <h2>Sign Up</h2>

      <SignUpForm
        onSubmit={(e) => {
          handleOnSubmit(e);
        }}
      >
        <SignUpLabel htmlFor="signUp-email">이메일</SignUpLabel>
        <SignUpInput
          type="text"
          id="signUp-email"
          value={signUpEmail}
          onChange={(e) => {
            handleOnEmailChange(e);
          }}
        />
        <SignUpLabel htmlFor="signUp-password">패스워드</SignUpLabel>
        <SignUpInput
          type="password"
          id="signUp-password"
          value={signUpPassword}
          onChange={(e) => {
            handleOnPasswordChange(e);
          }}
        />
        <SignUpButton type="submit" disabled={isInvalid}>
          회원가입
        </SignUpButton>
      </SignUpForm>
      <Link to="/auth/login">이미 회원이신가요?</Link>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div``;

const SignUpForm = styled.form``;

const SignUpInput = styled.input``;

const SignUpLabel = styled.label``;

const SignUpButton = styled.button`
  ${(props) =>
    props.disabled
      ? "opacity: 0.8; cursor:no-drop"
      : "opacity: 1; cursor:pointer"};
`;

export default SignUp;
