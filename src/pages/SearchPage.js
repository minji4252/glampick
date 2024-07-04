import React from "react";
import styled from "@emotion/styled";
import "../styles/common.css";
import "../styles/reset.css";
import { colorSystem } from "../styles/color";
import SearchCard from "../components/SearchCard";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import filterPet from "../images/icon/filter-pet.png";
import filterOcean from "../images/icon/filter-ocean.png";
import filterMountain from "../images/icon/filter-mountain.png";
import filterSwim from "../images/icon/filter-swim.png";
import filterToilet from "../images/icon/filter-toilet.png";
import filterWifi from "../images/icon/filter-wifi.png";
import filterBarbecue from "../images/icon/filter-barbecue.png";
import { Link } from "react-router-dom";

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

  padding: 90px 0 250px 0;
  flex-direction: column;
`;

const SearchTop = styled.div`
  width: 100%;
  height: 90px;
  margin-top: 80px;
  background: #eaeff6;
  display: flex;
  justify-content: center;
`;

const SearchResult = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  font-size: 16px;
`;

// 상단 검색 결과 항목
const ResultContents = styled.div`
  label {
    font-weight: 600;
    margin-right: 10px;
    padding-left: 20px;
    border-left: 1px solid ${colorSystem.g600};
    /* :first-child {
      border-left: none;
    } */
  }
  input {
    width: 80px;
    height: 25px;
    border: none;
    font-size: 16px;
    background: rgba(255, 255, 255, 0);
    color: ${colorSystem.g800};
    margin-left: 10px;
  }
`;

const SearchInnerTop = styled.div`
  width: 1080px;
  height: 105px;
  align-content: flex-end;
`;

// 상단 필터 항목
const SearchFilter = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  .search-filter {
    display: flex;
    background-size: auto;
    gap: 30px;
    > div {
      width: 65px;
      height: 55px;
    }
    .filter-pet {
      background: url(${filterPet}) no-repeat center;
    }
    .filter-ocean {
      background: url(${filterOcean}) no-repeat center;
    }
    .filter-mountain {
      background: url(${filterMountain}) no-repeat center;
    }
    .filter-swim {
      background: url(${filterSwim}) no-repeat center;
    }
    .filter-toilet {
      background: url(${filterToilet}) no-repeat center;
    }
    .filter-wifi {
      background: url(${filterWifi}) no-repeat center;
    }
    .filter-barbecue {
      background: url(${filterBarbecue}) no-repeat center;
    }
  }
`;

const SearchMenu = styled.div`
  padding: 0 20px;
  margin: 20px 0 5px;
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
  padding-bottom: 40px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

// 페이지
const SearchInnerBottom = styled.div`
  margin-top: 40px;
  .search-page {
    font-size: 18px;
    display: flex;
    gap: 40px;
  }
`;

const SearchPage = () => {
  return (
    <WrapStyle>
      <main>
        <div className="search-wrap">
          <SearchTop>
            <SearchResult>
              <ResultContents>
                <label htmlFor="place">지역</label>
                <input type="text" value={"서울/경기"}></input>
              </ResultContents>
              <ResultContents>
                <label htmlFor="date">날짜</label>
                <input type="text" value={""}></input>
              </ResultContents>
              <ResultContents>
                <label htmlFor="member">인원</label>
                <input type="text" value={"2명"}></input>
              </ResultContents>
              <ResultContents>
                <label htmlFor="input">검색어</label>
                <input type="text" value={"검색어"}></input>
              </ResultContents>
            </SearchResult>
          </SearchTop>
          <SearchInner>
            <SearchInnerTop>
              <SearchFilter>
                <div className="search-filter">
                  <div className="filter-pet" />
                  <div className="filter-ocean" />
                  <div className="filter-mountain" />
                  <div className="filter-swim" />
                  <div className="filter-toilet" />
                  <div className="filter-wifi" />
                  <div className="filter-barbecue" />
                </div>
              </SearchFilter>
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
              <SearchCard />
              <SearchCard />
              <SearchCard />
              <SearchCard />
              <SearchCard />
            </SearchInnerList>
            <SearchInnerBottom>
              <ul className="search-page">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <MdOutlineKeyboardArrowRight />
              </ul>
            </SearchInnerBottom>
          </SearchInner>
        </div>
      </main>
    </WrapStyle>
  );
};

export default SearchPage;
