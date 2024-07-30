import styled from "@emotion/styled";
import { colorSystem, size } from "../../styles/color";
import CeoCategories from "../../components/ceo/CeoCategories";
import { CeoButton } from "../../components/common/Button";

const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }
  h3 {
    width: 100%;
    margin-top: 50px;
    margin-left: 120px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
    margin-bottom: 65px;
  }

  @media all and (max-width: 1910px) {
    display: flex;
    .inner {
      margin-left: 82px;
    }
  }

  /* ${size.mid} {
    flex-direction: column;
    h3 {
      margin-top: 250px;
    }
  } */
`;

const CeoInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 60%;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid ${colorSystem.g400};
  margin-bottom: 60px;

  /* 수정하기 버튼 */
  .modify-btn {
    width: 100%;
    > button {
      width: 100%;
      height: 50px;
      margin-top: 30px;
      margin-bottom: 10px;
      font-size: 1.2rem;
      ${size.mid} {
      }
    }
  }

  form {
    width: 80%;
    margin: 0 auto;
  }

  .form-group {
    width: 100%;

    label {
      display: block;
      font-weight: 600;
      color: ${colorSystem.g800};
      margin-top: 20px;
      margin-bottom: 10px;
    }

    input {
      width: 100%;
      border: 0px;
      background-color: ${colorSystem.g100};
      height: 40px;
      border-radius: 10px;
      padding: 15px;
    }

    .input-group {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      input {
        height: 40px;
        border: none;
        background-color: ${colorSystem.g100};
        padding: 10px;
        margin-bottom: 10px;
        font-size: 0.9rem;
        border-radius: 10px;
      }
      .auth-code-btn > button {
        height: 40px;
      }
    }
  }
`;

const CeoInfo = () => {
  return (
    <WrapStyle>
      <CeoCategories />
      <div className="inner">
        <h3>CeoInfo</h3>
        <CeoInfoBox>
          <from>
            <div className="form-group">
              <label>이메일</label>
              <input type="email" />
            </div>
            <div className="form-group">
              <label>이름</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>비밀번호</label>
              <input type="password" />
            </div>
            <div className="form-group">
              <label>비밀번호 확인</label>
              <input type="password" />
            </div>
            <div className="form-group">
              <label>휴대폰</label>
              <div className="input-group">
                <input type="text" />
                <div className="auth-code-btn">
                  <CeoButton label="인증코드 발송" />
                </div>
              </div>
            </div>
            <div className="modify-btn">
              <CeoButton label="수정하기" />
            </div>
          </from>
        </CeoInfoBox>
      </div>
    </WrapStyle>
  );
};

export default CeoInfo;
