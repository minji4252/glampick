import { colorSystem } from "../styles/color";
import styled from "@emotion/styled";
import reviewimg1 from "../images/review1.png";
import reviewimg2 from "../images/review2.png";
import reviewimg3 from "../images/review3.png";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

const MyReviewCard = styled.div`
  display: flex;
  margin-bottom: 60px;

  .myreview-card-right {
    max-width: 800px;
    width: 100%;
  }

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

    button {
      margin-top: 15px;
      height: 35px;
      font-size: 0.9rem;
    }
  }
`;
const OwnerSection = styled.div`
  width: 100%;
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

const ReviewCard = ({
  userNickName,
  glampName,
  roomName,
  createdAt,
  userReviewContent,
  ownerReviewContent,
  starPoint,
  reviewImages,
}) => {
  //2024-00-00 형식으로 변경
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
    <MyReviewCard>
      <div className="myreview-card-left">
        <div></div>
        <span>{userNickName}</span>
      </div>
      <div className="myreview-card-right">
        <UserSection>
          <div className="myreview-title">
            <div className="myreview-score">{renderStars(starPoint)}</div>
            <span>{formattedDate}</span>
          </div>
          <div className="myreview-img">
            <div className="myreview-img1"></div>
            <div className="myreview-img2"></div>
            <div className="myreview-img3"></div>
          </div>
          <div className="myreview-content">
            <div>
              <span>{glampName}</span>
              <span>{roomName}</span>
            </div>
            <p>{userReviewContent}</p>
          </div>
        </UserSection>
        <OwnerSection>
          <div className="owner-title">
            <h4>숙소 답변</h4>
          </div>
          <div className="owner-content">
            <p>{ownerReviewContent}</p>
          </div>
        </OwnerSection>
      </div>
    </MyReviewCard>
  );
};

export default ReviewCard;
