import styled from "@emotion/styled";
import { colorSystem, size } from "../../styles/color";
import emptyImg from "../../images/emptyImg.png";
import CeoCategories from "../../components/ceo/CeoCategories";
import ReviewCard from "../../components/ReviewCard";
import notBookingImg from "../../images/notbookingImg.png";
import { useEffect, useState } from "react";
import { ceoAccessTokenState } from "../../atoms/loginState";
import { useRecoilState } from "recoil";
import axios from "axios";
import ListPagination from "../../components/common/ListPagination";
import CeoReviewCard from "../../components/ceo/CeoReviewCard";

const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }
  h3 {
    width: 100%;
    margin-top: 50px;
    margin-left: 120px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
  }

  @media all and (max-width: 1910px) {
    display: flex;
    .inner {
      margin-left: 82px;
    }
  }

  ${size.mid} {
    flex-direction: column;
    h3 {
      margin-top: 250px;
    }
  }

  /* .tabs {
    height: 1000px;
  } */

  /* 탭 메뉴 */
  .tabs {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 110px;
    margin-top: 20px;
    font-size: 1rem;
    color: ${colorSystem.g900};
    font-weight: 600;
    margin-top: 20px;
  }

  .tab {
    padding: 10px 5px;
    margin: 0px 10px;
    cursor: pointer;
    &.active {
      font-weight: 600;
      color: ${colorSystem.ceo};
      border-bottom: 2px solid ${colorSystem.ceo};
    }
  }

  .container {
    /* 임시 높이 */
    /* height: 500px; */
    display: grid;
    gap: 50px;
    width: 90%;
    margin-top: 40px;
    margin-bottom: 60px;

    .form-group {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
`;
const NoReviewsStyle = styled.div`
  width: 70%;
  background-color: ${colorSystem.background};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  margin-bottom: 250px;
  letter-spacing: 2px;

  .no-review-img {
    background: url(${emptyImg}) no-repeat center;
    background-size: cover;
    width: 50px;
    height: 50px;
    margin-top: 100px;
  }

  h4 {
    font-size: 1.1rem;
    margin-top: 20px;
  }

  p {
    margin-bottom: 100px;
  }
`;

const NotContentStyle = styled.div`
  /* width: 150%; */
  background-color: ${colorSystem.background};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  /* margin-top: 65px; */
  margin-bottom: 250px;
  letter-spacing: 2px;
  padding-bottom: 50px;
  .logo-img {
    background: url(${notBookingImg}) no-repeat center;
    background-size: cover;
    width: 150px;
    height: 100px;
    margin-top: 100px;
  }

  a {
    max-width: 180px;
    width: 100%;
  }

  h4 {
    font-size: 1.1rem;
    margin-top: 10px;
  }
  .room-search-btn {
    margin-top: 40px;
    margin-bottom: 60px;
    position: relative;
    button {
      width: 100%;
      height: 40px;
      text-align: left;
      -webkit-justify-content: left;
    }
    svg {
      width: 38px;
      height: 38px;
      color: ${colorSystem.white};
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 10%;
      pointer-events: none;
    }
  }
`;

interface Review {
  reviewId: string;
  userNickName: string;
  glampName: string;
  glampId: string;
  roomName: string;
  createdAt: string;
  userReviewContent: string;
  ownerReviewContent: string;
  starPoint: number;
  reviewImages: string[];
  userProfileImage: string;
}

interface SearchResults {
  totalReviewCount: number;
}

const CeoReview: React.FC = () => {
  const [canWriteReview, setCanWriteReview] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ceoAccessToken, setCeoAccessToken] = useRecoilState<string | null>(
    ceoAccessTokenState,
  );

  const [activeTab, setActiveTab] = useState<string>("allreview");
  const [allReviews, setAllReviews] = useState([]);
  const [nocommentReviews, setNocommentReviews] = useState([]);

  const [searchResults, setSearchResults] = useState<SearchResults>({
    totalReviewCount: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
  const [postPerPage] = useState<number>(5); // 페이지네이션 페이지당 보여질 목록 수

  // 토큰 정보 불러오기
  useEffect(() => {
    const fetchCeoAccessToken = async () => {
      try {
        const token = localStorage.getItem("ceoAccessToken");
        if (token) {
          setCeoAccessToken(token);
          console.log("accessToken 있음");
        } else {
          console.log("accessToken 없음");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCeoAccessToken();
  }, [setCeoAccessToken]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // setCurrentPage(1); // 탭 변경 시 현재 페이지 초기화
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!ceoAccessToken) return;
        axios.defaults.withCredentials = true;

        const typeNum = activeTab === "allreview" ? 0 : 1;
        const response = await axios.get(
          `/api/owner/review?typeNum=${typeNum}&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${ceoAccessToken}`,
            },
          },
        );
        console.log(response.data.reviewListItems);
        setReviews(response.data.reviewListItems);
        setSearchResults({ totalReviewCount: response.data.totalReviewsCount });
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, [ceoAccessToken, currentPage, activeTab]);

  // 페이지 개수 계산
  const totalPages = Math.ceil(searchResults.totalReviewCount / postPerPage);

  return (
    <WrapStyle>
      <CeoCategories />
      <div className="inner">
        <h3>리뷰 관리</h3>
        <div className="tabs">
          <div
            className={`tab ${activeTab === "allreview" ? "active" : ""}`}
            onClick={() => {
              handleTabClick("allreview");
            }}
          >
            전체 리뷰
          </div>
          <div
            className={`tab ${activeTab === "nocommentreview" ? "active" : ""}`}
            onClick={() => {
              handleTabClick("nocommentreview");
            }}
          >
            미답변 리뷰
          </div>
        </div>

        {/* 전체 리뷰 */}
        {activeTab === "allreview" && (
          <div className="container">
            {reviews?.length > 0 ? (
              reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  reviewId={review.reviewId}
                  userNickName={review.userNickName}
                  glampName={review.glampName}
                  glampId={review.glampId}
                  roomName={review.roomName}
                  createdAt={review.createdAt}
                  userReviewContent={review.userReviewContent}
                  ownerReviewContent={review.ownerReviewContent}
                  starPoint={review.starPoint}
                  reviewImages={review.reviewImages}
                  userProfileImage={review.userProfileImage}
                />
              ))
            ) : (
              <NoReviewsStyle>
                <div className="no-review-img" />
                <h4>작성한 후기가 없습니다</h4>
                <p>숙소 이용 후 후기를 남겨주세요</p>
              </NoReviewsStyle>
            )}
          </div>
        )}
        {/* 미답변 리뷰 */}
        {activeTab === "nocommentreview" && (
          <div className="container">
            {reviews?.length > 0 ? (
              reviews.map((review, index) => (
                <CeoReviewCard
                  key={index}
                  reviewId={review.reviewId}
                  userNickName={review.userNickName}
                  glampName={review.glampName}
                  glampId={review.glampId}
                  roomName={review.roomName}
                  createdAt={review.createdAt}
                  userReviewContent={review.userReviewContent}
                  ownerReviewContent={review.ownerReviewContent}
                  starPoint={review.starPoint}
                  reviewImages={review.reviewImages}
                  userProfileImage={review.userProfileImage}
                  setCanWriteReview={setCanWriteReview}
                />
              ))
            ) : (
              <NotContentStyle>
                <div className="logo-img" />
                <h4>답변할 리뷰가 없습니다</h4>
              </NotContentStyle>
            )}
          </div>
        )}
        {reviews?.length > 0 && (
          <ListPagination
            currentPage={currentPage}
            totalItems={searchResults.totalReviewCount || 1}
            itemsPerPage={postPerPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </WrapStyle>
  );
};

export default CeoReview;
