import React from "react";
import { colorSystem } from "../styles/color";
import styled from "@emotion/styled";
import ReviewCard from "../components/ReviewCard";
import { FaStar } from "react-icons/fa";

const WrapStyle = styled.div`
  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h3 {
    width: 100%;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
    text-align: center;
  }
`;

const TopContents = styled.div`
  width: 100%;
  height: 430px;
  border-bottom: 2px solid ${colorSystem.g200};

  > p {
    width: 100%;
    font-size: 1.1rem;
    margin: 5px 0;
  }

  .review-score {
    font-size: 1.3rem;
    display: flex;
    margin: 5px 0;
  }

  .star {
    color: ${colorSystem.star};
  }

  .review-img-txt {
    display: flex;
    justify-content: space-between;
  }
`;

const BottomContents = styled.div`
  width: 100%;
  height: 670px;
`;
const Review = () => {
  return (
    <WrapStyle>
      <div className="inner">
        <h3>후기</h3>
        <TopContents>
          <p>숙소평점</p>
          <div className="review-score">
            <FaStar className="star" />
            <div>4.7/5</div>
          </div>
          <div className="review-img-txt">
            <div>숙소 후기 사진</div>
            <div>더보기(22)</div>
          </div>
          <div className="review-img">
            <div className="review-img1"></div>
            <div className="review-img2"></div>
            <div className="review-img3"></div>
          </div>
        </TopContents>
        <BottomContents>
          <ReviewCard />
        </BottomContents>
      </div>
    </WrapStyle>
  );
};

export default Review;
