import styled from "@emotion/styled";
import { colorSystem, size } from "./color";

export const GlampingKingStyle = styled.div`
  overflow-y: hidden;
  .inner {
    flex-direction: column;
    margin-top: 20px;
    max-width: 1250px;

    .store-inner,
    .signup-inner,
    .exit-inner {
      width: 100%;
      margin-top: 50px;
      margin-bottom: 100px;
      padding: 0 50px;
      display: inline-flex;
      flex-wrap: wrap;
      flex-direction: row;
      align-items: flex-start;
      gap: 30px;
    }

    .store-inner {
      display: grid;
      grid-template-columns: 1fr 2fr 3fr;
      flex-direction: column;
      @media all and (max-width: 1910px) {
        display: inline-flex;
        flex-wrap: wrap;
        flex-direction: row;
      }
    }

    .banner-inner {
      width: 100%;
      margin-top: 50px;
      margin-bottom: 100px;
      padding: 0 50px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 30px;
      .banner-notice {
        margin-top: 10px;
        h2 {
          font-size: 15px;
          margin-bottom: 10px;
        }
      }
    }

    .banner-add {
      cursor: pointer;
      font-weight: 500;
      font-size: 17px;
      padding: 8px 16px;
      border-radius: 30px;
      width: 150px;
      height: 50px;
      transition:
        border 0.3s,
        background-color 0.3s,
        color 0.3s;
      border: 1px solid;
      background-color: ${colorSystem.admin};
      color: ${colorSystem.white};
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        border: 1px solid ${colorSystem.admin3};
        background-color: ${colorSystem.admin3};
        color: ${colorSystem.admin};
      }
    }
    .banner-list {
      width: 600px;
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .store-inner h5,
    .signup-inner h5,
    .exit-inner h5 {
      width: 400px;
      margin-left: 10px;
      font-size: 17px;
    }
  }

  @media all and (max-width: 1910px) {
    /* margin: 65px 0 200px 0; */
    width: 100%;
    display: inline-flex;
    flex-wrap: wrap;
    flex-direction: row;
    /* gap: 60px; */
    /* padding: 0 60px; */
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
  .admin-home {
    margin-top: 15px;
    display: flex;
    justify-content: center;
  }
`;
