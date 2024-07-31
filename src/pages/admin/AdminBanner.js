import React from "react";
import { AdminHeader, GlampingKingStyle } from "../../styles/AdminStyle";
import AdminCategories from "../../components/mypage/AdminCategories";

const AdminBanner = () => {
  return (
    <GlampingKingStyle>
      <AdminHeader>글램픽 관리자 페이지</AdminHeader>
      <AdminCategories />
      <div className="inner">
        <h3>배너 관리</h3>
      </div>
    </GlampingKingStyle>
  );
};

export default AdminBanner;
