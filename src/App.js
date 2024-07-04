import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/styles/color";
import "../src/styles/common.css";
import "../src/styles/reset.css";
import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import GlampingDetail from "./pages/GlampingDetail";
import MainPage from "./pages/MainPage";
import NotfoundPage from "./pages/NotfoundPage";
import PaymentPage from "./pages/PaymentPage";
import RoomDetail from "./pages/RoomDetail";
import SearchPage from "./pages/SearchPage";
import BookingDetail from "./pages/mypage/BookingDetail";
import Favorite from "./pages/mypage/Favorite";
import MyReview from "./pages/mypage/MyReview";
import UserInfo from "./pages/mypage/UserInfo";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import SnsSignupPage from "./pages/user/SnsSignUpPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header>글램픽 glampick</Header>
        <Routes>
          {/* 메인 */}
          <Route path="/" element={<MainPage></MainPage>}></Route>
          {/* 로그인, 회원가입 */}
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/signup" element={<SignupPage></SignupPage>}></Route>
          <Route
            path="/sns-signup"
            element={<SnsSignupPage></SnsSignupPage>}
          ></Route>

          <Route path="/search" element={<SearchPage></SearchPage>} />
          <Route
            path="/glampingdetail"
            element={<GlampingDetail></GlampingDetail>}
          ></Route>

          <Route path="/roomdetail" element={<RoomDetail></RoomDetail>}></Route>

          {/* 결제 */}
          <Route path="/payment" element={<PaymentPage></PaymentPage>}></Route>

          {/* 유저 페이지 */}
          <Route path="/bookingdetail" element={<BookingDetail />} />
          <Route path="/myreview" element={<MyReview />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/userinfo" element={<UserInfo />} />

          {/* 잘못된 경로 */}
          <Route path="/*" element={<NotfoundPage />} />
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
