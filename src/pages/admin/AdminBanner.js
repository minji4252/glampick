import React, { useEffect, useState } from "react";
import { AdminHeader, GlampingKingStyle } from "../../styles/AdminStyle";
import AdminCategories from "../../components/mypage/AdminCategories";
import { adminAccessTokenState } from "../../atoms/loginState";
import { useRecoilState } from "recoil";
import axios from "axios";
import AdminBannerCard from "../../components/admin/AdminBannerCard";
import { AdminButton } from "../../components/common/Button";
import AdminBannerModal from "../../components/admin/AdminBannerModal";

const AdminBanner = ({ bannerId, createdAt, bannerUrl }) => {
  const [adminAccessToken, setAdminAccessToken] = useRecoilState(
    adminAccessTokenState,
  );
  const [list, setList] = useState([]);
  // 배너 추가 모달
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

  // 배너 리스트 가져오기
  useEffect(() => {
    const getBanners = async () => {
      try {
        const response = await axios.get("/api/admin/banner", {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        });
        setList(response.data.list);
        console.log("배너리스트: ", response.data.list);
      } catch (error) {
        console.error("배너 데이터 겟 오류: ", error);
      }
    };
    if (adminAccessToken) {
      getBanners();
    }
  }, [adminAccessToken]);

  // 배너 추가 모달 열고 닫기
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 배너 삭제
  const handleDelete = deletedBannerId => {
    setList(list.filter(item => item.bannerId !== deletedBannerId));
  };

  return (
    <GlampingKingStyle>
      <AdminHeader>글램픽 관리자 페이지</AdminHeader>
      <AdminCategories />
      <div className="inner">
        <h3>배너 관리</h3>
        <div className="banner-inner">
          <button className="banner-add" onClick={openModal}>
            배너 추가하기
          </button>
          <div className="banner-list">
            {list.map(item => (
              <AdminBannerCard
                key={item.bannerId}
                createdAt={item.createdAt}
                bannerId={item.bannerId}
                bannerUrl={item.bannerUrl}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
      <AdminBannerModal isOpen={isModalOpen} onClose={closeModal} />
    </GlampingKingStyle>
  );
};

export default AdminBanner;
