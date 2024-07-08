import styled from "@emotion/styled";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import ReviewCard from "../components/ReviewCard";
import reviewimg1 from "../images/review1.png";
import reviewimg2 from "../images/review2.png";
import reviewimg3 from "../images/review3.png";
import { colorSystem, size } from "../styles/color";

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
  border-bottom: 1.5px solid ${colorSystem.g500};
  ${size.mid} {
    height: 500px;
    /* 임시로 지정 */
  }

  > p {
    width: 100%;
    font-size: 1.1rem;
    margin: 0px 0px 7px 15px;
    color: ${colorSystem.g900};
    font-weight: 500;
  }

  /* 평점 */
  .rating-details {
    font-size: 1.2rem;
    color: ${colorSystem.g900};
    display: flex;
    align-items: center;
    position: relative;
    margin: 0px 0px 7px 15px;
  }

  .star {
    margin-right: 2px;
    color: ${colorSystem.star};
  }

  .average-rating {
    font-size: 1.2rem;
    color: ${colorSystem.g900};
  }

  .total-rating {
    position: absolute;
    top: 2px;
    left: 50px;
    font-size: 1rem;
    color: ${colorSystem.g900};
  }

  /* .review-img-txt {
    color: ${colorSystem.g800};
    margin-left: 17px;
    font-weight: 500;
    font-size: 0.9rem;
    ${size.mid} {
      margin-bottom: 10px;
    }
  } */

  .review-img {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;
    ${size.mid} {
    }
  }

  .review-img div {
    width: 120px;
    height: 120px;
    border-radius: 5px;
    background-size: cover;
    background-position: center;
    margin-bottom: 10px;
    position: relative;
  }

  /* 이미지 더보기 */
  .more-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 1rem;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: opacity 0.3s ease; /* 투명도 전환 효과 */
    opacity: 1;
  }
`;

const BottomContents = styled.div`
  width: 100%;
  height: 670px;
`;

// 리뷰 이미지 더보기 모달
const ReviewImgModal = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;
`;
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  gap: 20px;
`;

const Review = () => {
  const [showModal, setShowModal] = useState(false);

  // 리뷰 이미지 배열
  const reviewImages = [
    reviewimg1,
    reviewimg2,
    reviewimg3,
    reviewimg1,
    reviewimg2,
    reviewimg3,
    reviewimg1,
    reviewimg2,
    reviewimg3,
  ];

  // 모달창 열고 닫기
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <WrapStyle>
      <div className="inner">
        <h3>숙소 후기</h3>
        <TopContents>
          <p>숙소 평점</p>
          <div className="rating-details">
            <FaStar className="star" />
            <div className="average-rating">4.7</div>
            <div className="total-rating">/5</div>
          </div>
          {/* <div className="review-img-txt">
            <div>후기사진</div>
          </div> */}
          <div className="review-img">
            {/* 이미지 최대 9개*/}
            {reviewImages.map((img, index) => (
              <div
                key={index}
                className={`review-img${index + 1}`}
                style={{ backgroundImage: `url(${img})` }}
              >
                {/* 마지막 사진일 때만 더보기 버튼 표시 */}
                {index === reviewImages.length - 1 && (
                  <div className="more-overlay" onClick={toggleModal}>
                    더보기
                  </div>
                )}
              </div>
            ))}
          </div>
        </TopContents>
        <BottomContents>
          <ReviewCard />
        </BottomContents>
      </div>
      {/* 리뷰 전체이미지 모달 */}
      {showModal && (
        <ReviewImgModal
          onClick={() => {
            toggleModal();
          }}
        >
          <ModalContent>
            {reviewImages.map((img, index) => (
              <div
                key={index}
                className={`review-img${index + 1}`}
                style={{
                  backgroundImage: `url(${img})`,
                  width: "100px",
                  height: "100px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  marginBottom: "20px",
                }}
              ></div>
            ))}
          </ModalContent>
        </ReviewImgModal>
      )}
    </WrapStyle>
  );
};

export default Review;
