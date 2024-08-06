import { colorSystem } from "../../styles/color";
import styled from "@emotion/styled";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { DeleteButton, MainButton } from "../common/Button";
import useModal from "../../hooks/UseModal";
// import CheckModal from "../common/CheckModal";
// import AlertModal from "../common/AlertModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import defaultProfile from "../../images/icon/default-img.png";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../atoms/loginState";
import CeoReviewModal from "./CeoReviewModal";

const ReviewCardStyle = styled.div`
  display: flex;
  margin-bottom: 40px;

  .review-card-right {
    max-width: 800px;
    width: 100%;
  }

  .review-card-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 50px;

    div {
      border-radius: 100%;
      width: 65px;
      height: 65px;
    }

    span {
      margin-top: 10px;
      font-weight: 600;
    }
  }

  //일반 리뷰에서는 숙소이름 가리기
  h5 {
    display: none;
    font-weight: 600;
  }
`;
const UserSection = styled.div`
  .review-title {
    max-width: 570px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      display: flex;
      gap: 10px;
    }

    span {
      letter-spacing: 1.5px;
    }

    //일반 리뷰에서는 삭제 버튼 가리기
    button {
      height: 25px;
      display: none;
    }
  }
  .review-score {
    display: flex;
    gap: 3px;
    color: ${colorSystem.star};
  }

  .review-content {
    font-size: 1rem;

    .review-glamp-name {
      cursor: pointer;
      padding: 5px;
      width: fit-content;
      display: flex;
      align-items: center;
      gap: 10px;

      &:hover {
        color: ${colorSystem.p300};
      }
    }

    span {
      font-weight: 600;
    }

    p,
    textarea {
      margin-top: 15px;
      max-width: 570px;
      line-height: 1.5rem;
      font-size: 0.9rem;
      /* overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical; */
    }

    button {
      margin-top: 15px;
      height: 35px;
      font-size: 0.9rem;
    }
  }
`;

const ReviewImage = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;

  > div {
    max-width: 180px;
    width: 100%;
    height: 200px;
    border-radius: 25px;
    background-size: cover;
  }

  @media all and (min-width: 768px) and (max-width: 850px) {
    .review-card-img2,
    .review-card-img3 {
      display: none;
    }

    .review-card-img1 {
      width: 100%;
      max-width: 370px;
      background-size: cover;
    }
  }

  @media all and (max-width: 540px) {
    .review-card-img2,
    .review-card-img3 {
      display: none;
    }

    .review-card-img1 {
      width: 100%;
      max-width: 370px;
      background-size: cover;
    }
  }
`;

const OwnerSection = styled.div`
  width: 100%;
  margin-top: 20px;

  h4 {
    font-weight: 700;
    color: ${colorSystem.g800};
    font-size: 0.9rem;
  }
`;

const UnderLine = styled.div`
  width: 95%;
  height: 1px;
  border-bottom: 1px solid ${colorSystem.g200};
  margin-bottom: 40px;
`;

const CeoReviewCard = ({
  reviewId,
  userNickName,
  glampName,
  glampId,
  roomName,
  createdAt,
  userReviewContent,
  ownerReviewContent,
  starPoint,
  reviewImages,
  userProfileImage,
}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // 후기 작성 모달
  const handleOpenCreateReviewModal = () => {
    console.log("모달 열기");
    setIsReviewModalOpen(true);
  };
  const handleCloseCreateReviewModal = () => {
    console.log("모달 닫기");
    setIsReviewModalOpen(false);
  };

  // 2024-00-00 형식으로 변경
  const date = new Date(createdAt);
  const formattedDate = date.toISOString().split("T")[0];
  const renderStars = starPoint => {
    const stars = [];
    const totalStars = 5;
    for (let i = 0; i < starPoint; i++) {
      stars.push(<FaStar key={`star-${i}`} />);
    }
    for (let i = starPoint; i < totalStars; i++) {
      stars.push(<FaRegStar key={`star-${i}`} />);
    }
    return stars;
  };

  return (
    <>
      <ReviewCardStyle>
        <div className="review-card-left">
          <div
            className="user-profile-img"
            style={{
              backgroundImage: `url(${
                userProfileImage ? userProfileImage : defaultProfile
              })`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <span>{userNickName}</span>
        </div>
        <div className="review-card-right">
          <UserSection>
            <div className="review-title">
              <div>
                <div className="review-score">{renderStars(starPoint)}</div>
                <span>{formattedDate}</span>
              </div>
            </div>
            <ReviewImage
              style={{
                marginTop: reviewImages.length > 0 ? "20px" : "10px",
              }}
            >
              {reviewImages.map((image, index) => (
                <div
                  className={`review-card-img${index + 1}`}
                  key={index}
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
              ))}
            </ReviewImage>
            <div
              className="review-content"
              style={{
                marginTop: reviewImages.length > 0 ? "30px" : "0px",
              }}
            >
              <Link to={`/places/${glampId}`}>
                <div className="review-glamp-name">
                  <h5>{glampName}</h5>
                  <h5>|</h5>
                  <span>{roomName}</span>
                </div>
              </Link>
              <p>{userReviewContent}</p>
            </div>
          </UserSection>
          <OwnerSection>
            <div className="review-btn">
              <MainButton
                label="답변 작성하기"
                onClick={() => {
                  handleOpenCreateReviewModal();
                }}
              />
            </div>
          </OwnerSection>
        </div>
        <CeoReviewModal
          isOpen={isReviewModalOpen}
          onClose={handleCloseCreateReviewModal}
          glampId={glampId}
          reviewId={reviewId}
        />
      </ReviewCardStyle>
      <UnderLine />
    </>
  );
};

export default CeoReviewCard;
