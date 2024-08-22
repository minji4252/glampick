import styled from "@emotion/styled";
import { IoIosArrowForward } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { colorSystem } from "../../styles/color";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../atoms/loginState";
const CategoriesStyle = styled.div`
  position: fixed;
  top: 180px;
  left: 90px;
  max-width: 270px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  > div {
    cursor: default;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-use-select: none;
    user-select: none;
  }
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 4px;
  }
  h2 {
    font-size: 1rem;
    color: ${colorSystem.g400};
  }
  @media all and (max-width: 1910px) {
    position: relative;
    top: 70px;
    left: 90px;
  }
  .admin-nav {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    button {
      width: 100%;
      padding: 10px;
      font-size: 17px;
      font-weight: 500;
      background: ${colorSystem.white};
      border: 2px solid ${colorSystem.admin};
      border-radius: 20px;
      cursor: pointer;
      &:hover {
        background-color: ${colorSystem.admin};
        color: ${colorSystem.white};
        transition: all 0.2s;
      }
    }
  }
`;
const NavLinkStyle = styled(NavLink)`
  width: 200px;
  background-color: ${colorSystem.white};
  padding: 10px;
  font-size: 1.1rem;
  white-space: pre;
  /* padding-bottom: 0.25rem; */
  font-weight: 700;
  color: ${colorSystem.g900};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 30px;
  margin-bottom: 5px;
  span {
    height: 20px;
  }
  &:hover {
    color: ${colorSystem.admin};
  }
  &.active {
    color: ${colorSystem.g900};
    background-color: ${colorSystem.admin3};
    font-weight: 700;
    span {
    }
  }
  > svg {
  }
`;
const UnderLine = styled.div`
  border-bottom: 2px solid ${colorSystem.g300};
  margin: 30px 0;
`;
const categories = [
  { name: "adminstore", text: "입점 승인" },
  { name: "adminsignup", text: "가입 관리" },
  { name: "adminexit", text: "탈퇴 관리" },
  { name: "adminbanner", text: "배너 관리" },
];
const AdminCategories = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const navigate = useNavigate();
  const handleLogout = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <CategoriesStyle>
      <div className="admin-nav">
        <button onClick={handleLogout}>관리자 로그아웃</button>
      </div>
      <UnderLine />
      {categories.map(categoty => (
        <NavLinkStyle key={categoty.name} to={`/${categoty.name}`}>
          <span>{categoty.text}</span> <IoIosArrowForward />
        </NavLinkStyle>
      ))}
    </CategoriesStyle>
  );
};
export default AdminCategories;
