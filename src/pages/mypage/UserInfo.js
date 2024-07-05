import styled from "@emotion/styled";
import { FaUser } from "react-icons/fa6";
import { PiPencilSimpleLine } from "react-icons/pi";
import { DelectButton, MainButton } from "../../components/common/Button";
import Categories from "../../components/mypage/Categories";
import { colorSystem, size } from "../../styles/color";
import { useState } from "react";

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
    width: 550px;
    height: 1000px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
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
    bottom: -10px;
    right: -8px;
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
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-group label {
    display: block;
    font-size: 18px;
    margin-bottom: 7px;
  }

  .input-group {
  }

  .form-group input,
  .input-group input {
    width: 550px;
    /* 너비 조정: 100%에서 버튼 너비와 마진 값을 뺀 값 */
    height: 40px;
    border: none;
    background-color: ${colorSystem.g100};
    padding: 10px;
    font-size: 15px;
    margin-bottom: 30px;
  }

  /* 각 항목 변경하기 버튼 */
  .form-button > button {
    width: 140px;
    height: 40px;
    font-size: 15px;
  }

  /* 변경하기 버튼 */
  .modify-btn > button {
    width: 550px;
    height: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 20px;
  }

  /* 회원탈퇴 */
  .delete-user {
    /* 버튼 위치 오른쪽 하단에 배치 */
    position: absolute;
    bottom: -15px;
    right: 10px;
  }
  .delete-btn {
    font-size: 16px;
    color: ${colorSystem.g700};
    background: none;
    border: none;
    cursor: pointer;
  }

  @media all and (max-width: 1910px) {
    display: flex;
    .inner {
      margin-left: 82px;
    }
  }

  ${size.mid} {
    flex-direction: column;
    h3 {
      margin-top: 250px;
    }
  }
`;

const UserInfo = () => {
  // 변경하기 버튼 상태 관리
  const [showButtons, setShowButtons] = useState(false);

  const handleShowButtons = () => {
    setShowButtons(true);
  };

  return (
    <WrapStyle>
      <Categories />
      <div className="inner">
        <h3>내 정보 관리</h3>
        <div className="container">
          <div className="userprofile">
            <FaUser className="userprofile-img" />
            {showButtons && (
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
            )}
          </div>
          <div className="wrap">
            <form className="userInfo-form">
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input type="email" id="email" disabled />
              </div>
              <div className="form-group">
                <label htmlFor="name">이름</label>
                <input type="text" id="name" className="name-input" disabled />
              </div>
              <div className="form-group">
                <label htmlFor="nickname">닉네임</label>

                <input
                  type="text"
                  id="nickname"
                  placeholder="닉네임을 입력해주세요"
                />
                {/* <div className="form-button">
                    {showButtons && <MainButton label="변경하기" />}
                  </div> */}
              </div>
              <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  className="password-input"
                  placeholder="비밀번호를 입력해주세요"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">비밀번호 확인</label>
                <input
                  type="password"
                  id="confirm-password"
                  className="confirm-password-input"
                  placeholder="비밀번호를 한번 더 입력해주세요"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cellphone">휴대폰</label>
                <input
                  type="text"
                  id="cellphone"
                  placeholder="휴대폰번호를 정확히 입력해주세요"
                />
                {/* <div className="form-button">
                    {showButtons && <MainButton label="변경하기" />}
                  </div> */}
              </div>
              {/* 휴대폰에 변경하기 버튼을 클릭했을 때 나타나게 해야 함 */}
              {/* <div className="form-group">
                <label htmlFor="auth-number">인증번호</label>
                <input
                  type="text"
                  id="auth-number"
                  required
                  placeholder="인증번호를 입력해주세요"
                />
              </div> */}
              <div className="modify-btn">
                <MainButton
                  label="수정하기"
                  onClick={() => {
                    handleShowButtons();
                  }}
                />
              </div>
            </form>
            <div className="delete-user">
              <button className="delete-btn">회원탈퇴</button>
            </div>
          </div>
        </div>
      </div>
    </WrapStyle>
  );
};

export default UserInfo;
