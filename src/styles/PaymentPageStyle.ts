import styled from "@emotion/styled";
import { colorSystem, size } from "../styles/color";

export const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }

  h2 {
    font-weight: 700;
    color: ${colorSystem.g900};
    font-size: 1.15rem;
    margin-bottom: 25px;
  }

  input[type="checkbox"] {
    display: none;
  }

  .check-label {
    display: flex;
    align-items: center;
  }

  .checkbox-icon::before {
    content: "";
    display: block;
    margin-right: 5px;
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: transparent;
    border: 1px solid #9da3a5;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    border-radius: 50px;
    margin-top: 2px;
  }

  .check-label input:checked + .checkbox-icon::before {
    transition: all 0.15s ease;
    background: url(https://intranet.adef.co.kr/asset/images/ic_check.png)
      ${colorSystem.primary} no-repeat center;
    border: none;
  }
`;

export const InfoStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 45px;

  .payment-title {
    margin-top: 45px;
    margin-left: 15px;
    font-size: 1.4rem;
    display: flex;
    gap: 15px;
    color: ${colorSystem.g900};

    h1 {
      font-weight: 700;
    }

    button {
      background-color: transparent;
      border: 0px;
      cursor: pointer;
    }

    svg {
      width: 30px;
      height: 23px;
    }
  }

  .payment-room-info {
    h2 {
      margin-left: 10px;
    }
  }
`;

export const PaymentFormStyle = styled.form`
  width: 100%;
  margin-top: 50px;
  margin-left: 25px;
`;

export const ReservationInfo = styled.div``;

export const InputGroup = styled.div`
  display: flex;
  gap: 70px;
  max-width: 770px;
  width: 100%;

  ${size.mid} {
    flex-direction: column;
    gap: 20px;
  }
`;

export const ReservationInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 350px;
  }

  label {
    font-weight: 600;
    color: ${colorSystem.g700};
  }

  Input {
    max-width: 350px;
    height: 50px;
    border: 0px;
    background-color: ${colorSystem.g150};
    border-radius: 8px;
    padding: 10px;
    padding-left: 20px;
  }

  Input::placeholder {
    color: ${colorSystem.g300};
  }

  p {
    color: ${colorSystem.g500};
    font-size: 0.8rem;
    margin-top: 3px;
    margin-left: 5px;
  }

  .error-message {
    display: block;
    color: ${colorSystem.error};
    font-size: 0.8rem;
  }

  .cellphone {
    cursor: default;
    caret-color: transparent !important;
  }
`;

export const UnderLine = styled.div`
  border-bottom: 1px solid ${colorSystem.g150};
  margin: 30px 0;
`;

export const PaymentMethod = styled.div`
  .next-check {
    display: flex;
    gap: 10px;
    margin-top: 20px;

    p {
      font-weight: 500;
    }
  }
`;

export const PaymentTypeList = styled.div`
  display: flex;
  gap: 5px;

  .payment-type {
    max-width: 150px;
    width: 100%;
    height: 50px;
    cursor: pointer;
    border: 1.8px solid ${colorSystem.g200};
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .active {
    border-color: #b7d5f6;
    background-color: #d2e3fb;
  }

  .kakao > img {
    width: 95px;
    height: 40px;
  }

  .toss > img {
    width: 90px;
    height: 17px;
  }
`;

export const PayButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  .agree-box {
    max-width: 290px;
    height: 40px;
    width: 100%;
    display: flex;
    gap: 10px;
    background-color: ${colorSystem.g150};
    padding: 10px;
    border-radius: 8px;
    position: relative;

    span {
      font-weight: 700;
      cursor: pointer;
    }

    p {
      position: absolute;
      right: 0;
      margin-right: 15px;
      font-size: 0.8rem;
      color: ${colorSystem.g600};

      &:hover {
        color: ${colorSystem.black};
        cursor: pointer;
      }
    }
  }

  > button {
    margin-top: 20px;
    margin-bottom: 100px;
    max-width: 290px;
    width: 100%;
    border-radius: 10px;
    height: 50px;
    font-size: 1rem;
  }
`;
