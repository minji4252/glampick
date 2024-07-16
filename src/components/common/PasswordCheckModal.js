import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { SlLock } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { colorSystem } from "../../styles/color";
import { MainButton } from "./Button";

const ModalWrapper = styled.div`
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

const PasswordCheckModal = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // 이전 버튼 클릭시 이전 페이지로 돌아감
  const onClickBtn = () => {
    navigate(-1);
  };

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

  const handleSubmit = event => {
    event.preventDefault();
    // 비밀번호 검증 로직 추가
    // 비밀번호가 일치할 때만 접근 허용
    onClose();
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
        <form
          onSubmit={() => {
            handleSubmit;
          }}
        >
          {/* <label htmlFor="password">비밀번호</label> */}
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
          />
          <div className="modal-btn">
            <MainButton type="submit" label="확인" />
          </div>
        </form>
      </ModalContent>
    </ModalWrapper>
  );
};

export default PasswordCheckModal;
