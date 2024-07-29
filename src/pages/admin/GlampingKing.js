import React from "react";
import {
  AdminHeader,
  AdminLogin,
  GlampingKingStyle,
} from "../../styles/AdminStyle";
import { AdminButton } from "../../components/common/Button";

const GlampingKing = () => {
  return (
    <GlampingKingStyle>
      <AdminHeader>관리자 페이지 로그인</AdminHeader>

      {/* <AdminCategories /> */}
      <div className="inner">
        <AdminLogin>
          <form
            className="login-form"
            // onSubmit={e => {
            //   handleLogin(e);
            // }}
          >
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              // value={userEmail}
              placeholder="glampick@good.kr"
              // onChange={e => {
              //   setUserEmail(e.target.value);
              // }}
            />
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              // value={userPw}
              placeholder="비밀번호를 입력하세요"
              // onChange={e => {
              //   setUserPw(e.target.value);
              // }}
            />
            {/* <p className="error-message">{errorMessage}</p> */}
            <div className="login-btn">
              <AdminButton label="로그인" />
            </div>
          </form>
        </AdminLogin>
      </div>
    </GlampingKingStyle>
  );
};

export default GlampingKing;
