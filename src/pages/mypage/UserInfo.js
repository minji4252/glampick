import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { PiPencilSimpleLine } from "react-icons/pi";
import { MainButton } from "../../components/common/Button";
import DeleteModal from "../../components/common/DeleteModal";
import PasswordCheckModal from "../../components/common/PasswordCheckModal";
import Categories from "../../components/mypage/Categories";
import { colorSystem, size } from "../../styles/color";

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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 65px;
    margin-bottom: 80px;
    /* 임시로 지정  다시 확인해야함 */
    ${size.mid} {
      width: 100%;
    }
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
    width: 80%;
    margin-bottom: 50px;
  }

  /* 유저정보 수정폼 */
  .userInfo-form {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${size.mid} {
      width: 80%;
    }
  }

  .form-group label {
    display: block;
    font-size: 1.1rem;
    margin-bottom: 7px;
  }

  .form-group {
    width: 100%;
  }

  .form-group input,
  .input-group input {
    width: 100%;
    height: 40px;
    border: none;
    background-color: ${colorSystem.g100};
    padding: 10px;
    font-size: 0.95rem;
    margin-bottom: 30px;
  }

  /* 각 항목 변경하기 버튼 */
  .form-button > button {
    width: 140px;
    height: 40px;
    font-size: 0.9rem;
  }

  /* 수정하기 버튼 */
  .modify-btn {
    width: 100%;
    > button {
      width: 100%;
      height: 50px;
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 1.2rem;
      ${size.mid} {
      }
    }
  }

  /* 회원탈퇴 */
  .delete-user {
    width: 100%;
    position: relative;
    margin: 0 auto;
    display: flex;
    background-color: skyblue;
    ${size.mid} {
      width: 80%;
    }
  }

  .delete-btn {
    position: absolute;
    right: 0;
    font-size: 1.1rem;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 수정하기 아이콘
  const handleShowButtons = () => {
    setShowButtons(true);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // 회원 탈퇴
  const handleConfirmDelete = () => {
    // 회원 탈퇴 로직 추가

    console.log("회원 탈퇴 처리");
    setIsDeleteModalOpen(false); // 탈퇴 처리 후 모달 닫기
  };

  return (
    <WrapStyle>
      <Categories />
      <div className="inner">
        <h3>내 정보 관리</h3>
        <div className="container">
          {/* 프로필 사진 등록 */}
          <div className="userprofile">
            {/* 파일 업로드 버튼 */}
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
              <button
                className="delete-btn"
                onClick={() => {
                  handleOpenDeleteModal();
                }}
              >
                회원탈퇴
              </button>
            </div>
          </div>
        </div>
      </div>
      <PasswordCheckModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          handleCloseDeleteModal();
        }}
        onConfirm={() => {
          handleConfirmDelete();
        }}
      />
    </WrapStyle>
  );
};

export default UserInfo;
