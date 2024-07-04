import styled from "@emotion/styled";
import Categories from "../../components/mypage/Categories";
import { colorSystem } from "../../styles/color";
import { FaUser } from "react-icons/fa6";
import { PiPencilSimpleLine } from "react-icons/pi";

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
    margin-top: 65px;
    margin-bottom: 80px;
    /* 임시로 지정  다시 확인해야함 */
  }

  /* 프로필 기본 사진 */
  .userprofile {
    position: relative;
    width: 170px;
    height: 170px;
    margin-bottom: 50px;
    border-radius: 50%;
    /* 자식 요소가 부모 요소를 벗어나지 않도록 설정 */
    background-color: aliceblue;
  }

  .userprofile-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    color: ${colorSystem.p500};
  }

  /* 프로필 사진 수정 */
  .profile-edit {
    position: absolute;
    bottom: -10px; /* 원하는 위치로 조정 */
    right: -8px; /* 원하는 위치로 조정 */
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .profile-label {
    cursor: pointer;
  }

  .profile-input {
    display: none;
  }

  /* 프로필 수정 아이콘 */
  .pencil-icon {
    color: ${colorSystem.p500};
    width: 35px;
    height: 35px;
  }
  .wrap {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 50px;
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

  /* 회원탈퇴 버튼 */
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
  }
`;

const UserInfo = () => {
  return (
    <WrapStyle>
      <Categories />
      <div className="inner">
        <h3>내 정보 관리</h3>
        <div className="container">
          <div className="userprofile">
            <FaUser className="userprofile-img" />
            <div className="profile-edit">
              <label htmlFor="profileImage" className="profile-label">
                <PiPencilSimpleLine className="pencil-icon" />
              </label>
              <input
                type="file"
                id="profileImage"
                className="profile-input"
                accept="image/*"
              />
            </div>
          </div>
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
                <label htmlFor="confirm-password">비밀번호 확인</label>
                <input
                  type="password"
                  id="confirm-password"
                  className="confirm-password-input"
                  required
                  placeholder="비밀번호를 한번 더 입력해주세요"
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
              <div className="form-group">
                <label htmlFor="auth-number">인증번호</label>
                <div className="input-group">
                  <input
                    type="text"
                    id="auth-number"
                    required
                    placeholder="인증번호를 입력해주세요"
                  />
                  <button>확인</button>
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
