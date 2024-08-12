import styled from "@emotion/styled";
import { colorSystem } from "../../styles/color";
import { useEffect, useState } from "react";
import { AdminButton } from "../common/Button";
import { adminAccessTokenState } from "../../atoms/loginState";
import { useRecoilState } from "recoil";
import AlertModal from "../common/AlertModal";
import { CloseButton } from "../common/TermsModal";

const BannerModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BannerModal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  /* max-width: 100%; */
  max-width: calc(100% - 10%);
  max-height: calc(100% - 20%);
  min-width: 340px;
  min-height: 180px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  h2 {
    font-size: 21px;
    font-weight: 500;
    color: ${colorSystem.admin};
    margin-bottom: 20px;
  }
  .banner-input input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .banner-input label {
    display: inline-block;
    padding: 0.5em 0.75em;
    color: #999;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: ${colorSystem.g100};
    cursor: pointer;
    border: 1px solid ${colorSystem.g150};
    border-bottom-color: ${colorSystem.g200};
    border-radius: 0.25em;
    margin-left: 5px;
  }

  .banner-input .banner-name {
    display: inline-block;
    padding: 0.5em 0.75em;
    font-size: inherit;
    font-family: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: #f5f5f5;
    border: 1px solid #ebebeb;
    border-bottom-color: #e2e2e2;
    border-radius: 0.25em;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  button {
    margin-top: 30px;
    width: 100px;
    height: 40px;
    font-size: 16px;
  }
  .banner-close {
    position: absolute;
    top: 5px;
    right: 0px;
    margin-top: 0;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
  }
`;
const PreviewContainer = styled.div`
  margin-top: 20px;
  width: 950px;
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AdminBannerModal = ({ isOpen, onClose }) => {
  const [adminAccessToken, setAdminAccessToken] = useRecoilState(
    adminAccessTokenState,
  );

  // 배너 추가
  const [bannerImage, setBannerImage] = useState(null);
  // 배너 미리보기
  const [previewImage, setPreviewImage] = useState(null);
  const [fileName, setFileName] = useState("이미지 사이즈: 950x200");

  // 확인 모달
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // 토큰 정보 불러오기
  useEffect(() => {
    const fetchAdminAccessToken = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          setAdminAccessToken(token);
          console.log("accessToken 있음");
        } else {
          console.log("accessToken 없음");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdminAccessToken();
  }, [setAdminAccessToken]);

  // 파일 추가
  const handleBannerAdd = e => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(file);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      console.log(file);
    }
  };

  // 추가하기 버튼
  const handleSubmit = async () => {
    if (!bannerImage) {
      setAlertMessage("파일을 선택해 주세요.");
      setIsAlertModalOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", bannerImage);

    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        setBannerImage(null);
        setPreviewImage(null);
        setFileName("이미지 사이즈: 950x200");
        onClose();
        // 성공 메시지 설정 및 모달 열기
        setAlertMessage("배너가 추가되었습니다.");
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "파일 업로드에 실패했습니다.";
        setAlertMessage(errorMessage);
      }
    } catch (error) {
      console.error("업로드 오류 발생:", error);
      setAlertMessage("업로드 중 오류가 발생했습니다.");
    } finally {
      setIsAlertModalOpen(true);
    }
  };
  // 모달 닫으면 파일 다시
  const handleClose = () => {
    setBannerImage(null);
    setPreviewImage(null);
    setFileName("이미지 사이즈: 950x200");
    onClose();
  };

  const handleConfirmClose = () => {
    setIsAlertModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <BannerModalStyle>
      <BannerModal>
        <CloseButton onClick={handleClose} className="banner-close">
          ×
        </CloseButton>
        <h2>배너 추가하기</h2>

        <div className="banner-input">
          <input className="banner-name" value={fileName} disabled="disabled" />
          <label htmlFor="ex_bannername">파일 선택</label>
          <input
            type="file"
            id="ex_bannername"
            className="upload-hidden"
            accept="image/*"
            onChange={handleBannerAdd}
          />
        </div>
        {previewImage && (
          <PreviewContainer>
            <PreviewImage src={previewImage} alt="미리보기" />
          </PreviewContainer>
        )}
        <AdminButton
          type="submit"
          label="추가하기"
          onClick={handleSubmit}
          className="add-btn"
        />
      </BannerModal>
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={handleConfirmClose}
        message={alertMessage}
      />
    </BannerModalStyle>
  );
};

export default AdminBannerModal;
