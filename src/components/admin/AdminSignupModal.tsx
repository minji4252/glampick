import styled from "@emotion/styled";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { adminAccessTokenState } from "../../atoms/loginState";
import { colorSystem } from "../../styles/color";
import AlertModal from "../common/AlertModal";
import { AdminButton, DeleteButton } from "../common/Button";
import LoadingNobg from "../common/LoadingNobg";

const SignupModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999999;
`;

const SignupContent = styled.div`
  position: relative;
  background: white;
  padding: 40px;
  border-radius: 10px;
  width: calc(100% - 60%);
  height: calc(100% - 150px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 15px;
  }

  ::-webkit-scrollbar-track {
    background: ${colorSystem.g200};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colorSystem.admin3};
    border-radius: 10px;
  }

  .signup-m-inner {
    .m-inner-title {
      display: flex;
      justify-content: center;
      margin: 5px 0 30px 0;
      h2 {
        font-size: 21px;
        font-weight: 600;
        color: ${colorSystem.admin};
        padding: 0 10px 5px 10px;
        border-bottom: 2px solid ${colorSystem.admin};
      }
    }
    .m-inner-content {
      display: flex;
      flex-direction: column;
      gap: 15px;
      font-size: 15px;
      h4 {
        font-size: 17px;
        font-weight: 500;
        margin-right: 10px;
      }
      .m-inner-inner {
        display: flex;
        flex-direction: row;
      }

      .business-img {
        margin-top: 10px;
      }

      .signup-btn {
        display: flex;
        justify-content: center;
        margin-top: 60px;
        gap: 20px;
      }
      button {
        width: 140px;
        height: 40px;
        font-size: 16px;
      }
    }
  }
`;

const CloseButton = styled.button`
  background: rgba(0, 0, 0, 0);
  font-size: 25px;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 5px;
`;

const ReasonInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid ${colorSystem.g200};
  border-radius: 5px;
`;

interface OwnerInfo {
  ownerName: string;
  ownerPhone: string;
  businessNumber: string;
  businessPaperImage: string | null;
}

interface AdminSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  ownerId: string;
  onApproval: () => void;
}

const AdminSignupModal: React.FC<AdminSignupModalProps> = ({
  isOpen,
  onClose,
  ownerId,
  onApproval,
}) => {
  const [adminAccessToken, setAdminAccessToken] = useRecoilState<string | null>(
    adminAccessTokenState,
  );
  const [ownerInfo, setOwnerInfo] = useState<OwnerInfo>({
    ownerName: "",
    ownerPhone: "",
    businessNumber: "",
    businessPaperImage: null,
  });
  // 거절 이유
  const [reason, setReason] = useState<string>("");
  const [isReasonVisible, setIsReasonVisible] = useState<boolean>(false);
  // 확인 모달
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  // 로딩
  const [loading, setLoading] = useState<boolean>(false);

  // 토큰 정보 불러오기
  useEffect(() => {
    const fetchAdminAccessToken = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          setAdminAccessToken(token);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdminAccessToken();
  }, [setAdminAccessToken]);

  // 사장님 상세 정보
  useEffect(() => {
    if (!isOpen) return;

    const fetchOwnerInfo = async () => {
      try {
        const response = await axios.get(
          `/api/admin/business/owner?ownerId=${ownerId}`,
          {
            headers: {
              Authorization: `Bearer ${adminAccessToken}`,
              "Content-Type": "application/json",
            },
          },
        );

        setOwnerInfo({
          ownerName: response.data.ownerName,
          ownerPhone: response.data.ownerPhone,
          businessNumber: response.data.businessNumber,
          businessPaperImage: response.data.businessPaperImage,
        });
      } catch (error) {
        console.log("에러:", error);
      }
    };

    fetchOwnerInfo();
  }, [isOpen, ownerId, adminAccessToken]);

  // 가입 승인
  const yesSignup = async () => {
    setLoading(true);
    try {
      await axios.patch(
        `/api/admin/access/owner/sign-up?ownerId=${ownerId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      setAlertMessage("가입 승인이 완료되었습니다.");
      setIsAlertModalOpen(true);
    } catch (error) {
      console.log("가입 승인 중 오류: ", error);
      setAlertMessage("가입 승인 중 오류가 발생했습니다.");
      setIsAlertModalOpen(true);
    }
    setLoading(false);
  };

  // 가입 거절
  const noSignup = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/admin/exclution/owner/sign-up`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
          "Content-Type": "application/json",
        },
        data: {
          ownerId,
          exclusionComment: reason,
        },
      });
      setAlertMessage("가입이 거절되었습니다.");
      setIsAlertModalOpen(true);
    } catch (error) {
      console.log("가입 반려 중 오류: ", error);
      setAlertMessage("가입 반려 중 오류가 발생했습니다.");
      setIsAlertModalOpen(true);
    }
    setLoading(false);
  };

  const handleReasonChange = (e: ChangeEvent<HTMLInputElement>) =>
    setReason(e.target.value);

  const handleConfirmClose = () => {
    setIsAlertModalOpen(false);
    onApproval();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <SignupModalStyle onClick={onClose}>
        {loading && <LoadingNobg />}
        <SignupContent onClick={e => e.stopPropagation()}>
          <CloseButton onClick={onClose}>×</CloseButton>
          <div className="signup-m-inner">
            <div className="m-inner-title">
              <h2>회원 가입 상세 정보</h2>
            </div>
            <div className="m-inner-content">
              <div className="m-inner-inner">
                <h4>사장님 이름: </h4>
                {ownerInfo.ownerName}
              </div>
              <div className="m-inner-inner">
                <h4>휴대폰 번호: </h4>
                {ownerInfo.ownerPhone}
              </div>
              <div className="m-inner-inner">
                <h4>사업자등록번호: </h4>
                {ownerInfo.businessNumber}
              </div>
              <div>
                <h4>사업자등록증: </h4>
                {ownerInfo.businessPaperImage && (
                  <img
                    className="business-img"
                    src={ownerInfo.businessPaperImage}
                    alt="사업자등록증"
                    style={{ width: "100%", borderRadius: "5px" }}
                  />
                )}
              </div>
              {isReasonVisible && (
                <div>
                  <h4>거절 이유:</h4>
                  <ReasonInput
                    type="text"
                    value={reason}
                    onChange={handleReasonChange}
                    placeholder="거절 이유를 입력하세요"
                  />
                </div>
              )}
              <div className="signup-btn">
                <AdminButton label="가입 승인하기" onClick={yesSignup} />
                <DeleteButton
                  label={isReasonVisible ? "가입 거절하기" : "가입 거절하기"}
                  onClick={() => {
                    if (!isReasonVisible) {
                      setIsReasonVisible(true);
                    } else {
                      noSignup();
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </SignupContent>
      </SignupModalStyle>
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={handleConfirmClose}
        message={alertMessage}
      />
    </>
  );
};

export default AdminSignupModal;