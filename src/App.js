import { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import "./styles/color";
import "../src/styles/common.css";
import "../src/styles/reset.css";
import "./App.css";
import {
  accessTokenState,
  ceoRoleState,
  isCeoLoginState,
  isLoginState,
  userRoleState,
} from "./atoms/loginState";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import GlampingDetail from "./pages/GlampingDetail";
import MainPage from "./pages/MainPage";
import NotfoundPage from "./pages/NotfoundPage";
import PaymentDone from "./pages/PaymentDone";
import PaymentPage from "./pages/PaymentPage";
import Review from "./pages/Review";
import RoomDetail from "./pages/RoomDetail";
import SearchPage from "./pages/SearchPage";
import AdminExit from "./pages/admin/AdminExit";
import AdminStore from "./pages/admin/AdminStore";
import GlampingKing from "./pages/admin/GlampingKing";
import CeoBooking from "./pages/ceo/CeoBooking";
import CeoGlamping from "./pages/ceo/CeoGlamping";
import CeoInfo from "./pages/ceo/CeoInfo";
import CeoReview from "./pages/ceo/CeoReview";
import CeoRoom from "./pages/ceo/CeoRoom";
import CeoRooms from "./pages/ceo/CeoRooms";
import Chart from "./pages/ceo/Chart";
import BookingDetail from "./pages/mypage/BookingDetail";
import Favorite from "./pages/mypage/Favorite";
import MyReview from "./pages/mypage/MyReview";
import UserInfo from "./pages/mypage/UserInfo";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import SnsSignupPage from "./pages/user/SnsSignUpPage";
import CeoSignup from "./pages/ceo/CeoSignup";
import CeoLogin from "./pages/ceo/CeoLogin";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminBanner from "./pages/admin/AdminBanner";
import { postSignOut } from "./apis/userapi";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // user
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [userRole, setUserRole] = useRecoilState(userRoleState);
  // ceo
  const [isCeoLogin, setIsCeoLogin] = useRecoilState(isCeoLoginState);
  const [ceoRole, setCeoRole] = useRecoilState(ceoRoleState);

  const locationNow = useLocation();
  const navigate = useNavigate();

  // 숫자가 아닌 경우 NotfoundPage를 렌더링하는 컴포넌트
  const GlampingDetailWrapper = ({ isLogin }) => {
    const { glampId } = useParams();
    if (!/^\d+$/.test(glampId)) {
      return <NotfoundPage />;
    }
    return <GlampingDetail isLogin={isLogin} />;
  };

  // 페이지 이동할 때마다 로그인 및 사용자 유형 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole");
    const ceoAccessToken = localStorage.getItem("ceoAccessToken");
    const ceoRole = localStorage.getItem("ownerRole");

    // 상태를 업데이트하기 전에 로컬스토리지의 값을 로그로 확인
    console.log("현재 role:", role);
    console.log("현재 ceoRole:", ceoRole);

    if (accessToken) {
      // 일반 사용자 로그인
      setIsLogin(true);
      setUserRole(role || null);
      setIsCeoLogin(false); // 사장님이 로그인 상태가 아님
      setCeoRole(null);
    } else if (ceoAccessToken) {
      // 사장님 로그인
      setIsLogin(false); // 유저가 로그인 상태가 아님
      setUserRole(null);
      setIsCeoLogin(true);
      setCeoRole(ceoRole || null);
    } else {
      setIsLogin(false);
      setUserRole(null);
      setIsCeoLogin(false);
      setCeoRole(null);
    }
  }, [locationNow]);

  // 로그아웃
  const handleLogout = async () => {
    await postSignOut();
    // 로컬스토리지에서 토큰 및 role삭제
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("ceoAccessToken");
    localStorage.removeItem("ownerRole");
    // 상태 업데이트
    setIsLogin(false);
    setUserRole(null);
    setIsCeoLogin(false);
    setCeoRole(null);
    // 페이지 이동
    navigate("/login");
  };

  // 로그인된 상태에서 로그인 및 회원가입 페이지로 접근 시 리다이렉트 처리
  const RedirectIfLoggedIn = ({ children, forUser }) => {
    const location = useLocation();
    if (isLogin || isCeoLogin) {
      if ((isLogin && forUser) || (isCeoLogin && !forUser)) {
        return <Navigate to="/" state={{ from: location }} />;
      }
    }
    return children;
  };

  return (
    <div>
      <Header
        isLogin={isLogin}
        isCeoLogin={isCeoLogin}
        handleLogout={handleLogout}
      />
      <Routes>
        {/* 메인 */}
        <Route
          path="/"
          element={
            <MainPage
              isLogin={isLogin}
              isCeoLogin={isCeoLogin}
              handleLogout={handleLogout}
            />
          }
        ></Route>

        {/* 사용자 로그인, 회원가입 */}
        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn forUser={true}>
              <LoginPage />
            </RedirectIfLoggedIn>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <RedirectIfLoggedIn forUser={true}>
              <SignupPage />
            </RedirectIfLoggedIn>
          }
        ></Route>
        <Route
          path="/sns-signup"
          element={
            <RedirectIfLoggedIn forUser={true}>
              <SnsSignupPage />
            </RedirectIfLoggedIn>
          }
        ></Route>

        {/* 검색 결과 */}
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/places/:glampId"
          element={<GlampingDetailWrapper isLogin={isLogin} />}
        />
        <Route path="/roomdetail/:glampId" element={<RoomDetail />}></Route>
        <Route path="/review/:glampId" element={<Review />}></Route>

        {/* 결제 페이지 */}
        <Route path="/payment/:glampId" element={<PaymentPage />} />
        {/* <Route path="/payment" element={<PaymentPage />}></Route> */}
        <Route path="/paymentcompleted" element={<PaymentDone />}></Route>

        {/* 유저 페이지 */}
        <Route
          path="/bookingdetail"
          element={
            <ProtectedRoute allowedRoles={[`ROLE_USER`]}>
              <BookingDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myreview"
          element={
            <ProtectedRoute allowedRoles={[`ROLE_USER`]}>
              <MyReview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorite"
          element={
            <ProtectedRoute allowedRoles={[`ROLE_USER`]}>
              <Favorite />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userinfo"
          element={
            <ProtectedRoute allowedRoles={[`ROLE_USER`]}>
              <UserInfo />
            </ProtectedRoute>
          }
        />

        {/* 사장님 로그인, 회원가입 */}
        <Route
          path="/ceosignup"
          element={
            <RedirectIfLoggedIn forUser={false}>
              <CeoSignup />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/ceologin"
          element={
            <RedirectIfLoggedIn forUser={false}>
              <CeoLogin />
            </RedirectIfLoggedIn>
          }
        />

        {/* 사장님 페이지 */}
        <Route path="/ceoglamping" element={<CeoGlamping />} />
        <Route path="/ceoroom" element={<CeoRoom />} />
        <Route path="/ceorooms" element={<CeoRooms />} />
        <Route path="/ceobooking" element={<CeoBooking />} />
        <Route path="/ceoreview" element={<CeoReview />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/ceoinfo" element={<CeoInfo />} />

        {/* 관리자 페이지 */}
        <Route path="/glampingking" element={<GlampingKing />} />
        <Route path="/adminstore" element={<AdminStore />} />
        <Route path="/adminsignup" element={<AdminSignup />} />
        <Route path="/adminexit" element={<AdminExit />} />
        <Route path="/adminbanner" element={<AdminBanner />} />

        {/* 잘못된 경로 */}
        <Route path="/*" element={<NotfoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
