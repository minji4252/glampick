import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { adminAccessTokenState } from "../../atoms/loginState";
import { colorSystem } from "../../styles/color";
import AlertModal from "../common/AlertModal";
import { AdminButton, DeleteButton } from "../common/Button";
import LoadingNobg from "../common/LoadingNobg";

const StoreModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StoreContent = styled.div`
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
  .store-modal-header {
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

  .sm-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
    line-height: 1.3;
    margin-left: 10px;
    .sm-inner {
      display: flex;
      flex-direction: column;
      font-size: 15px;
    }
    h4 {
      margin-left: -10px;
      font-size: 17px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .store-btn {
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

const AdminStoreModal = ({ isOpen, onClose, glampId, onApproval }) => {
  const [adminAccessToken, setAdminAccessToken] = useRecoilState(
    adminAccessTokenState,
  );
  const [glampInfo, setGlampInfo] = useState({
    glampName: "",
    glampCall: "",
    glampImage: null,
    glampLocation: "",
    region: "",
    extraCharge: "",
    glampIntro: "",
    infoBasic: "",
    infoNotice: "",
    traffic: "",
  });
  // 거절 이유
  const [reason, setReason] = useState("");
  const [isReasonVisible, setIsReasonVisible] = useState(false);
  // 확인 모달
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  // 로딩
  const [loading, setLoading] = useState(false);

  // 지역 이름
  const regionNames = {
    all: "전국",
    seoul: "서울/경기",
    gangwon: "강원",
    chungbuk: "충북",
    chungnam: "충남",
    gyeongbuk: "경북",
    gyeongnam: "경남",
    jeonbuk: "전북",
    jeonnam: "전남",
    jeju: "제주",
  };

  // 토큰 정보 불러오기
  useEffect(() => {
    const fetchAdminAccessToken = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          setAdminAccessToken(token);
          console.log("토큰있음");
        }
      } catch (error) {
        console.log(error);
        console.log("토큰업슴");
      }
    };
    fetchAdminAccessToken();
  }, [setAdminAccessToken]);

  // 글램핑장 상세 정보
  useEffect(() => {
    if (!isOpen) return;

    const fetchGlampInfo = async () => {
      try {
        const response = await axios.get(
          `/api/admin/glamping/owner?glampId=${glampId}`,
          {
            headers: {
              Authorization: `Bearer ${adminAccessToken}`,
              "Content-Type": "application/json",
            },
          },
        );

        setGlampInfo({
          glampName: response.data.glampName,
          glampCall: response.data.glampCall,
          glampImage: response.data.glampImage,
          glampLocation: response.data.glampLocation,
          region: response.data.region,
          extraCharge: response.data.extraCharge,
          glampIntro: response.data.glampIntro,
          infoBasic: response.data.infoBasic,
          infoNotice: response.data.infoNotice,
          traffic: response.data.traffic,
        });
        console.log("글램핑장 정보가져옴");
      } catch (error) {
        console.log("글램핑장 정보 가져오기 오류:", error);
      }
    };

    fetchGlampInfo();
  }, [isOpen, glampId, adminAccessToken]);

  // 등록 승인
  const yesStore = async () => {
    setLoading(true);
    try {
      await axios.patch(
        `/api/admin/access/owner/glamping?glampId=${glampId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      setAlertMessage("글램핑장 등록이 승인되었습니다.");
      setIsAlertModalOpen(true);
    } catch (error) {
      console.log("글램핑장 승인 중 오류: ", error);
      setAlertMessage("글램핑장 승인 중 오류가 발생했습니다.");
      setIsAlertModalOpen(true);
    }
    setLoading(false);
  };

  // 등록 거절
  const noStore = async () => {
    setLoading(true);
    try {
      await axios.patch(
        `/api/admin/exclution/owner/glamping`,
        {
          glampId,
          exclusionComment: reason,
        },
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      setAlertMessage("글램핑장 등록이 거절되었습니다.");
      setIsAlertModalOpen(true);
    } catch (error) {
      console.log("글램핑장 등록 반려 중 오류: ", error);
      setAlertMessage("글램핑장 등록 반려 중 오류가 발생했습니다.");
      setIsAlertModalOpen(true);
    }
    setLoading(false);
  };

  const handleReasonChange = e => setReason(e.target.value);

  const handleConfirmClose = () => {
    setIsAlertModalOpen(false);
    onApproval();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <StoreModalStyle onClick={onClose}>
        {loading && <LoadingNobg />}
        <StoreContent onClick={e => e.stopPropagation()}>
          <CloseButton onClick={onClose}>×</CloseButton>
          <div className="store-modal-header">
            <h2>글램핑장 정보 상세보기</h2>
          </div>
          <div className="sm-body">
            <div className="sm-inner">
              <h4>글램핑장 이름: </h4>
              {glampInfo.glampName}
            </div>
            <div className="sm-inner">
              <h4>글램핑장 연락처: </h4>
              {glampInfo.glampCall}
            </div>
            <div className="sm-inner">
              <h4>글램핑장 대표사진: </h4>
              {glampInfo.glampImage ? (
                <img src={glampInfo.glampImage} alt="글램핑장 대표사진" />
              ) : (
                "이미지가 없습니다."
              )}
            </div>
            <div className="sm-inner">
              <h4>지역: </h4>
              {regionNames[glampInfo.region]}
            </div>
            <div className="sm-inner">
              <h4>주소: </h4>
              {glampInfo.glampLocation}
            </div>
            <div className="sm-inner">
              <h4>글램핑장 소개: </h4>
              {glampInfo.glampIntro}
            </div>
            <div className="sm-inner">
              <h4>글램핑장 기본정보: </h4>
              {glampInfo.infoBasic}
            </div>
            <div className="sm-inner">
              <h4>글램핑장 유의사항: </h4>
              {glampInfo.infoNotice}
            </div>
            <div className="sm-inner">
              <h4>주변 관광지: </h4>
              {glampInfo.traffic}
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
            <div className="store-btn">
              <AdminButton label="등록 승인하기" onClick={yesStore} />
              <DeleteButton
                label={isReasonVisible ? "등록 거절하기" : "등록 거절하기"}
                onClick={() => {
                  if (!isReasonVisible) {
                    setIsReasonVisible(true);
                  } else {
                    noStore();
                  }
                }}
              />
            </div>
          </div>
        </StoreContent>
      </StoreModalStyle>
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={handleConfirmClose}
        message={alertMessage}
      />
    </>
  );
};

export default AdminStoreModal;
