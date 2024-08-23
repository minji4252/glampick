import styled from "@emotion/styled";
import axios from "axios";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { colorSystem } from "../../styles/color";
import { ActionButton, DeleteButton } from "./Button";
import { useRecoilState } from "recoil";
import { isLoginState, userRoleState } from "../../atoms/loginState";
import { ModalOverlay } from "./ReviewImgModal";

export const DeleteModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colorSystem.white};
  z-index: 9999999;
  max-width: 260px;
  width: 260px;
  max-height: 330px;
  height: 330px;
  border-radius: 32px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;

  .close-btn {
    background-color: transparent;
    border: 0px;
    position: absolute;
    width: 24px;
    top: 10px;
    right: 15px;
    cursor: pointer;
    max-width: 25px;
  }

  .close-btn svg {
    width: 100%;
    height: 25px;
    color: #777;
  }
`;
export const DeleteIcon = styled.div`
  margin-top: 26px;
  width: 52px;
  height: 52px;
  background-color: ${colorSystem.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;

  svg {
    width: 28px;
    height: 28px;
    color: ${colorSystem.g150};
  }
`;
export const DeleteText = styled.div`
  margin-top: 23px;

  h2 {
    font-size: 1.1rem;
    font-weight: 700;
  }

  p {
    margin-top: 26px;
    font-size: 0.85rem;
    line-height: 1.2rem;
  }
`;
export const DeleteModalBtn = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    width: 145px;
  }
`;

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  accessToken: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  accessToken,
}) => {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [userRole, setUserRole] = useRecoilState(userRoleState);
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(response);
      if (response.data.code === "SU") {
        // console.log("회원 탈퇴 처리완료", response);
        onConfirm(); // 부모 컴포넌트에서 모달 닫기 처리를 하도록 호출
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
        setIsLogin(false);
        setUserRole(null);
        navigate("/");
      } else {
        console.log("탈퇴 실패");
      }
    } catch (error) {
      console.error("회원 탈퇴 오류", error);
    }
  };

  return (
    <ModalOverlay>
      <DeleteModalStyle>
        <button className="close-btn" type="button" onClick={onClose}>
          <IoClose />
        </button>
        <DeleteIcon>
          <HiOutlineTrash />
        </DeleteIcon>
        <DeleteText>
          <h2>정말 탈퇴하시겠습니까?</h2>
          <p>
            탈퇴 버튼 선택 시, 계정은 <br /> 삭제되며 복구되지 않습니다.
          </p>
        </DeleteText>
        <DeleteModalBtn>
          <DeleteButton
            label="탈퇴"
            onClick={() => {
              handleDelete();
            }}
          />
          <ActionButton label="취소" onClick={onClose} />
        </DeleteModalBtn>
      </DeleteModalStyle>
    </ModalOverlay>
  );
};

export default DeleteModal;
