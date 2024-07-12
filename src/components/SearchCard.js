import styled from "@emotion/styled";

import { colorSystem, size } from "../styles/color";
import SearchImage from "../images/search-pic1.png";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MainButton } from "./common/Button";
import { Link } from "react-router-dom";

const SearchContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 950px;
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
    max-width: 400px;
    width: 100%;
    height: 240px;
    /* background: url(${SearchImage}) no-repeat center; */
    margin-left: 15px;
    border-radius: 20px;
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
        .sc-review-top {
          display: flex;
          svg {
            margin: 0 5px;
            color: #ffd233;
          }
          .sc-score {
            margin-right: 15px;
          }
        }
        .sc-review-bottom {
          .sc-count {
          }
        }
        ${size.mid} {
          flex-direction: column;
          gap: 5px;
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

  @media all and (max-width: 950px) {
    max-width: 950px;
    width: 100%;

    .search-image {
      min-width: 240px;
      background-size: cover;
      border-radius: 15px;
    }
    .search-detail {
      gap: 30px;
    }
  }
`;

const SearchCard = ({
  glampId,
  glampName,
  glampPic,
  starPoint,
  reviewCount,
  price,
}) => {
  const handleButtonClick = () => {
    console.log("예약하기");
  };
  const [roomMainImage, setRoomMainImage] = useState(null);
  useEffect(() => {
    setRoomMainImage("pic/glamping/1/glamp/glamping1.jpg");
  }, []);

  return (
    <SearchContent key={glampId}>
      {/* <div className="search-image"></div> */}
      <div
        className="search-image"
        style={{
          background: `url(${roomMainImage}) no-repeat center`,
          backgroundSize: "cover",
        }}
      />
      <div className="search-detail">
        <div className="sc-top">
          <div className="sc-name">{glampName}</div>
          <div className="sc-review">
            <div className="sc-review-top">
              <FaStar />
              <div className="sc-score">{starPoint}</div>
            </div>
            <div className="sc-review-bottom">
              <div className="sc-count">{reviewCount} 개 리뷰</div>
            </div>
          </div>
        </div>
        <div className="sc-bottom">
          <div className="sc-price">{price}원 ~</div>
          <Link to="/glampingdetail">
            <MainButton onClick={handleButtonClick} label="예약하기" />{" "}
          </Link>
        </div>
      </div>
    </SearchContent>
  );
};

export default SearchCard;
