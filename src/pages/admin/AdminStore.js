import React from "react";
import { AdminHeader, GlampingKingStyle } from "../../styles/AdminStyle";
import AdminCategories from "../../components/mypage/AdminCategories";

const AdminStore = () => {
  return (
    <GlampingKingStyle>
      <AdminHeader>글램픽 관리자 페이지</AdminHeader>
      <AdminCategories />
      <div className="inner">
        <h3>글램핑장 입점 승인</h3>
      </div>
    </GlampingKingStyle>
  );
};

export default AdminStore;
