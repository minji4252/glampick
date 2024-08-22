import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import glampickLogo from "../../images/glampick_logo.png";
import headerUser from "../../images/icon/member-icon.png";
import "../../styles/header.css";

interface HeaderProps {
  isLogin: boolean;
  isCeoLogin: boolean;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isLogin,
  isCeoLogin,
  handleLogout,
}) => {
  const locationNow = useLocation();

  // 메인, 관리자 페이지 header 숨김
  if (
    locationNow.pathname === "/" ||
    locationNow.pathname === "/glampingking" ||
    locationNow.pathname === "/adminbanner" ||
    locationNow.pathname === "/adminsignup" ||
    locationNow.pathname === "/adminexit" ||
    locationNow.pathname === "/adminstore"
  ) {
    return null;
  }

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
          {isLogin || isCeoLogin ? (
            <>
              <button
                className="header-logout"
                onClick={() => {
                  handleLogout();
                }}
              >
                <p>로그아웃</p>
              </button>
              <div className="header-user">
                <Link
                  to={isCeoLogin ? "/ceoglamping" : "/bookingdetail"}
                  className="header-user-nav"
                >
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
