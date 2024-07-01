import styled from "@emotion/styled";
import React from "react";

const WrapStyle = styled.div``;

// 상단 검색 결과 항목
const SearchTop = styled.div``;

const SearchPage = () => {
  return (
    <WrapStyle>
      <header class="header"></header>
      <main>
        <div class="search-wrap">
          <div class="search-top">검색 항목</div>
          <div class="inner search-inner">
            <div class="search-inner-top">
              <div class="search-it-filter">필터 항목 (5개)</div>
              <div class="search-it-menu">
                <div class="search-it-aline">
                  <select name="aline" id="aline">
                    <option value="star">평점 높은순</option>
                    <option value="review">리뷰 많은순</option>
                    <option value="highprice">높은 가격순</option>
                    <option value="lowprice">낮은 가격순</option>
                  </select>
                </div>
                <div class="search-it-result">검색 결과</div>
              </div>
            </div>
            <div class="search-inner-list">
              <div class="search-il-content"></div>
              <div class="search-il-content"></div>
              <div class="search-il-content"></div>
              <div class="search-il-content"></div>
              <div class="search-il-content"></div>
            </div>
            <div class="search-inner-bottom">페이지</div>
          </div>
        </div>
      </main>
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
              예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게
              있습니다.
              <br />
              <br />
              Copyright © 2024 GLAMPICK Co. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </WrapStyle>
  );
};

export default SearchPage;
