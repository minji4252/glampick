import styled from "@emotion/styled";
import React from "react";

const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }

  max-width: 1040px;
  height: 240px;
  background-color: pink;
`;
const PaymentCard = () => {
  return (
    <WrapStyle>
      <div className="inner">PaymentCard</div>
    </WrapStyle>
  );
};

export default PaymentCard;
