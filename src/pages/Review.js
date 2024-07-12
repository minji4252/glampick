import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import ReviewCard from "../components/ReviewCard";
import ReviewImgModal from "../components/common/ReviewImgModal"; // ReviewImgModal 임포트
import reviewimg1 from "../images/review1.png";
import reviewimg2 from "../images/review2.png";
import reviewimg3 from "../images/review3.png";
import { colorSystem, size } from "../styles/color";
import Pagination from "../components/common/ListPagination";
import axios from "axios";
import ListPagination from "../components/common/ListPagination";

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

  .review-img {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;
  }

  .review-img div {
    width: 122px;
    height: 122px;
    border-radius: 5px;
    background-size: cover;
    background-position: center;
    margin-bottom: 10px;
    position: relative;
  }

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
  height: 2800px;
  /* 임시로 지정 */
`;

const Review = () => {
  const [showModal, setShowModal] = useState(false);
  const [reviewImgData, setReviewImgData] = useState(null);
  const [allReviewImages, setAllReviewImages] = useState([]);

  useEffect(() => {
    // 숙소 리뷰 데이터
    const getReviewImgData = async () => {
      try {
        const glampId = 1;
        const page = 1;
        const response = await axios.get(
          `/api/glamping/{glamp_id}/review?glampId=${glampId}&page=${page}`,
        );
        const data = response.data;
        setReviewImgData(data);
        console.log("리뷰 데이터:", data);
      } catch (error) {
        console.log(error);
      }
    };

    // 전체 리뷰 이미지 데이터
    const getAllReviewImages = async () => {
      try {
        const glampId = 1;
        const page = 1;
        const response = await axios.get(
          `/api/glamping?glampId=${glampId}&page=${page}`,
        );
        const data = response.data;
        setAllReviewImages(data);
        console.log("전체 이미지 :", data);
      } catch (error) {
        console.log(error);
      }
    };

    getReviewImgData();
    getAllReviewImages();
  }, []);

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
          <div className="review-img">
            {reviewImages.map((img, index) => (
              <div
                key={index}
                className={`review-img${index + 1}`}
                style={{ backgroundImage: `url(${img})` }}
              >
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
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </BottomContents>
      </div>
      {showModal && (
        <ReviewImgModal
          reviewImages={reviewImages}
          onClose={toggleModal}
          onMoreClick={() => alert("더보기 버튼 클릭")}
          // 더보기 버튼 클릭 핸들러 추가되어야 함
        />
      )}
      <ListPagination />
    </WrapStyle>
  );
};

export default Review;
