import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getAdminStoreList } from "../../apis/adminapi";
import { adminAccessTokenState } from "../../atoms/loginState";
import AdminStoreCard from "../../components/admin/AdminStoreCard";
import AdminCategories from "../../components/mypage/AdminCategories";
import { AdminHeader, GlampingKingStyle } from "../../styles/AdminStyle";
import AdminStoreModal from "../../components/admin/AdminStoreModal";

const AdminStore = () => {
  const [adminAccessToken, setAdminAccessToken] = useRecoilState(
    adminAccessTokenState,
  );
  // 글램핑장 리스트
  const [storeList, setStoreList] = useState([]);
  // 글램핑장 상세보기 모달
  const [selectedStore, setSelectedStore] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // 승인 대기 중인 글램핑장 리스트
  useEffect(() => {
    const getStoreList = async () => {
      try {
        if (adminAccessToken) {
          const list = await getAdminStoreList(adminAccessToken);
          setStoreList(list);
          console.log("리스트: ", list);
        } else {
          console.log("엑세스 토큰 없음");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (adminAccessToken) {
      getStoreList();
    }
  }, [adminAccessToken]);

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

  const handleCardClick = glampId => {
    // 클릭된 스토어 정보를 찾기
    const store = storeList.find(item => item.glampId === glampId);
    setSelectedStore(store);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStore(null);
  };

  return (
    <GlampingKingStyle>
      <AdminHeader>글램픽 관리자 페이지</AdminHeader>
      <AdminCategories />
      <div className="inner">
        <h3>글램핑장 입점 승인</h3>
        <div className="store-inner">
          {storeList.length > 0 ? (
            storeList.map(item => (
              <AdminStoreCard
                key={item.glampId}
                region={regionNames[item.region] || ""}
                glampName={item.glampName}
                ownerName={item.ownerName}
                businessNumber={item.businessNumber}
                onClick={handleCardClick}
              />
            ))
          ) : (
            <p>승인 대기 중인 글램핑장이 없습니다.</p>
          )}
        </div>
      </div>
      {selectedStore && (
        <AdminStoreModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          store={selectedStore}
        />
      )}
    </GlampingKingStyle>
  );
};

export default AdminStore;
