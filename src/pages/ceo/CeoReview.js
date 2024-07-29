import styled from "@emotion/styled";
import { colorSystem } from "../../styles/color";
import CeoCategories from "../../components/ceo/CeoCategories";
import ReviewCard from "../../components/ReviewCard";
import { useState } from "react";

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
  .tabs {
    height: 1000px;
  }

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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* 2개의 컬럼으로 설정 */
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

const CeoReview = () => {
  const [activeTab, setActiveTab] = useState("allreview");
  const [allReviews, setAllReviews] = useState([]);
  const [nocommentReviews, setNocommentReviews] = useState([]);
  const handleTabClick = tab => {
    setActiveTab(tab);
    // setCurrentPage(1); // 탭 변경 시 현재 페이지 초기화
  };

  const getBookingsByTab = () => {
    switch (activeTab) {
      case "allreview":
        return allReviews;
      case "nocommentreview":
        return nocommentReviews;
      default:
        return [];
    }
  };

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
            <div>내부</div>
            {/* {bookingsToShow.length > 0 ? (
              bookingsToShow.map((booking, index) => (
                <div className="form-group" key={index}>
                  <ReviewCard />
                </div>
              ))
            ) : (
              <NotContentStyle>
                <div className="logo-img" />
                <h4>등록된 리뷰가 없습니다.</h4>
              </NotContentStyle>
            )} */}
          </div>
        )}
        {/* 미답변 리뷰 */}
        {activeTab === "nocommentreview" && (
          <div className="container">
            <div>내부</div>
            {/* {bookingsToShow.length > 0 ? (
              bookingsToShow.map((booking, index) => (
                <div className="form-group" key={index}>
                  <ReviewCard />
                </div>
              ))
            ) : (
              <NotContentStyle>
                <div className="logo-img" />
                <h4>답변할 리뷰가?? 없습니다?</h4>
              </NotContentStyle>
            )} */}
          </div>
        )}
      </div>
    </WrapStyle>
  );
};

export default CeoReview;
