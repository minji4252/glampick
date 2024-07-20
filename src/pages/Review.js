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
    font-size: 1.2rem;
    font-weight: 500;
    color: ${colorSystem.g800};
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 5px;
  }
`;

const TopContents = styled.div`
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 1.5px solid ${colorSystem.g200};

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
        top: 5px;
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
    /* justify-content: center; */
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 15px;
  }

  .review-img div {
    width: 123px;
    height: 123px;
    border-radius: 5px;
    background-size: cover;
    background-position: center;
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

  // 총 리뷰 수, 필터
  .review-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    .review-count {
      margin-left: 5px;
      color: ${colorSystem.g800};
      font-weight: 500;
      font-size: 1rem;
    }
    .filter {
      margin-right: 5px;
      color: ${colorSystem.g800};
      font-weight: 400;
      font-size: 0.9rem;
    }
  }

  @media all and (max-width: 419px) {
    .review-img div {
      width: 110px;
      height: 110px;
    }
  }
`;

const BottomContents = styled.div`
  width: 100%;
  /* height: 2100px; */
  /* 임시로 지정 */

  .glamp-name {
    margin-left: 5px;
    margin-top: 8px;
    margin-bottom: 20px;
    color: ${colorSystem.p500};
    font-size: 1rem;
    font-weight: 600;
  }
`;

const Review = () => {
  const [showModal, setShowModal] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  // const [reviewImages, setReviewImages] = useState([]);
  const [allReviewImages, setAllReviewImages] = useState([]);
  // 총 페이지 수
  const [totalPages, setTotalPages] = useState(1);
  // 페이지 상태 추가
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("latest"); // 필터 상태 추가

  const location = useLocation();
  // 별점
  const starPoint = location.state.starPoint;
  // 글램핑 이름
  const glampName = location.state.glampName;
  // 총 리뷰 수
  const countReview = location.state.countReview;
  // glampId 불러오기
  const { glampId } = useParams();

  // 전체 리뷰 불러오기
  useEffect(() => {
    const getGlampingReview = async () => {
      try {
        const response = await axios.get(
          `${process.env.PUBLIC_URL}/api/glamping/${glampId}/review`,
          {
            params: {
              glampId,
              page,
            },
          },
        );
        const data = response.data;
        setReviewData(data.reviewListItems);
        setAllReviewImages(data.allReviewImage);
        const totalPages = Math.ceil(countReview / 5);
        setTotalPages(totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    getGlampingReview();
  }, [page, glampId, countReview]);

  // 필터 적용
  //  useEffect(() => {
  //   // 리뷰 데이터 정렬하는 함수
  //   const sortReviews = () => {
  //     let sortedReviews = [...initialReviewData]; // 초기 리뷰 데이터를 기준으로 정렬
  //     if (filter === 'highest') {
  //       sortedReviews.sort((a, b) => b.starPoint - a.starPoint);
  //     } else if (filter === 'lowest') {
  //       sortedReviews.sort((a, b) => a.starPoint - b.starPoint);
  //     } else if (filter === 'latest') {
  //       sortedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  //     }
  //     setReviewData(sortedReviews);
  //   };

  //   if (initialReviewData.length > 0) {
  //     sortReviews();
  //   }
  // }, [filter, initialReviewData]); // filter와 initialReviewData가 변경될 때만 실행

  const handlePageChange = pageNumber => {
    setPage(pageNumber);
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  // 리뷰 이미지만 보기 모달
  const toggleModal = () => {
    setShowModal(!showModal);
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
              <div className="average-rating">{starPoint}</div>
              <div className="total-rating">/5</div>
            </div>
          </div>
          {/* 상단 리뷰사진 개수 9개 */}
          <div className="review-img">
            {allReviewImages.slice(0, 9).map((img, index) => (
              <div
                key={index}
                className={`review-img${index + 1}`}
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}${img})`,
                  position: "relative",
                }}
              >
                {/* 9번째 이미지에 더보기 버튼 오버레이 추가 */}
                {index === 8 && (
                  <div className="more-overlay" onClick={toggleModal}>
                    더보기
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="review-info">
            <div className="review-count">총 리뷰 {countReview}개</div>
            {/* <div className="filter">
              <select id="filter" value={filter} onChange={handleFilterChange}>
                <option value="latest">최신등록순</option>
                <option value="highest">별점 높은순</option>
                <option value="lowest">별점 낮은순</option>
              </select>
            </div> */}
          </div>
        </TopContents>
        <BottomContents>
          <div className="review-list">
            <div className="glamp-name">{glampName}</div>
            {reviewData.map((review, index) => (
              <ReviewCard
                key={index}
                userProfileImage={review.userProfileImage}
                userNickName={review.userNickName}
                roomName={review.roomName}
                createdAt={review.createdAt}
                userReviewContent={review.userReviewContent}
                ownerReviewContent={review.ownerReviewContent}
                starPoint={review.starPoint}
                reviewImages={review.reviewImages}
                glampId={review.glampId}
              />
            ))}
          </div>
        </BottomContents>
      </div>
      {showModal && <ReviewImgModal glampId={glampId} onClose={toggleModal} />}
      <ListPagination
        currentPage={page}
        totalItems={countReview}
        itemsPerPage={5}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </WrapStyle>
  );
};

export default Review;
