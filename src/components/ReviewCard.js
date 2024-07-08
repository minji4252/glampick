import React, { useState } from "react";
import { colorSystem } from "../styles/color";
import styled from "@emotion/styled";
import reviewimg1 from "../images/review1.png";
import reviewimg2 from "../images/review2.png";
import reviewimg3 from "../images/review3.png";
import { FaStar } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";
import { MainButton } from "./common/Button";

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
      max-width: 180px;
      width: 100%;
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

    @media all and (min-width: 768px) and (max-width: 850px) {
      .myreview-img2,
      .myreview-img3 {
        display: none;
      }

      .myreview-img1 {
        width: 100%;
        max-width: 370px;
        background-size: cover;
      }
    }

    @media all and (max-width: 540px) {
      .myreview-img2,
      .myreview-img3 {
        display: none;
      }

      .myreview-img1 {
        width: 100%;
        max-width: 370px;
        background-size: cover;
      }
    }
  }

  .myreview-content {
    margin-top: 30px;
    font-size: 1rem;

    > div {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    span {
      font-weight: 600;
    }

    svg {
      color: ${colorSystem.g400};
      font-size: 1.5rem;
      cursor: pointer;
      display: none;
      margin-left: 10px;
    }

    p,
    textarea {
      margin-top: 15px;
      max-width: 570px;
      line-height: 1.5rem;
      font-size: 0.9rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    textarea {
      width: 100%;
      height: 100px;
      padding: 10px;
      border: 1px solid ${colorSystem.g400};
      border-radius: 10px;
      resize: none;
    }

    button {
      margin-top: 15px;
      height: 35px;
      font-size: 0.9rem;
    }

    .edited-text {
      font-size: 0.85rem;
      color: ${colorSystem.g400};
      font-weight: 400;
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
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
`;

const ReviewCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const [reviewText, setReviewText] = useState("좋았습니다!");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setIsEdited(true);
  };

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
              {!isEditing && (
                <>
                  <RiEdit2Line onClick={handleEditClick} />
                  {isEdited && <span className="edited-text">수정됨</span>}
                </>
              )}
            </div>
            {isEditing ? (
              <>
                <textarea
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                />
                <MainButton onClick={handleSaveClick} label="수정완료" />
              </>
            ) : (
              <p>{reviewText}</p>
            )}
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
