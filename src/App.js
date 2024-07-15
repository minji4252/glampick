import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "../src/styles/color";
import "../src/styles/common.css";
import "../src/styles/reset.css";
import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import SnsSignupPage from "./pages/user/SnsSignUpPage";
import SearchPage from "./pages/SearchPage";
import GlampingDetail from "./pages/GlampingDetail";
import RoomDetail from "./pages/RoomDetail";
import Review from "./pages/Review";
import PaymentPage from "./pages/PaymentPage";
import PaymentDone from "./pages/PaymentDone";
import BookingDetail from "./pages/mypage/BookingDetail";
import MyReview from "./pages/mypage/MyReview";
import Favorite from "./pages/mypage/Favorite";
import UserInfo from "./pages/mypage/UserInfo";
import NotfoundPage from "./pages/NotfoundPage";
import { useEffect, useState } from "react";
import { getCookie, removeCookie } from "./utils/cookie";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const locationNow = useLocation();
  const navigate = useNavigate();

  // 페이지 이동할 때마다 로그인 화긴
  useEffect(() => {
    const accessToken = getCookie("access-Token");
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [locationNow]); // location 변경시마다

  // 로그아웃
  const handleLogout = () => {
    removeCookie("access-Token", { path: "/" });
    setIsLogin(false);
    navigate("/login");
  };

  return (
    <div>
      <Header isLogin={isLogin} handleLogout={handleLogout} />
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<MainPage isLogin={isLogin} />}></Route>

        {/* 로그인, 회원가입 */}
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/sns-signup" element={<SnsSignupPage />}></Route>

        {/* 검색 결과 */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/glampingdetail" element={<GlampingDetail />}></Route>
        <Route path="/roomdetail" element={<RoomDetail />}></Route>
        <Route path="/review" element={<Review />}></Route>

        {/* 결제 페이지 */}
        <Route path="/payment" element={<PaymentPage />}></Route>
        <Route path="/paymentcompleted" element={<PaymentDone />}></Route>
        {/* 
        <Route path="/payment" element={
          <PrivateRoute isLogin={isLogin}>
            <PaymentPage />
          </PrivateRoute>
          }
        /> */}

        {/* 유저 페이지 */}
        <Route path="/bookingdetail" element={<BookingDetail />} />
        <Route path="/myreview" element={<MyReview />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/userinfo" element={<UserInfo />} />

        {/* 잘못된 경로 */}
        <Route path="/*" element={<NotfoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
