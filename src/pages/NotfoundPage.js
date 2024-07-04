import styled from "@emotion/styled";
import React from "react";
import NotfoundImg from "../images/notfound-img.gif";
// import NotfoundImg from "../images/main-big.png";

const NotfoundWrap = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  display: block;
  width: 1920px;
  height: 950px;
  background: url(${NotfoundImg}) no-repeat center;
`;
const NotfoundPage = () => {
  return <NotfoundWrap></NotfoundWrap>;
};

export default NotfoundPage;
