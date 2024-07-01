import React from "react";
import "./App.css";
import GlampingDetail from "./임시/GlampingDetail";
import "../src/styles/reset.css";
import "../src/styles/common.css";
import "../src/styles/color";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import RoomDetail from "./임시/GlampingDetail";
import BookingDetail from "./pages/mypage/BookingDetail";
import Favorite from "./pages/mypage/Favorite";
import MyReview from "./pages/mypage/MyReview";
import UserInfo from "./pages/mypage/UserInfo";

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
          <Route path="/bookingdetail" element={<BookingDetail />} />
          <Route path="/myreview" element={<MyReview />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/userinfo" element={<UserInfo />} />
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
