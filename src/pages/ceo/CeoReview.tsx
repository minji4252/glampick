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
import {
  NoReviewsStyle,
  NotContentStyle,
  WrapStyle,
} from "../../styles/ceo/CeoReviewStyle";

interface Review {
  reviewId: number;
  userNickName: string;
  glampName: string;
  glampId: number;
  roomName: string;
  createdAt: string; // 날짜 문자열 형식
  userReviewContent: string;
  ownerReviewContent: string;
  starPoint: number;
  reviewImages: string[]; // 이미지 URL 배열
  userProfileImage: string;
}

interface SearchResults {
  totalReviewCount: number;
}

const CeoReview = () => {
  const [canWriteReview, setCanWriteReview] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ceoAccessToken, setCeoAccessToken] = useRecoilState<string | null>(
    ceoAccessTokenState,
  );

  const [activeTab, setActiveTab] = useState<string>("allreview");
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

  const refreshReviewList = async () => {
    try {
      if (!ceoAccessToken) return;
      const typeNum = activeTab === "allreview" ? 0 : 1;
      const response = await axios.get(
        `/api/owner/review?typeNum=${typeNum}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${ceoAccessToken}`,
          },
        },
      );
      setReviews(response.data.reviewListItems);
      setSearchResults({ totalReviewCount: response.data.totalReviewsCount });
    } catch (error) {
      console.error("리뷰 리스트 갱신 오류:", error);
    }
  };
  useEffect(() => {
    refreshReviewList();
  }, [ceoAccessToken, currentPage, activeTab]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1); // 탭 변경 시 현재 페이지 초기화
  };

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
                  onApproval={refreshReviewList}
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
                  onApproval={refreshReviewList}
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
