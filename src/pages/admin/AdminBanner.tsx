import React, { useEffect, useState } from "react";
import { AdminHeader, GlampingKingStyle } from "../../styles/AdminStyle";
import AdminCategories from "../../components/mypage/AdminCategories";
import { adminAccessTokenState } from "../../atoms/loginState";
import { useRecoilState } from "recoil";
import axios from "axios";
import AdminBannerCard from "../../components/admin/AdminBannerCard";
import AdminBannerModal from "../../components/admin/AdminBannerModal";
import CheckModal from "../../components/common/CheckModal";
import AlertModal from "../../components/common/AlertModal";

interface Banner {
  bannerId: string;
  createdAt: string;
  bannerUrl: string;
}

const AdminBanner: React.FC = () => {
  const [adminAccessToken, setAdminAccessToken] = useRecoilState<string | null>(
    adminAccessTokenState,
  );
  const [list, setList] = useState<Banner[]>([]);
  // 배너 추가 모달
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedBannerId, setSelectedBannerId] = useState<string | null>(null); // 선택한 배너 ID 상태
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false); // 확인 모달 상태
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);

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

  const getBanners = async () => {
    try {
      const response = await axios.get<{ list: Banner[] }>(
        "/api/admin/banner",
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        },
      );
      setList(response.data.list);
    } catch (error) {
      console.error("배너 데이터 겟 오류: ", error);
    }
  };

  useEffect(() => {
    if (adminAccessToken) {
      getBanners();
    }
  }, [adminAccessToken]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    refreshBanners();
  };

  const refreshBanners = async () => {
    if (adminAccessToken) {
      await getBanners();
    }
  };

  const handleDelete = (bannerId: string) => {
    setSelectedBannerId(bannerId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedBannerId) {
      try {
        await axios.delete(`/api/admin/banner?bannerId=${selectedBannerId}`, {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        });
        setList(list.filter(item => item.bannerId !== selectedBannerId));
        setIsAlertModalOpen(true); // 알림 모달 열기
      } catch (error) {
        console.error("배너 삭제 오류: ", error);
      } finally {
        setIsConfirmModalOpen(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false);
  };

  const handleAlertClose = () => {
    setIsAlertModalOpen(false);
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
          <div className="banner-notice">
            <h2>배너는 최대 5개까지 등록 가능합니다.</h2>
            <h2>이미지는 실제 보이는 크기입니다.</h2>
          </div>
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
      <CheckModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="정말로 이 배너를 삭제하시겠습니까?"
      />
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={handleAlertClose} // 확인 버튼 클릭 시 모달 닫기
        message="배너가 삭제되었습니다."
      />
    </GlampingKingStyle>
  );
};

export default AdminBanner;
