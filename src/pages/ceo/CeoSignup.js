import styled from "@emotion/styled";
import React from "react";
import { colorSystem, size } from "../../styles/color";

const CeoSignUpStyle = styled.div`
  position: relative;

  .container {
    display: flex;
    width: 760px;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    height: 1000px;
    /* 임시로 지정 */
    background: pink;
  }
`;
const CeoSignup = () => {
  return (
    <CeoSignUpStyle>
      <div className="container">
        <h2>회원가입</h2>
        <div className="wrap">
          <form></form>
        </div>
      </div>
    </CeoSignUpStyle>
  );
};

export default CeoSignup;
