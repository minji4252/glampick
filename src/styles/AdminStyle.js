import styled from "@emotion/styled";
import { colorSystem, size } from "./color";

export const GlampingKingStyle = styled.div`
  .inner {
    flex-direction: column;
    margin-top: 20px;
    .store-inner,
    .banner-inner {
      width: 100%;
      margin-top: 50px;
      margin-bottom: 100px;
      padding: 0 50px;
      display: flex;
      justify-content: flex-start;
    }

    .banner-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }

  @media all and (max-width: 1910px) {
    .inner {
      margin-top: 50px;
      margin-left: 82px;
    }
  }

  h3 {
    width: 100%;
    margin-top: 50px;
    margin-left: 120px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
  }
`;
export const AdminHeader = styled.div`
  width: 100%;
  color: ${colorSystem.admin};
  margin-top: 60px;
  margin-bottom: 50px;
  font-size: 35px;
  font-weight: 500;
  text-align: center;
`;

export const AdminLogin = styled.div`
  width: 550px;
  .login-form {
    width: 80%;
    margin: 0 auto;
  }

  .login-form label {
    display: block;
    font-size: 1.2rem;
    margin-top: 15px;
    margin-bottom: 10px;
    ${size.mid} {
      font-size: 1.2rem;
    }
  }

  .login-form input {
    width: 100%;
    height: 50px;
    font-size: 1rem;
    border-radius: 10px;

    background-color: ${colorSystem.g100};
    border: none;
    padding: 10px;
    ${size.mid} {
      height: 45px;
    }
  }

  .login-form input[type="email"] {
    margin-bottom: 20px;
    border-radius: 10px;
  }

  .login-form input::placeholder {
    font-size: 1rem;
    background-color: ${colorSystem.g100};
    font-weight: 300;
    ${size.mid} {
      font-size: 0.9rem;
    }
  }

  button {
    width: 100%;
    height: 50px;
    font-size: 1.2rem;
    margin-top: 30px;
  }
`;
