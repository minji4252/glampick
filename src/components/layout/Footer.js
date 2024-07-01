import React from "react";
import "../../styles/common.css";
import "../../styles/reset.css";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer class="footer">
      <div class="footer-inner">
        <ul class="footer-top">
          <li>고객센터</li>
          <li>이용약관</li>
          <li>개인정보처리방침</li>
          <li>이메일무단수집금지</li>
        </ul>
        <div class="footer-bottom">
          <p>
            대구광역시 중구 109-2 5층
            <br />
            대표자 조수현 | 1588-1588 | glamping@zzang.joa
            <br />
            사업자등록번호 : 053-08-00811 | 통신판매신고번호 : 2024-06-0624
            <br />
            (주)글램픽은 통신판매 중개자로서 통신판매의 당사자가 아니며 상품의
            예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.
            <br />
            <br />
            Copyright © 2024 GLAMPICK Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
