import React from "react";
import "../../styles/header.css";
import { Link, useLocation } from "react-router-dom";
import glampickLogo from "../../images/glampick_logo.png";
import glampickLogoMain from "../../images/glampick_logo_white.png";
const Header = () => {
  const locationNow = useLocation();
  // 메인 페이지 (Root)에서 Header 임시 숨김
  if (locationNow.pathname === "/") return null;
  return (
    <header className="header">
      <div className="nav-inner">
        <div className="header-logo">
          <Link to="/" className="header-logo-link">
            <img
              src={glampickLogo}
              alt="글램픽 로고"
              className="header-logo-img"
            />
          </Link>
        </div>
        <div className="header-nav">
          <button className="main-login">
            <Link to="/login">
              <p>로그인/회원가입</p>
            </Link>
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
