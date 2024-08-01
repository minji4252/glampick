import styled from "@emotion/styled";
import { colorSystem, size } from "../styles/color";

export const WrapStyle = styled.div`
  min-width: 390px;
  max-width: 1040px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${colorSystem.primary};

  display: flex;

  h3 {
    font-size: 1.25em;
    font-weight: 800;
    color: ${colorSystem.g900};
  }

  .pay-left {
    display: flex;
    max-width: 755px;
    width: 100%;

    ${size.mid} {
      flex-direction: column;
    }
  }

  ${size.mid95} {
    flex-direction: column;
  }
`;

export const PayLeft = styled.div`
  padding: 25px;
  max-width: 400px;
  width: 100%;
  display: flex;

  ${size.mid} {
    max-width: 750px;
  }
`;

export const PayRoomImg = styled.div`
  height: 100%;
  width: 100%;
  .pay-img {
    border-radius: 10px;
    width: 100%;
    height: 190px;
  }
`;

export const PayMiddle = styled.div`
  padding: 25px 25px 25px 5px;

  ${size.mid} {
    padding: 0 0 25px 25px;
  }
`;

export const PayRoomInfo = styled.div`
  h3 {
    margin-top: 20px;

    ${size.mid} {
      margin-top: 0px;
    }
  }
`;

export const PayRoomContent = styled.div`
  margin-top: 65px;

  .pay-room-item {
    display: flex;
    gap: 10px;
    line-height: 1.6rem;

    span {
      color: ${colorSystem.g300};
      font-weight: 500;
      width: 50px;
    }

    h4 {
      font-weight: 500;
      letter-spacing: 0.3px;
    }

    p {
      font-weight: 500;
    }
  }

  ${size.mid} {
    margin-top: 25px;
  }
`;

export const PayRight = styled.div`
  width: 100%;
  max-width: 285px;
  display: flex;

  .pay-right {
    padding: 40px 40px 40px 0;
    width: 100%;

    ${size.mid95} {
      padding: 25px 40px 40px 0;
    }
  }

  .price-item {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    ${size.mid95} {
      justify-content: flex-start;
      gap: 20px;
    }
  }

  ${size.mid95} {
    flex-direction: column;
    max-width: 100%;
    margin-left: 25px;
  }
`;

export const VerticalLine = styled.div`
  height: 92%;
  width: 1px;
  border: 1px dashed ${colorSystem.g300};
  margin: 10px 40px 10px 0;

  ${size.mid95} {
    width: 93%;
    height: 1px;
    margin: 0;
  }
`;

export const PriceInfo = styled.div`
  p {
    color: ${colorSystem.g400};
  }

  span {
    font-weight: 600;
  }
`;

export const UnderLine = styled.div`
  border-bottom: 1px solid ${colorSystem.g200};
  margin-top: 45px;

  ${size.mid95} {
    max-width: 200px;
    margin-top: 20px;
  }
`;

export const PriceTotal = styled.div`
  p {
    font-weight: 600;
  }

  span {
    font-size: 1.3rem;
    font-weight: 800;
    color: ${colorSystem.error};
  }
`;
