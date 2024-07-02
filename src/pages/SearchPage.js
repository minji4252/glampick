import styled from "@emotion/styled";
import "../styles/common.css";
import "../styles/reset.css";
import React from "react";
import { colorSystem } from "../styles/color";
import SearchImage from "../images/search-pic1.png";
import { FaStar } from "react-icons/fa";

const WrapStyle = styled.div`
  position: relative;
`;
const SearchInner = styled.div`
  width: calc(100% - 30px);
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px auto;

  background: aquamarine;
  padding: 90px 0 250px 0;
  flex-direction: column;
`;

// 상단 검색 결과 항목
const SearchTop = styled.div`
  width: 100%;
  height: 90px;
  margin-top: 80px;
  background: #eaeff6;
  display: flex;
  justify-content: center;
`;

const SearchInnerTop = styled.div`
  width: 1080px;
  height: 105px;
  background: plum;
  align-content: flex-end;
`;

// 상단 필터 항목
const SearchFilter = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SearchMenu = styled.div`
  padding: 0 20px;
  margin: 10px 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  // 정렬
  .search-aline {
    > select {
      border: none;
      font-family: "Pretendard Variable";
      background: rgba(255, 255, 255, 0);
      font-size: 16px;
      color: ${colorSystem.p900};
      text-align: center;
      outline: none;

      > option {
        color: ${colorSystem.primary};
      }
    }
  }
  // 검색 결과
  .search-result {
    font-size: 14px;
  }
`;

const SearchInnerList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 1080px;
  padding: 40px 0;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

const SearchContent = styled.div`
  display: flex;
  width: 950px;
  height: 240px;
  background: seagreen;
  margin-bottom: 40px;
  border-bottom: 1px solid #4f565f;
  :last-child {
    margin-bottom: 0px;
    border-bottom: none;
  }
  .search-image {
    width: 400px;
    height: 240px;
    background: url(${SearchImage}) no-repeat center;
  }
  .search-detail {
    width: 550px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 40px 10px 50px;

    .sc-top {
      .sc-name {
        font-size: 22px;
        margin-bottom: 10px;
        font-weight: 600;
      }
      .sc-review {
        display: flex;
        font-size: 15px;
        svg {
          margin: 0 5px;
          color: #ffd233;
        }
        .sc-score {
          margin-right: 15px;
        }
        .sc-count {
        }
      }
      .sc-bottom {
        display: flex;
        justify-content: flex-end;
        /* align-self: flex-end; */
        .sc-price {
        }
        button {
        }
      }
    }
  }
`;

const SearchPage = () => {
  return (
    <WrapStyle>
      <main>
        <div className="search-wrap">
          <SearchTop>검색 항목</SearchTop>
          <SearchInner>
            <SearchInnerTop>
              <SearchFilter>필터 항목 (5개)</SearchFilter>
              <SearchMenu>
                <div className="search-aline">
                  <select name="aline" id="aline">
                    <option value="star">평점 높은순</option>
                    <option value="review">리뷰 많은순</option>
                    <option value="highprice">높은 가격순</option>
                    <option value="lowprice">낮은 가격순</option>
                  </select>
                </div>
                <div className="search-result">1,234 개 검색 결과</div>
              </SearchMenu>
            </SearchInnerTop>
            <SearchInnerList>
              <SearchContent>
                <div className="search-image"></div>
                <div className="search-detail">
                  <div className="sc-top">
                    <div className="sc-name">그린 파인트리글램핑&카라반</div>
                    <div className="sc-review">
                      <FaStar />
                      <div className="sc-score">4.6</div>
                      <div className="sc-count">1,234 개 리뷰</div>
                    </div>
                  </div>
                  <div className="sc-bottom">
                    <div className="sc-price">85,000원 ~</div>
                    <button>예약하기</button>
                  </div>
                </div>
              </SearchContent>
              <SearchContent></SearchContent>
              <SearchContent></SearchContent>
              <SearchContent></SearchContent>
              <SearchContent></SearchContent>
            </SearchInnerList>
            <div className="search-inner-bottom">페이지</div>
          </SearchInner>
        </div>
      </main>
    </WrapStyle>
  );
};

export default SearchPage;
