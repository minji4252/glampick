import styled from "@emotion/styled";
import { colorSystem, size } from "../color";

export const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }
  h3 {
    width: 100%;
    margin: 50px 0 65px 120px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
  }

  form {
    max-width: 800px;
    width: 100%;
    margin-right: 30px;

    .submit-btn {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 60px;
      margin-bottom: 30vh;
      button {
        width: 30%;
        height: 50px;
        font-size: 1.1rem;
      }
    }
  }

  @media all and (max-width: 1910px) {
    display: flex;
    .inner {
      margin-left: 82px;
    }
  }

  ${size.large} {
    .inner {
      margin-left: 100px;
    }
  }

  ${size.mid} {
    flex-direction: column;
    h3 {
      margin-top: 250px;
    }
  }
`;

export const WaitingStyle = styled.div`
  margin: 20vh 0 50vh 0;
  padding: 30px;
  border-radius: 20px;
  border: 2px solid ${colorSystem.g200};
  color: ${colorSystem.g800};
  width: 60%;
  height: 100%;

  h1 {
    font-size: 1.8rem;
    font-weight: 600;
  }

  .under-line {
    width: 100%;
    height: 3px;
    background-color: ${colorSystem.ceo};
    margin-top: 15px;
    margin-bottom: 40px;
  }

  .waiting-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    font-size: 1.2rem;
    line-height: 2rem;
  }

  h4 {
    font-size: 1rem;
  }

  span {
    color: ${colorSystem.ceo700};
    font-weight: 600;
  }
`;

export const CeoBoxStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 20px;
  padding-bottom: 30px;
  border-radius: 20px;
  border: 1px solid ${colorSystem.g400};
  margin-bottom: 30px;

  > div {
    display: flex;
    gap: 15px;
  }

  label {
    font-weight: 600;
    color: ${colorSystem.g800};
    margin-bottom: 10px;
  }

  input,
  textarea {
    max-width: 640px;
    width: 100%;
    border: 0px;
    background-color: ${colorSystem.g100};
    height: 40px;
    border-radius: 10px;
    padding: 15px;
  }

  select {
    max-width: 120px;
    width: 100%;
    height: 40px;
  }

  textarea {
    height: 140px;
    resize: none;
  }

  h4 {
    color: ${colorSystem.placeholder};
  }

  span {
    position: absolute;
    bottom: 7px;
    color: ${colorSystem.error};
    font-size: 0.8rem;
    margin-left: 10px;
    font-weight: 600;
  }

  select {
    border: 1px solid ${colorSystem.g300};
    font-size: 0.9rem;
    margin-left: 5px;
    padding-left: 5px;
  }

  .cost-group {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .cost-input {
    max-width: 100px;
  }

  .glamp-img-label {
    margin-bottom: 0;
  }

  .glamp-address-div {
    input {
      cursor: pointer;
      caret-color: transparent;
    }

    button {
      min-width: 85px;
    }
  }
`;
