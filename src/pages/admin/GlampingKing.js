import React, { useEffect, useState } from "react";
import {
  AdminHeader,
  AdminLogin,
  GlampingKingStyle,
} from "../../styles/AdminStyle";
import { AdminButton } from "../../components/common/Button";
import { useRecoilState } from "recoil";
import {
  adminAccessTokenState,
  adminIdState,
  adminPwState,
} from "../../atoms/loginState";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { postAdminSignin } from "../../apis/adminapi";
import Loading from "../../components/common/Loading";

const GlampingKing = () => {
  const [accessToken, setAccessToken] = useRecoilState(adminAccessTokenState);
  const [adminId, setAdminId] = useRecoilState(adminIdState);
  const [adminPw, setAdminPw] = useRecoilState(adminPwState);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // 로그인시 처리할 함수
  const handleAdminLogin = async e => {
    setLoading(true);
    e.preventDefault();
    if (!adminId || !adminPw) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    try {
      const result = await postAdminSignin({ adminId, adminPw });
      if (result.code === "SU") {
        console.log(result);

        localStorage.setItem("accessToken", result.accessToken);
        setAccessToken(result.accessToken);
        setLoading(false);
        setTimeout(() => {
          if (location.state && location.state.fromSignup) {
            navigate("/adminstore");
          } else {
            navigate("/adminstore");
          }
        }, 1000);
      } else {
        setErrorMessage("아이디와 비밀번호 불일치");
      }
    } catch (error) {
      setErrorMessage("로그인 실패");
    }
  };

  return (
    <GlampingKingStyle>
      {loading && <Loading />}
      <AdminHeader>관리자 페이지 로그인</AdminHeader>

      <div className="inner">
        <AdminLogin>
          <form
            className="login-form"
            onSubmit={e => {
              handleAdminLogin(e);
            }}
          >
            <label htmlFor="id">아이디</label>
            <input
              type="text"
              id="id"
              name="id"
              value={adminId}
              placeholder=""
              onChange={e => {
                setAdminId(e.target.value);
              }}
            />
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={adminPw}
              placeholder=""
              onChange={e => {
                setAdminPw(e.target.value);
              }}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="login-btn">
              <AdminButton type="submit" label="로그인" />
            </div>
            <div className="admin-home">
              <Link to="/">
                <p>글램픽 홈으로</p>
              </Link>
            </div>
          </form>
        </AdminLogin>
      </div>
    </GlampingKingStyle>
  );
};

export default GlampingKing;
