import React from "react";
import { colorSystem } from "../styles/color";
import styled from "@emotion/styled";
import reviewimg1 from "../images/review1.png";
import reviewimg2 from "../images/review2.png";
import reviewimg3 from "../images/review3.png";
import { FaStar } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";

const MyReviewCard = styled.div`
  display: flex;
  margin-bottom: 60px;

  .myreview-card-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 50px;

    div {
      background-color: pink;
      border-radius: 100%;
      width: 65px;
      height: 65px;
    }

    span {
      margin-top: 10px;
      font-weight: 600;
    }
  }
`;
const UserSection = styled.div`
  .myreview-title {
    display: flex;
    gap: 10px;

    > span {
      letter-spacing: 1.5px;
    }
  }
  .myreview-score {
    display: flex;
    gap: 3px;
    color: ${colorSystem.star};
  }

  .myreview-img {
    display: flex;
    gap: 15px;
    margin-top: 20px;

    > div {
      width: 180px;
      height: 200px;
      border-radius: 25px;
      background-size: cover;
    }
    .myreview-img1 {
      background: url(${reviewimg1}) no-repeat center;
    }
    .myreview-img2 {
      background: url(${reviewimg2}) no-repeat center;
    }
    .myreview-img3 {
      background: url(${reviewimg3}) no-repeat center;
    }
  }

  .myreview-content {
    margin-top: 30px;
    font-size: 1rem;

    > div {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    span {
      font-weight: 600;
    }

    svg {
      color: ${colorSystem.g400};
      font-size: 1.5rem;
    }

    p {
      margin-top: 15px;
      max-width: 570px;
      line-height: 1.5rem;
      font-size: 0.9rem;
    }
  }
`;
const OwnerSection = styled.div`
  margin-top: 40px;
  background-color: ${colorSystem.beige};
  padding: 25px;
  border-radius: 20px;

  .owner-title {
    display: flex;
    justify-content: space-between;
  }

  h4 {
    font-weight: 700;
    color: ${colorSystem.g800};
    font-size: 0.9rem;
  }

  .owner-content {
    margin-top: 15px;
    padding-left: 20px;
    line-height: 1.4rem;
    font-weight: 500;
    color: ${colorSystem.g900};

    > p {
      width: 70%;
    }
  }
`;

const ReviewCard = () => {
  return (
    <MyReviewCard>
      <div className="myreview-card-left">
        <div></div>
        <span>별하숲</span>
      </div>
      <div className="myreview-card-right">
        <UserSection>
          <div className="myreview-title">
            <div className="myreview-score">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <span>2024/06/15</span>
          </div>
          <div className="myreview-img">
            <div className="myreview-img1"></div>
            <div className="myreview-img2"></div>
            <div className="myreview-img3"></div>
          </div>
          <div className="myreview-content">
            <div>
              <span>별별 글램핑 (A룸 202호)</span>
              <RiEdit2Line />
            </div>
            <p>
              너무 좋았습니당 어쩌고 저쩌고 다음에 또 갈 수 있으면 얼마나 좋게요
              ^^ 너무 좋았습니당 어쩌고 저쩌고 다음에 또 갈 수 있으면 얼마나
              좋게요 ^^ 너무 좋았습니당 어쩌고 저쩌고 다음에 또 갈 수 있으면
              얼마나 좋게요 ^^
            </p>
          </div>
        </UserSection>
        <OwnerSection>
          <div className="owner-title">
            <h4>숙소 답변</h4>
          </div>
          <div className="owner-content">
            <p>
              길동님 안녕하세요!! 저희 글램핑장 이용해주셔서 감사합니다 다음에
              또 방문하면 깜짝 선물이 ^^ 길동님 안녕하세요!! 저희 글램핑장
              이용해주셔서 감사합니다 다음에 또 방문하면 깜짝 선물이 ^^
            </p>
          </div>
        </OwnerSection>
      </div>
    </MyReviewCard>
  );
};

export default ReviewCard;
