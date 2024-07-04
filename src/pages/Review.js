import styled from "@emotion/styled";
import { FaStar } from "react-icons/fa";
import ReviewCard from "../components/ReviewCard";
import reviewimg1 from "../images/review1.png";
import reviewimg2 from "../images/review2.png";
import reviewimg3 from "../images/review3.png";
import { colorSystem } from "../styles/color";

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
    padding: 10px;
    margin-bottom: 20px;
  }
`;

const TopContents = styled.div`
  width: 100%;
  margin-bottom: 50px;
  border-bottom: 2px solid ${colorSystem.g200};

  > p {
    width: 100%;
    font-size: 1.1rem;
    padding: 10px;
    color: ${colorSystem.g900};
    font-weight: 600;
  }

  /* 평점 */
  .rating-details {
    font-size: 1.3rem;
    display: flex;
    position: relative;
    margin: 5px 0px 10px 10px;
  }

  .star {
    margin-right: 2px;
    color: ${colorSystem.star};
  }

  .average-rating {
    font-size: 1.3rem;
  }

  .total-rating {
    position: absolute;
    top: 3px;
    left: 50px;
    font-size: 1rem;
    margin-left: 3px;
  }

  .review-img-txt {
    margin-left: 10px;
    color: ${colorSystem.g800};
    font-weight: 500;
  }

  .review-img {
    width: 100%;
    height: 130px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0px 20px 10px;
  }

  .review-img1 {
    width: 120px;
    height: 120px;
    border-radius: 5px;
    background: url(${reviewimg1}) no-repeat center;
  }
  .review-img2 {
    width: 120px;
    height: 120px;
    border-radius: 5px;
    background: url(${reviewimg2}) no-repeat center;
  }
  .review-img3 {
    width: 120px;
    height: 120px;
    border-radius: 5px;
    background: url(${reviewimg3}) no-repeat center;
  }

  /* 이미지 더보기 */
  .more-overlay {
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 1rem;
    border-radius: 5px;
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
        <h3>전체 후기</h3>
        <TopContents>
          <p>숙소 평점</p>
          <div className="rating-details">
            <FaStar className="star" />
            <div className="average-rating">4.7</div>
            <div className="total-rating">/5</div>
          </div>
          <div className="review-img-txt">
            <div>숙소 후기사진</div>
          </div>
          <div className="review-img">
            {/* 이미지 최대 9개*/}
            <div className="review-img1"></div>
            <div className="review-img2"></div>
            <div className="review-img3"></div>
            <div className="review-img3"></div>
            <div className="review-img3"></div>
            <div className="review-img3"></div>
            <div className="review-img3"></div>
            <div className="review-img3"></div>
            <div className="review-img3">
              <div className="more-overlay">더보기</div>
            </div>
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
