import React from "react";
import { AdminHeader } from "../../styles/AdminStyle";
import AdminCategories from "../../components/mypage/AdminCategories";

const GlampingKing = () => {
  return (
    <GlampingKing>
      <AdminHeader>글램픽 관리자 페이지</AdminHeader>
      <AdminCategories />
      <div className="inner"></div>
    </GlampingKing>
  );
};

export default GlampingKing;
