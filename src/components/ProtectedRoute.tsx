import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  ceoRoleState,
  isCeoLoginState,
  isLoginState,
  userRoleState,
} from "../atoms/loginState";
interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const userRole = useRecoilValue(userRoleState);
  const isLogin = useRecoilValue(isLoginState);
  const ceoRole = useRecoilValue(ceoRoleState);
  const isCeoLogin = useRecoilValue(isCeoLoginState);

  // 기본 로그인 상태와 역할 확인
  const isUserAuthorized = isLogin && allowedRoles.includes(userRole || "");
  // console.log("유저 권한 확인:", isUserAuthorized);
  // CEO 로그인 상태와 역할 확인
  const isCeoAuthorized = isCeoLogin && allowedRoles.includes(ceoRole || "");
  // console.log("사장님 권한 확인:", isCeoAuthorized);

  if (isUserAuthorized || isCeoAuthorized) {
    return <>{children}</>;
  }

  return <Navigate to="/" replace />;
};
export default ProtectedRoute;
