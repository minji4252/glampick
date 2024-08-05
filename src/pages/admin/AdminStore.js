import React, { useEffect, useState } from "react";
import { AdminHeader, GlampingKingStyle } from "../../styles/AdminStyle";
import AdminCategories from "../../components/mypage/AdminCategories";
import { adminAccessTokenState } from "../../atoms/loginState";
import { useRecoilState } from "recoil";
import AdminStoreCard from "../../components/admin/AdminStoreCard";
import { getAdminStoreList } from "../../apis/adminapi";

const AdminStore = () => {
  const [adminAccessToken, setAdminAccessToken] = useRecoilState(
    adminAccessTokenState,
  );
  const [storeList, setStoreList] = useState([]);

  // 토큰정보 불러오기
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
                glampName={item.glampName}
                ownerName={item.ownerName}
                businessNumber={item.businessNumber}
              />
            ))
          ) : (
            <p>승인 대기 중인 글램핑장이 없습니다.</p>
          )}
        </div>
      </div>
    </GlampingKingStyle>
  );
};

export default AdminStore;
