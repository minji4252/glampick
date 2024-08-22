import React from "react";
import "../../styles/common.css";
import "../../styles/reset.css";
import "../../styles/footer.css";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  // 관리자 페이지 footer 숨김
  const locationNow = useLocation();
  if (
    locationNow.pathname === "/glampingking" ||
    locationNow.pathname === "/adminbanner" ||
    locationNow.pathname === "/adminsignup" ||
    locationNow.pathname === "/adminexit" ||
    locationNow.pathname === "/adminstore"
  )
    return null;
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-contents">
            <ul className="footer-contents-title">
              고객센터
              <li>오전 9시 ~ 오후 6시</li>
            </ul>
            <ul className="footer-contents-title">
              회사
              <li>회사 소개</li>
            </ul>
            <ul className="footer-contents-title">
              서비스
              <li>공지사항</li>
              <li>자주 묻는 질문</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <ul className="footer-bottom-list">
            <li>
              <a
                href="https://lively-gladiolus-389.notion.site/f3d1bc647a744ffb9299d3bd979b15b9"
                target="_blank"
                rel="noopener noreferrer"
              >
                이용약관
              </a>
            </li>
            <li>
              <a
                href="https://lively-gladiolus-389.notion.site/8c8f5d4bb39e4d1498f7f7ee4df5c766"
                target="_blank"
                rel="noopener noreferrer"
              >
                개인정보처리방침
              </a>
            </li>
            <li>소비자 분쟁해결 기준</li>
            <li>콘텐츠산업진흥법에 의한 표시</li>
          </ul>
          <div className="footer-bottom-detail">
            <Link to="/glampingking">
              <h4>(주) 글램픽</h4>
            </Link>
            <p>
              주소 : 대구광역시 중구 중앙대로 394 제일빌딩 5F | 대표팀 : 4조 |
              사업자등록번호 : 110-11-11111
              <br />
              전자우편주소 : mj17428@glampick.com | 통신판매번호 :
              2024-대구중구-00000 | 대표번호 : 053-572-1005
              <br />
              (주) 글램픽은 통신판매중개자로서 통신판매의 당사자가 아니며,
              상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게
              있습니다.
              <br />
              <br />
              Copyright GLAMPICK COMPANY Corp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
