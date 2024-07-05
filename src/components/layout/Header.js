import React, { useState } from "react";
import "../../styles/header.css";
import { Link, useLocation } from "react-router-dom";
import headerUser from "../../images/icon/member-icon.png";
import glampickLogo from "../../images/glampick_logo.png";

const Header = ({ isLogin }) => {
  // const [isLogin, setIsLogin] = useState(false);
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
          {isLogin ? (
            <>
              <button className="header-logout">
                <Link to="/">
                  <p>로그아웃</p>
                </Link>
              </button>
              <div className="header-user">
                <Link to="/bookingdetail" className="header-user-nav">
                  <img
                    src={headerUser}
                    alt="헤더 유저 아이콘"
                    className="header-user-icon"
                  />
                </Link>
              </div>
            </>
          ) : (
            <button className="header-login">
              <Link to="/login">
                <p>로그인/회원가입</p>
              </Link>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
