import { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
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
import CeoRooms from "./pages/ceo/CeoRooms";
import CeoRoom from "./pages/ceo/CeoRoom";
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
import { GlampingProvider } from "./contexts/GlampingContext";

function App() {
  // user
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [userRole, setUserRole] = useRecoilState(userRoleState);
  // ceo
  const [isCeoLogin, setIsCeoLogin] = useRecoilState(isCeoLoginState);
  const [ceoRole, setCeoRole] = useRecoilState(ceoRoleState);
  const navigate = useNavigate();
  // 페이지 이동할 때마다 로그인 및 사용자 유형 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole");
    const ceoAccessToken = localStorage.getItem("ceoAccessToken");
    const ceoRole = localStorage.getItem("ownerRole");
    // 상태를 업데이트하기 전에 로컬스토리지의 값을 로그로 확인
    // console.log("현재 role:", role);
    // console.log("현재 ceoRole:", ceoRole);
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
  }, [navigate]);
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
  const RedirectIfLoggedIn = ({ children, forUser }) => {
    const location = useLocation();
    const isLogin = useRecoilValue(isLoginState);
    const isCeoLogin = useRecoilValue(isCeoLoginState);
    const userPages = ["/bookingdetail", "/myreview", "/favorite", "/userinfo"];
    const ceoPages = [
      "/ceoglamping",
      "/ceorooms",
      "/ceobooking",
      "/ceoreview",
      "/chart",
      "/ceoinfo",
    ];


    const loginPages = ["/login", "/signup"];
    const ceoLoginPages = ["/ceologin", "/ceosignup"];
    // 로그인 상태에서 로그인 페이지 및 회원가입 페이지 접근 제어
    if (forUser && isLogin && loginPages.includes(location.pathname)) {
      return <Navigate to="/" replace />; // 아무 것도 렌더링하지 않아서 현재 페이지에 머물게 함
    }
    if (!forUser && isCeoLogin && ceoLoginPages.includes(location.pathname)) {
      return <Navigate to="/" replace />; // 아무 것도 렌더링하지 않아서 현재 페이지에 머물게 함
    }
    // 현재 페이지가 사용자 페이지인지 사장님 페이지인지 확인
    const isUserPage = userPages.some(page =>
      location.pathname.startsWith(page),
    );
    const isCeoPage = ceoPages.some(page => location.pathname.startsWith(page));
    // 로그인 상태에 따라 리다이렉트 처리
    if (isLogin && !forUser && isCeoPage) {
      // 사장님 페이지에 접근하려는 일반 사용자
      return <Navigate to="/" replace />;
    }
    if (isCeoLogin && forUser && isUserPage) {
      // 사용자 페이지에 접근하려는 사장님
      return <Navigate to="/" replace />;
    }
    return children;
  };
  return (
    <div>
      <GlampingProvider>
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
            element={
              <GlampingDetail isLogin={isLogin} isCeoLogin={isCeoLogin} />
            }
          />
          <Route path="/roomdetail/:glampId" element={<RoomDetail />}></Route>
          <Route path="/review/:glampId" element={<Review />}></Route>

          {/* 결제 페이지 */}
          <Route path="/payment/:glampId" element={<PaymentPage />} />
          <Route path="/paymentcompleted" element={<PaymentDone />}></Route>

          {/* 유저 페이지 */}
          <Route
            path="/bookingdetail"
            element={
              <RedirectIfLoggedIn forUser={true}>
                <ProtectedRoute allowedRoles={["ROLE_USER"]} isCeoPage={false}>
                  <BookingDetail />
                </ProtectedRoute>
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/myreview"
            element={
              <RedirectIfLoggedIn forUser={true}>
                <ProtectedRoute allowedRoles={["ROLE_USER"]} isCeoPage={false}>
                  <MyReview />
                </ProtectedRoute>
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/favorite"
            element={
              <RedirectIfLoggedIn forUser={true}>
                <ProtectedRoute allowedRoles={["ROLE_USER"]} isCeoPage={false}>
                  <Favorite />
                </ProtectedRoute>
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/userinfo"
            element={
              <RedirectIfLoggedIn forUser={true}>
                <ProtectedRoute allowedRoles={["ROLE_USER"]} isCeoPage={false}>
                  <UserInfo />
                </ProtectedRoute>
              </RedirectIfLoggedIn>
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
          <Route
            path="/ceoglamping"
            element={
              <RedirectIfLoggedIn forUser={false}>
                <ProtectedRoute allowedRoles={["ROLE_OWNER"]} isCeoPage={true}>
                  <CeoGlamping />
                </ProtectedRoute>
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/ceorooms"
            element={
              <RedirectIfLoggedIn forUser={false}>
                <ProtectedRoute allowedRoles={["ROLE_OWNER"]} isCeoPage={true}>
                  <CeoRooms />
                </ProtectedRoute>
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/ceoroom/new"
            element={
              <RedirectIfLoggedIn forUser={false}>
                <ProtectedRoute allowedRoles={["ROLE_OWNER"]} isCeoPage={true}>
                  <CeoRoom />
                </ProtectedRoute>
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/ceoroom/edit/:roomId"
            element={
              <RedirectIfLoggedIn forUser={false}>
                <ProtectedRoute allowedRoles={["ROLE_OWNER"]} isCeoPage={true}>
                  <CeoRoom />
                </ProtectedRoute>
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/ceobooking"
            element={
              <RedirectIfLoggedIn forUser={false}>
                <ProtectedRoute allowedRoles={["ROLE_OWNER"]} isCeoPage={true}>
                  <CeoBooking />
                </ProtectedRoute>
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/ceoreview"
            element={
              <RedirectIfLoggedIn forUser={false}>
                <ProtectedRoute allowedRoles={["ROLE_OWNER"]} isCeoPage={true}>
                  <CeoReview />
                </ProtectedRoute>
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/chart"
            element={
              <RedirectIfLoggedIn forUser={false}>
                <ProtectedRoute allowedRoles={["ROLE_OWNER"]} isCeoPage={true}>
                  <Chart />
                </ProtectedRoute>
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/ceoinfo"
            element={
              <RedirectIfLoggedIn forUser={false}>
                <ProtectedRoute allowedRoles={["ROLE_OWNER"]} isCeoPage={true}>
                  <CeoInfo />
                </ProtectedRoute>
              </RedirectIfLoggedIn>
            }
          />

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
      </GlampingProvider>
    </div>
  );
}
export default App;
