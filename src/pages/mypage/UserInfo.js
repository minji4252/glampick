import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { PiPencilSimpleLine } from "react-icons/pi";
import { MainButton } from "../../components/common/Button";
import DeleteModal from "../../components/common/DeleteModal";
import PasswordCheckModal from "../../components/common/PasswordCheckModal";
import Categories from "../../components/mypage/Categories";
import { colorSystem, size } from "../../styles/color";
import { deleteUser, getUser } from "../../apis/userapi";
import { getCookie, removeCookie } from "../../utils/cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    margin-top: 20px;
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
    /* margin-bottom: 30px; */
  }

  .error-message {
    display: block;
    color: ${colorSystem.error};
    font-size: 0.9rem;
    margin-top: 5px;
    ${size.mid} {
      font-size: 0.8rem;
    }
  }

  /* 각 항목 변경하기 버튼 */
  .form-button > button {
    width: 140px;
    height: 40px;
    font-size: 0.9rem;
  }

  // 인증코드 발송 버튼
  .auth-code-btn {
    position: absolute;
    top: 500px;
    right: 0px;
    ${size.mid} {
      top: 500px;
      right: 40px;
    }
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
  // 비밀번호 확인 입력창 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 회원탈퇴 모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // 프로필사진 미리보기
  const [previewImage, setPreviewImage] = useState(null);
  // 프로필 이미지 상태 추가
  const [profileImage, setProfileImage] = useState(null);

  const [showButtons, setShowButtons] = useState(false);
  // 수정하기 버튼
  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedNickname, setUpdatedNickname] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [updatedPasswordCheck, setUpdatedPasswordCheck] = useState("");
  const [editNickname, setEditNickname] = useState(false);
  const [editPhone, setEditPhone] = useState(false);

  // 에러 메시지 상태
  const [errorMessage, setErrorMessage] = useState("");

  const passwordPattern =
    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phonePattern = /^[0-9]{11,13}$/;
  const nickNamePattern = /^[a-zA-Z가-힣][a-zA-Z0-9가-힣]{2,10}$/;

  // 비밀번호 일치여부 확인
  const [userPwCheck, setUserPwCheck] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const [nickNameValid, setNickNameValid] = useState(true);

  // 핸드폰 발송 여부 확인
  const [isSmsSent, setIsSmsSent] = useState(false);
  // 핸드폰 인증을 위한 타이머 변수
  const [phoneTimer, setPhoneTimer] = useState(0);
  const [phoneTimerId, setPhoneTimerId] = useState(null);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isAuthNumberVerified, setIsAuthNumberVerified] = useState(false);

  const [accessToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState({
    userProfileImage: "",
    userEmail: "",
    userName: "",
    userNickname: "",
    userPw: "",
    userPwCheck: "",
    userPhone: "",
  });
  const navigate = useNavigate();

  // 토큰정보 불러오기
  useEffect(() => {
    const fetchAccessToken = () => {
      try {
        const token = getCookie("access-Token");
        if (token) {
          setAccessToken(token);
        } else {
          console.log("엑세스 토큰 없음");
        }
      } catch (error) {
        console.log("엑세스 토큰 가져오는 중 에러", error);
      }
    };
    fetchAccessToken();
  }, []);

  // 유저 정보 불러오기
  useEffect(() => {
    const getUser = async () => {
      try {
        if (!accessToken) return;
        const response = await axios.get(`/api/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response);
        setUserInfo({
          userProfileImage: response.data.userProfileImage,
          userEmail: response.data.userEmail,
          userName: response.data.userName,
          userNickname: response.data.userNickname,
          userPw: "",
          userPhone: formatPhone(response.data.userPhone),
        });
        // 기본 프로필 이미지 설정 (서버응답에 따라 달라질 수 있음)
        setProfileImage(response.data.profileImageUrl);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [accessToken]);

  // 비밀번호 입력 확인 모달
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 비밀번호 입력 성공 확인 함수
  const handlePasswordCheckSuccess = () => {
    console.log("비밀번호 확인 성공");
    setIsModalOpen(false);
    // 추가적인 로직 수행 (예: 사용자 정보 수정 등)
  };

  // 프로필사진 수정하기 아이콘
  const handleShowButtons = () => {
    setShowButtons(true);
  };

  // 프로필 이미지 변경 시 미리보기 실행
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // 실제 업로드할 이미지 설정
        setProfileImage(file);
        // 미리보기 이미지 설정
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      console.log(file);
    }
  };

  // 회원탈퇴 모달
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // 회원탈퇴 함수
  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`/api/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      if (response.data.code === "SU") {
        console.log("회원 탈퇴 처리완료", response);
        // 쿠키에서 엑세스 토큰 삭제
        removeCookie("access-Token");
        // 엑세스 토큰 상태 초기화
        setAccessToken("");
        // 삭제 완료 후 모달 닫기
        setIsDeleteModalOpen(false);
        // 로그인 페이지로 이동
        navigate("/login");
      } else {
        console.log("탈퇴 실패");
      }
    } catch (error) {
      console.error("회원 탈퇴 오류", error);
    }
  };

  // 닉네임 수정 함수
  const handleNicknameChange = e => {
    setUserInfo(prevState => ({
      ...prevState,
      userNickname: e.target.value,
    }));
    setUpdatedNickname(e.target.value);
  };

  // 비밀번호 수정 함수
  const handlePasswordChange = e => {
    setUserInfo(prevState => ({
      ...prevState,
      userPw: e.target.value,
    }));
    setUpdatedPassword(e.target.value);
    setPasswordMatch(e.target.value === userPwCheck);
  };

  // 비밀번호 확인 핸들러
  const handleConfirmPasswordChange = e => {
    setUserPwCheck(e.target.value);
    setPasswordMatch(userInfo.userPw === e.target.value);
  };

  // 핸드폰번호 수정 함수
  const handlePhoneChange = e => {
    setUserInfo(prevState => ({
      ...prevState,
      userPhone: e.target.value,
    }));
    setUpdatedPhone(e.target.value);
  };

  // 핸드폰 번호 표시 형식
  const formatPhone = phoneNumber => {
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  // 유저 정보 업데이트 함수
  const handleSubmit = async e => {
    e.preventDefault();
    if (!accessToken) return;

    // FormData 객체를 사용하여 multipart/form-data 요청 생성
    const formData = new FormData();

    // dto 필드를 JSON 문자열로 추가
    const dto = JSON.stringify({
      userNickname: updatedNickname,
      userPhone: updatedPhone,
    });
    formData.append("dto", dto);
    // console.log(formData.get("dto"));

    // 이미지 파일 추가 (profileImage를 사용)
    if (profileImage) {
      formData.append("mf", profileImage);
    }

    try {
      const response = await axios.put(`/api/user`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      // 업데이트 성공 시 상태 업데이트
      if (response.data.code === "SU") {
        setUserInfo(prev => ({
          ...prev,
          userNickname: updatedNickname,
          userPhone: updatedPhone,
        }));
        //alert("수정이 완료되었습니다!")
      } else {
        console.log("업데이트 실패");
      }
    } catch (error) {
      console.error("유저 정보 업데이트 오류", error);
    }
  };

  return (
    <WrapStyle>
      <Categories />
      <div className="inner">
        <h3>내 정보 관리</h3>
        <div className="container">
          {/* 프로필 사진 등록 */}
          <div className="userprofile">
            {previewImage || userInfo.userProfileImage ? (
              <img
                src={previewImage || userInfo.userProfileImage}
                alt="프로필 이미지"
                className="userprofile-img"
              />
            ) : (
              <FaUser className="userprofile-img" />
            )}
            <div className="profile-edit">
              <label htmlFor="profileImage" className="profile-label">
                <PiPencilSimpleLine className="pencil-icon" />
              </label>
              <input
                type="file"
                id="profileImage"
                className="profile-input"
                accept="image/*"
                onChange={handleImageChange}
                // value={userInfo.userProfileImage}
              />
            </div>
          </div>
          <div className="wrap">
            <form className="userInfo-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  disabled
                  value={userInfo.userEmail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  id="name"
                  className="name-input"
                  disabled
                  value={userInfo.userName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nickname">닉네임</label>
                <input
                  type="text"
                  id="nickname"
                  placeholder="닉네임을 입력해주세요"
                  value={userInfo.userNickname}
                  onChange={e => {
                    handleNicknameChange(e);
                    setNickNameValid(nickNamePattern.test(e.target.value));
                  }}
                />
                {!nickNameValid && (
                  <p className="error-message">
                    닉네임이 형식에 맞지 않습니다 (2~10자의 대소문자, 한글,
                    숫자만 가능)
                  </p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  className="password-input"
                  placeholder="비밀번호를 입력해주세요"
                  value={userInfo.userPw}
                  onChange={e => {
                    handlePasswordChange(e);
                    setPasswordValid(passwordPattern.test(e.target.value));
                    setPasswordMatch(e.target.value === userPwCheck);
                  }}
                />
                {!passwordValid && (
                  <p className="error-message">
                    비밀번호는 최소 8자 이상, 대소문자 및 특수문자를 포함해야
                    합니다.
                  </p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">비밀번호 확인</label>
                <input
                  type="password"
                  id="confirm-password"
                  className="confirm-password-input"
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  value={userPwCheck}
                  onChange={e => {
                    handleConfirmPasswordChange(e);
                  }}
                />
                {!passwordMatch && (
                  <p className="error-message">비밀번호가 일치하지 않습니다.</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="cellphone">휴대폰</label>
                <input
                  type="text"
                  id="cellphone"
                  placeholder="휴대폰번호를 정확히 입력해주세요"
                  value={userInfo.userPhone}
                  onChange={handlePhoneChange}
                />
                {/* <div className="form-button">
                  <div className="auth-code-btn">
                    <MainButton
                      label="인증번호 발송"
                      // onClick={e => {
                      //   handleSmsSubmit(e);
                      // }}
                    />
                  </div>
                </div> */}
              </div>
              {/* <div className="form-group">
                <label htmlFor="auth-number">인증번호</label>
                <input
                  type="text"
                  id="auth-number"
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
      <PasswordCheckModal
        isOpen={isModalOpen}
        onClose={() => {
          handleCloseModal();
        }}
        onSuccess={() => {
          handlePasswordCheckSuccess();
        }}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          handleCloseDeleteModal();
        }}
        onConfirm={() => {
          handleConfirmDelete();
        }}
        accessToken={accessToken} // accessToken 전달
      />
    </WrapStyle>
  );
};

export default UserInfo;
