import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { postCheckSms, postSendSms } from "../../apis/userapi";
import AlertModal from "../../components/common/AlertModal";
import { MainButton } from "../../components/common/Button";
import DeleteModal from "../../components/common/DeleteModal";
import Loading from "../../components/common/Loading";
import PasswordCheckModal from "../../components/common/PasswordCheckModal";
import Categories from "../../components/mypage/Categories";
import useModal from "../../hooks/UseModal";
import { colorSystem, size } from "../../styles/color";
import { getCookie, removeCookie } from "../../utils/cookie";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../atoms/loginState";

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

  /* 프로필 사진 수정  */
  .profile-edit {
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: -3px;
    left: 140px;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .profile-label {
    cursor: pointer;
    width: 100%;
    height: 100%;
    background-color: ${colorSystem.g100};
    border-radius: 50%;
  }

  .profile-input {
    display: none;
  }

  /* 프로필 수정 아이콘 */
  .camera-icon {
    color: ${colorSystem.g900};
    width: 23px;
    height: 23px;
    position: absolute;
    top: 8px;
    left: 9px;
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
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .form-group {
    width: 100%;
  }

  /* 변경 불가한 input 컬러 다르게 적용 */
  #email {
    background-color: ${colorSystem.g100};
  }

  #name {
    background-color: ${colorSystem.g100};
  }

  .form-group input,
  .input-group input {
    width: 100%;
    height: 40px;
    border: none;
    background-color: ${colorSystem.white};
    border: 1px solid ${colorSystem.g100};
    padding: 10px;
    font-size: 0.95rem;
    border-radius: 10px;
    /* margin-bottom: 30px; */
  }

  .error-message {
    display: block;
    color: ${colorSystem.error};
    font-size: 0.85rem;
    margin-top: 5px;
    margin-left: 5px;
    ${size.mid} {
      font-size: 0.8rem;
    }
  }

  /* 각 항목 변경하기 버튼 */
  .form-button > button {
    width: 10px;
    height: 40px;
    font-size: 0.9rem;
    border-radius: 10px;
    ${size.mid} {
      font-size: 0.8rem;
    }
  }

  /* 휴대폰 input, 인증번호 발송 버튼 그룹 */
  .input-group {
    display: flex;
    width: 100%;
    gap: 10px;
  }

  // 휴대폰 input
  #cellphone {
    width: 75%;
  }

  #auth-number {
    width: 75%;
  }

  .auth-number-btn > button,
  .form-button {
    max-width: 110px;
    width: 100%;
    font-size: 0.8rem;
    > button {
      width: 100%;
      padding: 8px 10px;
      ${size.mid} {
        font-size: 0.8rem;
      }
    }
  }

  .timer-wrap {
    width: 100%;
    .timer {
      margin-top: 5px;
      margin-left: 5px;
      color: ${colorSystem.error};
      font-size: 0.8rem;
      ${size.mid} {
        font-size: 0.7rem;
      }
    }

    .time-over {
      margin-top: 5px;
      margin-left: 5px;
      color: ${colorSystem.error};
      font-size: 0.8rem;
      ${size.mid} {
        font-size: 0.7rem;
      }
    }
  }

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
    right: 10px;
    font-size: 1rem;
    color: ${colorSystem.g600};
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
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  // 회원탈퇴 모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // 프로필사진 미리보기
  const [previewImage, setPreviewImage] = useState(null);
  // 프로필 이미지 상태 추가
  const [profileImage, setProfileImage] = useState(null);

  // 닉네임, 비밀번호, 핸드폰 유효성 검사
  const nickNamePattern = /^[a-zA-Z가-힣][a-zA-Z0-9가-힣]{2,10}$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phonePattern = /^[0-9]{11,13}$/;
  const authNumberPattern = /^[0-9]{6}$/;

  // 인증번호
  const [authNumber, setAuthNumber] = useState("");

  // 유저정보 업데이트 상태 관리
  const [updatedNickname, setUpdatedNickname] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");

  // Alert 모달 관련 상태와 함수
  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();

  const [userPwCheck, setUserPwCheck] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [nickNameValid, setNickNameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [authNumberValid, setAuthNumberValid] = useState(true);

  // 핸드폰 인증코드 발송 여부 확인
  const [isSmsSent, setIsSmsSent] = useState(false);
  // 핸드폰 인증을 위한 타이머 변수
  const [phoneTimer, setPhoneTimer] = useState(0);
  const [phoneTimerId, setPhoneTimerId] = useState(null);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isAuthNumberVerified, setIsAuthNumberVerified] = useState(false);

  // 인증토큰
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  // 유저정보
  const [userInfo, setUserInfo] = useState({
    userProfileImage: "",
    userEmail: "",
    userName: "",
    userNickname: "",
    userPw: "",
    userPwCheck: "",
    userPhone: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 토큰정보 불러오기
  useEffect(() => {
    const fetchAccessToken = () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          setAccessToken(token);
        } else {
          // console.log("엑세스 토큰 없음");
        }
      } catch (error) {
        // console.log("엑세스 토큰 가져오는 중 에러", error);
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
        // console.log(response);
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
        //console.log(error);
      }
    };
    getUser();
  }, [accessToken]);

  // 비밀번호 입력 확인 모달
  useEffect(() => {
    setIsPasswordModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsPasswordModalOpen(false);
  };

  // 비밀번호 입력 성공 확인 함수
  const handlePasswordCheckSuccess = () => {
    // console.log("비밀번호 확인 성공");
    setIsPasswordModalOpen(false);
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
      // console.log(response);
      if (response.data.code === "SU") {
        // console.log("회원 탈퇴 처리완료", response);
        // 쿠키에서 엑세스 토큰 삭제
        removeCookie("access-Token");
        // 엑세스 토큰 상태 초기화
        setAccessToken("");
        // 삭제 완료 후 모달 닫기
        setIsDeleteModalOpen(false);
        // 로그인 페이지로 이동
        navigate("/login");
      } else {
        // console.log("탈퇴 실패");
      }
    } catch (error) {
      // console.error("회원 탈퇴 오류", error);
    }
  };

  // 닉네임 수정 함수
  const handleNicknameChange = e => {
    setUserInfo(prevState => ({
      ...prevState,
      userNickname: e.target.value,
    }));
    setUpdatedNickname(e.target.value);
    setNickNameValid(nickNamePattern.test(e.target.value));
  };

  // 비밀번호 수정 함수
  const handlePasswordChange = e => {
    setUserInfo(prevState => ({
      ...prevState,
      userPw: e.target.value,
    }));
    setUpdatedPassword(e.target.value);
    setPasswordMatch(e.target.value === userPwCheck);
    setPasswordValid(passwordPattern.test(e.target.value));
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
    setPhoneValid(phonePattern.test(e.target.value));
  };

  // 핸드폰 번호 표시 형식
  const formatPhone = phoneNumber => {
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  // 핸드폰 타이머 포맷 함수 (분:초 형식으로 표시)
  const formatPhoneTimer = () => {
    const minutes = Math.floor(phoneTimer / 60);
    const seconds = phoneTimer % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // 핸드폰 인증 타이머 초기화 및 정리
  useEffect(() => {
    if (phoneTimer > 0 && !phoneTimerId) {
      const id = setInterval(() => {
        setPhoneTimer(prevPhoneTimer => prevPhoneTimer - 1);
      }, 1000); // 1000밀리초 (1초)마다 실행
      setPhoneTimerId(id);
    } else if (phoneTimer === 0 && phoneTimerId) {
      clearInterval(phoneTimerId);
      setPhoneTimerId(null);
    }
    return () => {
      if (phoneTimerId) {
        clearInterval(phoneTimerId);
        setPhoneTimerId(null);
      }
    };
  }, [phoneTimer, phoneTimerId]);

  // 핸드폰 인증시 처리할 함수
  const handleSmsSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const result = await postSendSms({ userPhone: userInfo.userPhone });
    // console.log(result.data);
    if (result.data.code === "SU") {
      openModal({
        message: "인증코드가 발송되었습니다. \n 문자메세지를 확인해주세요",
      });
      // Sms 발송 성공
      setIsSmsSent(true);
      setPhoneTimer(299);
    } else if (result.data.code === "IPH") {
      openModal({
        message: "전화번호 형식이 올바르지 않습니다.",
      });
    } else if (result.data.code === "DT") {
      openModal({
        message: "중복된 전화번호 입니다.",
      });
    } else {
      openModal({
        message: "발송 실패하였습니다. \n 다시 시도해주세요",
      });
    }
    setLoading(false);
  };

  // 핸드폰 인증코드 처리할 함수
  const handleAuthNumberSubmit = async e => {
    e.preventDefault();

    const result = await postCheckSms({
      userPhone: userInfo.userPhone,
      authNumber,
    });
    // console.log(result);
    if (result.data.code === "SU") {
      setIsPhoneVerified(true);
      setIsAuthNumberVerified(true);
      openModal({
        message: "인증이 완료되었습니다.",
      });
      setIsSmsSent(false);
      setPhoneTimer(0);
      if (phoneTimerId) {
        // 타이머 중지
        clearInterval(phoneTimerId);
        setPhoneTimerId(null);
      }
    } else if (result.data.code === "IC") {
      openModal({
        message: "인증코드가 올바르지 않습니다.",
      });
    } else {
      openModal({
        message: "인증에 실패하였습니다. \n 다시 시도해주세요",
      });
    }
  };

  // 유저 정보 업데이트 함수
  const handleSubmit = async e => {
    e.preventDefault();
    if (!accessToken) return;

    if (!nickNameValid) {
      openModal({
        message: "닉네임이 형식에 맞지 않습니다",
      });
      return;
    }

    if (!passwordValid) {
      openModal({
        message: "비밀번호가 형식에 맞지 않습니다",
      });
      return;
    }

    if (updatedPassword && updatedPassword !== userPwCheck) {
      openModal({
        message: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }

    if (updatedPhone && !isPhoneVerified) {
      openModal({
        message: "휴대폰 인증이 완료되지 않았습니다",
      });
      return;
    }

    // FormData 객체를 사용하여 multipart/form-data 요청 생성
    const formData = new FormData();

    // dto 필드를 JSON 문자열로 추가
    const dto = JSON.stringify({
      userNickname: updatedNickname,
      userPw: updatedPassword,
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
      // console.log(response);
      // 업데이트 성공 시 상태 업데이트
      if (response.data.code === "SU") {
        setUserInfo(prev => ({
          ...prev,
          userNickname: updatedNickname,
          userPW: updatedPassword,
          userPhone: updatedPhone,
        }));
        openModal({ message: "수정이 완료되었습니다!" });
        // 페이지 새로고침
        // window.location.reload();
      } else {
        // console.log("업데이트 실패");
      }
    } catch (error) {
      console.error("유저 정보 업데이트 오류", error);
      if (error.response.data.code === "DN") {
        openModal({ message: "이미 사용중인 닉네임입니다." });
      }
    }
  };

  return (
    <WrapStyle>
      <Categories />
      {loading && <Loading />}
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
                <FaCamera className="camera-icon" />
              </label>
              <input
                type="file"
                id="profileImage"
                className="profile-input"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="wrap">
            <form
              className="userInfo-form"
              onSubmit={e => {
                handleSubmit(e);
              }}
            >
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
                    닉네임이 형식에 맞지 않습니다 (3~10자의 대소문자, 한글,
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
                <div className="input-group">
                  <input
                    type="text"
                    id="cellphone"
                    className="phone-input"
                    placeholder="휴대폰번호를 정확히 입력해주세요"
                    value={userInfo.userPhone}
                    onChange={e => {
                      handlePhoneChange(e);
                      setPhoneValid(phonePattern.test(e.target.value));
                    }}
                  />
                  <div className="form-button">
                    <div className="auth-number-btn">
                      <MainButton
                        label="인증번호 발송"
                        onClick={e => {
                          handleSmsSubmit(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                {!phoneValid && (
                  <p className="error-message">
                    핸드폰 번호를 바르게 기재해주세요 (11~13자의 숫자만 가능)
                  </p>
                )}
              </div>
              {isSmsSent && (
                <div className="form-group">
                  <label htmlFor="auth-number">인증번호</label>
                  <div className="input-group">
                    <input
                      type="text"
                      id="auth-number"
                      maxLength="6"
                      pattern="\d{6}"
                      placeholder="인증번호를 입력해주세요"
                      value={authNumber}
                      onChange={e => {
                        setAuthNumber(e.target.value);
                        setAuthNumberValid(
                          authNumberPattern.test(e.target.value),
                        );
                      }}
                    />
                    <div className="form-button">
                      <div className="auth-number-btn">
                        <MainButton
                          label="확인"
                          onClick={e => {
                            handleAuthNumberSubmit(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* 타이머 */}
              {isSmsSent && phoneTimer > 0 && (
                <div className="timer-wrap">
                  <p className="timer">남은 시간: {formatPhoneTimer()}</p>
                </div>
              )}
              {isSmsSent && phoneTimer === 0 && (
                <div>
                  <p className="time-over">
                    인증 시간이 만료되었습니다. 다시 발송해주세요.
                  </p>
                </div>
              )}
              <div className="modify-btn">
                <MainButton label="수정하기" />
              </div>
            </form>
            <AlertModal
              isOpen={isModalOpen}
              onClose={closeModal}
              message={modalMessage}
            />
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
        isOpen={isPasswordModalOpen}
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
