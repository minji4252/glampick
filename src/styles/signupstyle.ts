import styled from "@emotion/styled";
import { colorSystem, size } from "./color";

interface TabProps {
  active: boolean;
}

export const WrapStyle = styled.div`
  position: relative;

  .container {
    display: flex;
    width: 760px;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .wrap {
    width: 100%;
  }

  h2 {
    width: 80%;
    display: flex;
    padding: 20px;
    justify-content: center;
    color: ${colorSystem.g800};
    font-size: 1.6rem;
    border-bottom: 1.5px solid ${colorSystem.g500};
    /* 반응형 */
    ${size.mid} {
      font-size: 1.4rem;
    }
  }

  /* 회원가입 폼 */
  .signup-form {
    width: 80%;
    margin: 0 auto;
  }

  .form-group label {
    display: block;
    font-size: 1.1rem;
    margin-top: 20px;
    margin-bottom: 7px;
    ${size.mid} {
      font-size: 1rem;
    }
  }

  .input-group {
    display: flex;
    justify-content: space-between;
    // margin-bottom: 10px;
    ${size.mid} {
      width: 100%;
      /* 다른 input과 너비 동일하게 맞춤 */
    }
  }

  .timer {
    color: ${colorSystem.error};
    font-size: 0.9rem;
    ${size.mid} {
      font-size: 0.8rem;
    }
  }

  .time-over {
    color: ${colorSystem.error};
    font-size: 0.9rem;
    ${size.mid} {
      font-size: 0.8rem;
    }
  }

  .error-message {
    display: block;
    color: ${colorSystem.error};
    font-size: 0.9rem;
    ${size.mid} {
      font-size: 0.8rem;
    }
  }

  .form-group input,
  .input-group input {
    width: calc(100% - 150px - 10px);
    /* 너비 조정: 100%에서 버튼 너비와 마진 값을 뺀 값 */
    height: 40px;
    border: none;
    background-color: ${colorSystem.g100};
    padding: 10px;
    margin-bottom: 10px;
    font-size: 0.9rem;
    border-radius: 10px;
    ${size.mid} {
      width: calc(100% - 140px - 10px);
      font-size: 0.8rem;
    }
  }

  // 버튼 없는 input에 마진 주기
  .password-input,
  .confirm-password-input,
  .name-input {
    margin-bottom: 10px;
  }

  /* 폼 버튼 */
  .form-button > button {
    width: 140px;
    height: 40px;
    font-size: 0.95rem;
    ${size.mid} {
      width: 130px;
      font-size: 0.8rem;
    }
  }

  /* 회원가입 버튼 */
  .sign-button > button {
    width: 100%;
    height: 50px;
    margin-top: 20px;
    margin-bottom: 100px;
    font-size: 1.2rem;
    ${size.mid} {
      font-size: 1.1rem;
      margin-bottom: 80px;
    }
  }
`;

export const Tabs = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 20px;
  justify-content: space-between;
  border-bottom: 1px solid #355179;
`;

export const Tab = styled.button<TabProps>`
  flex: 1; // 각 탭을 균등하게 배치
  font-size: 1rem;
  padding: 10px 0;
  border: none;
  background-color: ${({ active }) => (active ? "#fff" : "#f5f5f5")};
  color: ${({ active }) => (active ? "#000" : "#162132")};
  cursor: pointer;
  text-align: center;
  border-top: ${({ active }) =>
    active ? "3px solid #355179" : "none"}; // 선택된 탭 하단에 강조선을 추가
  &:focus {
    outline: none;
  }
  &:not(:last-child) {
    border-right: 1px solid #ccc; // 탭 간에 경계선을 추가
  }
`;

/* 약관동의 */
export const TermsGroupStyle = styled.div`
  .terms-group p {
    font-size: 1.1rem;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 25px;
    ${size.mid} {
      font-size: 1rem;
    }
  }

  .agree-all {
    font-weight: 600;
  }
  .terms-group ul {
  }
  .terms-group li {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  /* 모두 동의 체크박스 */
  .terms-group input {
    width: 18px;
    height: 18px;
    ${size.mid} {
      width: 15px;
      height: 15px;
    }
  }
  .terms-group label {
    font-size: 1rem;
    ${size.mid} {
      font-size: 0.9rem;
    }
  }
  .terms-item {
    display: flex;
    justify-content: space-between;
    ${size.mid} {
      margin-right: 23px;
    }
  }

  /* 필수, 선택 체크박스 */
  .left-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .left-content input {
    width: 18px;
    height: 18px;
    ${size.mid} {
      width: 15px;
      height: 15px;
    }
  }

  .view-terms-btn {
    font-size: 1rem;
    color: ${colorSystem.g700};
    border: none;
    background-color: transparent;
    cursor: pointer;
    ${size.mid} {
      font-size: 0.9rem;
    }
  }
`;
