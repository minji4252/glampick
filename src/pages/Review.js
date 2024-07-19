import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useLocation, useParams } from "react-router";
import ReviewCard from "../components/ReviewCard";
import ListPagination from "../components/common/ListPagination";
import ReviewImgModal from "../components/common/ReviewImgModal"; // ReviewImgModal 임포트
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
    font-size: 1.1rem;
    font-weight: 500;
    color: ${colorSystem.g800};
    margin-top: 10px;
    margin-left: 15px;
    margin-bottom: 5px;
  }
`;

const TopContents = styled.div`
  width: 100%;
  margin-bottom: 50px;
  border-bottom: 1.5px solid ${colorSystem.g200};

  ${size.mid} {
    height: 500px;
    /* 임시로 지정 */
  }

  .rating {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    > p {
      font-size: 1.1rem;
      color: ${colorSystem.g800};
      font-weight: 500;
    }

    .rating-details {
      font-size: 1.2rem;
      color: ${colorSystem.g800};
      display: flex;
      align-items: center;
      position: relative;
      margin-left: 8px;

      .star {
        font-size: 1.5rem;
        margin-right: 2px;
        color: ${colorSystem.star};
      }

      .average-rating {
        font-size: 1.3rem;
        font-weight: 500;
        margin-top: 3px;
        margin-left: 2px;
        color: ${colorSystem.g800};
      }

      .total-rating {
        position: absolute;
        top: 4px;
        left: 60px;
        font-size: 1.1rem;
        font-weight: 400;
        color: ${colorSystem.g900};
      }
    }
  }

  .review-img {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
    margin-bottom: 5px;
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

  .review-count {
    margin-bottom: 5px;
    color: ${colorSystem.g800};
    font-size: 0.9rem;
  }
`;

const BottomContents = styled.div`
  width: 100%;
  height: 2800px;
  /* 임시로 지정 */
`;

const Review = () => {
  const [showModal, setShowModal] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [reviewImages, setReviewImages] = useState([]);
  // 리뷰 이미지 개수 상태 추가
  const [reviewImagesLength, setReviewImagesLength] = useState(0);
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  // 총 페이지 수
  const [totalPages, setTotalPages] = useState(1);
  // 페이지 상태 추가
  const [page, setPage] = useState(1);

  // 평균 평점 불러오기
  const location = useLocation();
  // console.log("location", location.state);

  // glampId 불러오기
  const { glampId } = useParams();
  console.log("glampId", glampId);

  // 리뷰 전체 이미지 불러오기
  useEffect(() => {
    const getGlamping = async () => {
      try {
        const response = await axios.get(
          `${process.env.PUBLIC_URL}/api/glamping?glampId=${glampId}&page=${currentPage}`,
        );
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getGlamping();
  }, [currentPage]);

  // 전체 리뷰 불러오기
  useEffect(() => {
    const getGlampingReview = async () => {
      try {
        const response = await axios.get(
          `${process.env.PUBLIC_URL}/api/glamping/{glamp_id}/review?glampId=${glampId}&page=${page}`,
        );
        // console.log(glampId);
        const data = response.data;
        setReviewImagesLength(data.totalImagesCount); // 총 리뷰 이미지 개수

        console.log(data);
        setReviewData(data.reviewListItems); // 리뷰 데이터 배열을 state에 저장
        setTotalPages(Math.ceil(data.totalReviewCount / 5)); // 총 페이지 수 설정

        // 리뷰 데이터에서 리뷰 이미지 추출하여 state에 저장
        const images = data.reviewListItems
          .map(review => review.reviewImages)
          .flat();
        setReviewImages(images);
        // 총 페이지 수 설정
        setTotalPages(Math.ceil(data.totalReviewCount / 5));
      } catch (error) {
        console.log(error);
      }
    };

    getGlampingReview();
  }, [page]);

  const handlePageChange = pageNumber => {
    setPage(pageNumber);
  };

  // 모달창 열고 닫기
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  // 모달 내 더보기 클릭 핸들러
  const handleMoreClick = () => {
    setPage(); // 페이지 증가
  };

  return (
    <WrapStyle>
      <div className="inner">
        <h3>숙소 후기</h3>
        <TopContents>
          <div className="rating">
            {/* <p>숙소 평점</p> */}
            <div className="rating-details">
              <FaStar className="star" />
              <div className="average-rating">{location.state}</div>
              <div className="total-rating">/5</div>
            </div>
          </div>
          <div className="review-img">
            {reviewImages.slice(0, 8).map((img, index) => (
              <div
                key={index}
                className={`review-img${index + 1}`}
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}${img})`,
                }}
              >
                {index === 7 && reviewImagesLength >= 9 && (
                  <div className="more-overlay" onClick={toggleModal}>
                    더보기
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="review-count">총 00개</div>
        </TopContents>
        <BottomContents>
          <div className="review-list">
            {reviewData.map((review, index) => (
              <ReviewCard
                key={index}
                userProfileImage={review.userProfileImage}
                userNickName={review.userNickName}
                glampName={review.glampName}
                roomName={review.roomName}
                createdAt={review.createdAt}
                userReviewContent={review.userReviewContent}
                ownerReviewContent={review.ownerReviewContent}
                starPoint={review.starPoint}
                reviewImages={review.reviewImages}
              />
            ))}
          </div>
        </BottomContents>
      </div>
      {showModal && (
        <ReviewImgModal
          reviewImages={reviewImages}
          onClose={toggleModal}
          onMoreClick={() => {
            handleMoreClick();
          }}
          // 더보기 버튼 클릭 핸들러 추가되어야 함
        />
      )}
      <ListPagination
        currentPage={currentPage}
        totalItems={reviewImagesLength}
        itemsPerPage={5}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </WrapStyle>
  );
};

export default Review;
