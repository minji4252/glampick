import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { SlLock } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { postPasswordCheck } from "../../apis/userapi";
import { colorSystem, size } from "../../styles/color";
import { MainButton } from "./Button";
import axios from "axios";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../atoms/loginState";

export const ModalWrapper = styled.div`
  // display: ${props => (props.showModal ? "flex" : "none")};
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 400px;
  /* height: 40%;
  max-height: 300px; */
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 32px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  .back-btn {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 1.3rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  .privacy {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    margin-top: 10px;
    margin-bottom: 20px;
    border-radius: 50%;
    background-color: ${colorSystem.g100};
  }

  .lock-img {
    align-self: center;
    width: 55%;
    height: 55%;
    color: ${colorSystem.g400};
  }

  > h2 {
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    color: ${colorSystem.g900};
    font-weight: 600;
    margin-bottom: 10px;
  }
  > div {
    line-height: 1.2;
    text-align: center;
    font-size: 1rem;
    color: ${colorSystem.g900};
    padding: 10px;
  }
  > form {
    width: 100%;

    .error-message {
      display: block;
      margin-left: 3px;
      color: ${colorSystem.error};
      font-size: 0.8rem;
      ${size.mid} {
        font-size: 0.7rem;
      }
    }
  }

  input {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 5px;
    border-radius: 10px;
    border: 2px solid ${colorSystem.g400};
    font-size: 0.9rem;
  }
  .modal-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    > button {
      margin-top: 10px;
      width: 30%;
      font-size: 0.9rem;
    }
  }
`;

const PasswordCheckModal = ({ isOpen, onSuccess }) => {
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // 모달창 오픈시 스크롤 금지 컨트롤
  useEffect(() => {
    const handleBodyScroll = () => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };
    handleBodyScroll();

    return () => {
      // 모달이 닫힐 때 body의 overflow 스타일을 원래대로 되돌림
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // 이전 버튼 클릭시 이전 페이지로 돌아감
  const onClickBtn = () => {
    navigate(-1);
  };

  const handlePasswordChange = e => {
    // console.log(e.target.value); // 입력된 비밀번호 출력
    setPassword(e.target.value);
    setErrorMessage("");
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          setAccessToken(token);
        } else {
          console.log("accessToken 없음");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAccessToken();
  }, []);

  // 비밀번호 확인 함수
  const handlePasswordCheck = async e => {
    e.preventDefault();
    if (!accessToken) return;

    axios.defaults.withCredentials = true;
    //console.log("비밀번호입력확인", handlePasswordCheck);

    try {
      const response = await axios.post(
        `/api/user/password-check`,
        {
          userPw: password,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      // console.log(response);
      if (response.data.code === "SU") {
        // console.log("비밀번호 확인 성공");
        onSuccess();
      } else if (response.data.code === "NMP") {
        setErrorMessage("비밀번호가 일치하지 않습니다.");
      } else {
        console.log("비밀번호 확인 실패");
      }
      return response;
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.code === "NMP") {
        setErrorMessage("비밀번호가 일치하지 않습니다.");
      }
    }
  };

  if (!isOpen) return null;
  return (
    <ModalWrapper>
      <ModalContent>
        <button className="back-btn" onClick={onClickBtn}>
          <FaArrowLeft />
        </button>
        <div className="privacy">
          <SlLock className="lock-img" />
        </div>
        <h2>비밀번호 확인</h2>
        <div>
          개인정보 보호를 위해 <br />
          비밀번호를 다시 한번 확인해주세요.
        </div>
        <form onSubmit={handlePasswordCheck}>
          {/* <label htmlFor="password">비밀번호</label> */}
          <input
            type="password"
            id="password"
            required
            value={password}
            placeholder="비밀번호를 입력해주세요"
            onChange={handlePasswordChange}
          />
          <p className="error-message">{errorMessage}</p>
          <div className="modal-btn">
            <MainButton type="submit" label="확인" />
          </div>
        </form>
      </ModalContent>
    </ModalWrapper>
  );
};

export default PasswordCheckModal;

// 쿠키에서 특정 이름의 쿠키 값을 가져오는 함수
function getCookie(name) {
  const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]*)`);
  return cookieValue ? cookieValue.pop() : "";
}
