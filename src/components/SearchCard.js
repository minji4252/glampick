import styled from "@emotion/styled";

import { colorSystem } from "../styles/color";
import SearchImage from "../images/search-pic1.png";
import React from "react";
import { FaStar } from "react-icons/fa";
import { MainButton } from "./common/Button";

const SearchContent = styled.div`
  display: flex;
  width: 950px;
  height: 240px;
  padding: 40px 0;
  margin: 40px 0;
  border-top: 1px solid;
  border-color: ${colorSystem.g200};
  :last-child {
    border-bottom: none;
  }
  :first-child {
    border-top: none;
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
    }
    .sc-bottom {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      .sc-price {
        font-size: 17px;
        font-weight: 500;
      }
    }
  }
`;

const SearchCard = () => {
  return (
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
          <MainButton label="예약하기"></MainButton>
        </div>
      </div>
    </SearchContent>
  );
};

export default SearchCard;
