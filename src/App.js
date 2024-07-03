import React from "react";
import "./App.css";
import "../src/styles/reset.css";
import "../src/styles/common.css";
import "../src/styles/color";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import BookingDetail from "./pages/mypage/BookingDetail";
import Favorite from "./pages/mypage/Favorite";
import MyReview from "./pages/mypage/MyReview";
import UserInfo from "./pages/mypage/UserInfo";
import GlampingDetail from "./pages/GlampingDetail";
import RoomDetail from "./pages/RoomDetail";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import SearchPage from "./pages/SearchPage";
import NotfoundPage from "./pages/NotfoundPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header>글램픽 glampick</Header>
        <Routes>
          <Route path="/" element={<MainPage></MainPage>}></Route>
          <Route
            path="/glampingdetail"
            element={<GlampingDetail></GlampingDetail>}
          ></Route>

          <Route path="/roomdetail" element={<RoomDetail></RoomDetail>}></Route>

          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/signup" element={<SignupPage></SignupPage>}></Route>
          <Route path="/bookingdetail" element={<BookingDetail />} />
          <Route path="/myreview" element={<MyReview />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/*" element={<NotfoundPage />} />
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
