import React from "react";
import { useRecoilValue } from "recoil";
import {
  ceoRoleState,
  isCeoLoginState,
  isLoginState,
  userRoleState,
} from "../atoms/loginState";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
  isCeoPage?: boolean; // 사장님 페이지 여부
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  isCeoPage,
}) => {
  const userRole = useRecoilValue(userRoleState);
  const isLogin = useRecoilValue(isLoginState);
  const ceoRole = useRecoilValue(ceoRoleState);
  const isCeoLogin = useRecoilValue(isCeoLoginState);

  // 기본 로그인 상태와 역할 확인
  const isUserAuthorized = isLogin && allowedRoles.includes(userRole || "");
  console.log("유저 권한 확인:", isUserAuthorized);
  // CEO 로그인 상태와 역할 확인
  const isCeoAuthorized = isCeoLogin && allowedRoles.includes(ceoRole || "");
  console.log("사장님 권한 확인:", isCeoAuthorized);

  // 사장님 페이지 접근 여부
  if (isCeoPage) {
    if (isCeoAuthorized) {
      return <>{children}</>;
    }
    // 권한이 없는 경우 아무것도 표시하지 않음
    return null;
  }

  // 사용자 페이지 접근 여부
  if (!isCeoPage) {
    if (isUserAuthorized) {
      return <>{children}</>;
    }
    return null;
  }

  return null;
};
export default ProtectedRoute;
