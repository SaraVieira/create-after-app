import React from "react";
import logo from "../assets/react.svg";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Logo = styled.img`
  animation: ${spin} infinite 20s linear;
  height: 80px;
`;

const Anchor = styled(Link)`
  color: white;
  padding-bottom: 20px;
  margin-right: 20px;
`;

const Header = styled.header`
  background-color: #222;
  min-height: 150px;
  padding: 20px;
  color: white;
`;

export default () => (
  <Header>
    <Logo src={logo} alt="logo" />
    <h2>Welcome to After.js</h2>
    <Anchor to="/">Home</Anchor>
    <Anchor to="/about">About</Anchor>
  </Header>
);
