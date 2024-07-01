import React from "react";
import Footer from "../../components/layout/Footer";

const LoginPage = () => {
  return (
    <div className="wrap">
      <header className="header"></header>

      <main>
        <div className="inner">
          <div className="container">
            <div className="glampik_logo">
              <img
                src="./images/glampick_logo.png"
                alt="글램픽로고"
                className="glampick_img"
              />
            </div>
            <h2>로그인</h2>
            <div className="wrap">
              <form className="login-form">
                <label for="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="glampick@good.kr"
                />
                <label for="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="비밀번호를 입력하세요"
                />
                <p className="error-message">
                  아이디나 비밀번호가 일치하지 않습니다.
                </p>
                <button type="submit">로그인</button>
              </form>
              <div className="signup">
                <a href="#">
                  <p>회원가입</p>
                </a>
              </div>
              <div className="sns-login">
                <p>sns 로그인</p>
                <ul className="sns-login-list">
                  <li className="sns-login-item">
                    <a href="#" className="sns-login-link">
                      <img src="./images/btn_kakao.svg" alt="카카오로그인" />
                    </a>
                  </li>
                  <li className="sns-login-item">
                    <a href="#" className="sns-login-link">
                      <img src="./images/btn_naver.png" alt="네이버로그인" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
