import styled from "@emotion/styled";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { colorSystem } from "../../styles/color";
import { MainButton } from "../common/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import CeoReviewModal from "./CeoReviewModal";
import defaultProfile from "../../images/icon/default-img.png";
import {
  ReviewCardStyle,
  ReviewImage,
  UnderLine,
  UserSection,
} from "../../styles/ceo/CeoReviewStyle";

const OwnerSection = styled.div`
  width: 100%;
  margin-top: 20px;
  background-color: ${props =>
    props.hasOwnerReview ? colorSystem.beige : colorSystem.white};
  padding: ${props => (props.hasOwnerReview ? "25px" : "0px")};
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
  setCanWriteReview,
  onApproval,
}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // 후기 작성 모달
  const handleOpenCreateReviewModal = () => {
    setIsReviewModalOpen(true);
  };
  const handleCloseCreateReviewModal = () => {
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
          <OwnerSection hasOwnerReview={!!ownerReviewContent}>
            {ownerReviewContent ? (
              <>
                <div className="owner-title">
                  <h4>숙소 답변</h4>
                </div>
                <div className="owner-content">
                  <p>{ownerReviewContent}</p>
                </div>
              </>
            ) : (
              <div className="review-btn">
                <MainButton
                  label="답변 작성하기"
                  onClick={handleOpenCreateReviewModal}
                />
              </div>
            )}
          </OwnerSection>
        </div>
        <CeoReviewModal
          isOpen={isReviewModalOpen}
          onClose={handleCloseCreateReviewModal}
          glampId={glampId}
          reviewId={reviewId}
          setCanWriteReview={setCanWriteReview}
          onApproval={onApproval}
        />
      </ReviewCardStyle>
      <UnderLine />
    </>
  );
};

export default CeoReviewCard;
