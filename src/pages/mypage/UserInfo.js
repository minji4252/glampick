import styled from "@emotion/styled";
import Categories from "../../components/mypage/Categories";
import { colorSystem } from "../../styles/color";

const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }

  h3 {
    width: 100%;
    margin-top: 160px;
    margin-left: 120px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
  }

  .container {
    display: flex;
    width: 100%;
    height: 1000px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: skyblue;
  }

  .userprofile-img {
    width: 170px;
    height: 170px;
    margin-top: 100px;
    margin-bottom: 50px;
    background-color: aliceblue;
  }
  .wrap {
    width: 100%;
    margin: 0 auto;
  }

  /* 유저정보 수정폼 */
  .userInfo-form {
    width: 60%;
    margin: 0 auto;
  }

  .form-group label {
    display: block;
    font-size: 20px;
    margin-bottom: 7px;
  }

  .input-group {
    display: flex;
    justify-content: space-between;
  }

  .form-group input,
  .input-group input {
    width: calc(100% - 150px - 10px);
    /* 너비 조정: 100%에서 버튼 너비와 마진 값을 뺀 값 */
    height: 40px;
    border: none;
    background-color: ${colorSystem.g100};
    padding: 10px;
    font-size: 16px;
    margin-bottom: 30px;
  }

  .form-group button {
    display: inline-block;
    width: 140px;
    height: 40px;
    padding: 10px;
    background-color: ${colorSystem.p500};
    color: white;
    font-size: 18px;
    border-radius: 20px;
    /* 테두리 수정해야함 */
    border: none;
    cursor: pointer;
  }

  /* 회원가입 버튼 */
  .withdraw-btn {
    width: 100%;
    height: 50px;
    padding: 10px;
    background-color: ${colorSystem.p500};
    color: white;
    font-size: 23px;
    border-radius: 20px;
    /* 테두리 수정해야함 */
    border: none;
    cursor: pointer;
    margin-top: 100px;
    /* 임시지정 */
    margin-bottom: 50px;
  }
`;

const UserInfo = () => {
  return (
    <WrapStyle>
      <Categories />
      <div className="inner">
        <h3>내 정보 관리</h3>

        <div className="container">
          <div className="userprofile-img">프로필사진</div>

          <div className="wrap">
            <form className="userInfo-form">
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="glampick@good.kr"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  id="name"
                  className="name-input"
                  required
                  placeholder="이름을 입력해주세요"
                />
              </div>
              <div className="form-group">
                <label htmlFor="nickname">닉네임</label>
                <div className="input-group">
                  <input
                    type="text"
                    id="nickname"
                    required
                    placeholder="닉네임을 입력해주세요"
                  />
                  <button>변경하기</button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  className="password-input"
                  required
                  placeholder="비밀번호를 입력해주세요"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cellphone">휴대폰</label>
                <div className="input-group">
                  <input
                    type="text"
                    id="cellphone"
                    required
                    placeholder="휴대폰번호를 정확히 입력해주세요"
                  />
                  <button>인증번호 발송</button>
                </div>
              </div>
              <input type="submit" value="회원탈퇴" className="withdraw-btn" />
            </form>
          </div>
        </div>
      </div>
    </WrapStyle>
  );
};

export default UserInfo;
