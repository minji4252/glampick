import styled from "@emotion/styled";
import axios from "axios";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { colorSystem } from "../../styles/color";
import { CeoButton } from "../common/Button";
import { ModalWrapper } from "../common/PasswordCheckModal";

const BusinessRegistrationModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colorSystem.white};
  z-index: 99999;
  max-width: 500px;
  width: 100%;
  max-height: 600px;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;

  > h2 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${colorSystem.g900};
    padding: 0px 0px 10px 0px;
    border-bottom: 1px solid ${colorSystem.g400};
  }
  .close-btn {
    background-color: transparent;
    border: 0;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    svg {
      width: 24px;
      height: 24px;
      color: ${colorSystem.g800};
    }
  }
  .file-upload-container {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start; /* 왼쪽 정렬 */
    gap: 10px; /* 버튼과 다른 요소 사이 간격 */
  }
  .custom-file-upload {
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
    background: ${colorSystem.ceo};
    color: white;
    border-radius: 8px;
    border: none;
    text-align: center;
    font-size: 1rem;
    transition: background 0.3s ease;
    &:hover {
      background: ${colorSystem.ceo700}; /* 버튼 호버 색상 */
    }
  }
  .hidden-file-input {
    display: none; /* 기본 파일 입력 필드 숨기기 */
  }
  .file-info {
    margin-left: 10px; /* 파일명과 버튼 사이 간격 */
    font-size: 0.9rem;
    color: ${colorSystem.g800};
  }
  .preview-container {
    margin: 20px 0;
    overflow: hidden;
    max-height: 200px;
    img {
      max-width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
  .modal-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    > button {
      font-size: 1rem;
      width: 50%;
    }
  }
`;

interface BusinessRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (fileUrl: string) => void;
  apiEndpoint: string;
}

const BusinessRegistrationModal: React.FC<BusinessRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  apiEndpoint,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // 배경 클릭 시 모달 닫기 핸들러
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(e.target.files[0]);
      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      if (selectedFile) {
        reader.readAsDataURL(selectedFile);
      }
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/owner/businessInfo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      if (response.data.code === "SU") {
        onSuccess(response.data.fileUrl); // 서버가 반환하는 파일 URL
        onClose();
      } else {
        setErrorMessage("파일 업로드 실패. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("파일 업로드 중 오류가 발생했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper onClick={handleOverlayClick}>
      <BusinessRegistrationModalStyle>
        <ModalContent>
          <button className="close-btn" onClick={onClose}>
            <IoClose />
          </button>
          <h2>사업자등록증을 첨부해주세요</h2>
          <form onSubmit={handleSubmit}>
            <div className="file-upload-container">
              <label className="custom-file-upload">
                파일 선택
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={handleFileChange}
                  className="hidden-file-input"
                />
              </label>
              {file && <span className="file-info">{file.name}</span>}{" "}
              {/* 파일명 표시 */}
            </div>
            {previewUrl && (
              <div className="preview-container">
                <img src={previewUrl} alt="미리보기" />
              </div>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="modal-btn">
              <CeoButton label="업로드" />
            </div>
          </form>
        </ModalContent>
      </BusinessRegistrationModalStyle>
    </ModalWrapper>
  );
};

export default BusinessRegistrationModal;
