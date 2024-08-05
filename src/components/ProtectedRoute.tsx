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

  // console.log("User Role:", userRole);
  // console.log("Is Login:", isLogin);
  // console.log("CEO Access Token:", ceoRoleState);
  // console.log("CEO Role from Storage:", isCeoLoginState);

  if (!isLogin || !userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // 유저 및 사장님 각각의 로그인 상태와 역할 확인
  // if (isLogin && allowedRoles.includes(userRole || "")) {
  //   return <>{children}</>;
  // }

  // if (isCeoLogin && allowedRoles.includes(ceoRole || "")) {
  //   return <>{children}</>;
  // }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
