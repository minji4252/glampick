import styled from "@emotion/styled";
import React from "react";
import NotfoundImg from "../images/notfound-img.gif";
import glampickLogoMain from "../images/glampick_logo_white.png";
import { Link } from "react-router-dom";

const NotfoundWrap = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  display: block;
  width: 1920px;
  height: 950px;
  background: url(${NotfoundImg}) no-repeat center;
`;

const NavMain = styled.div`
  width: 87px;
  height: 87px;
  left: 50px;
  top: 20px;
  background: url(${glampickLogoMain}) no-repeat center;
  background-size: cover;
  position: absolute;
`;
const NotfoundPage = () => {
  return (
    <NotfoundWrap>
      <NavMain>
        <Link to="/" />
      </NavMain>
    </NotfoundWrap>
  );
};

export default NotfoundPage;
