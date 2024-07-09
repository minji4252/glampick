import styled from "@emotion/styled";
import BookingDetailForm from "../../components/BookingDetailForm";
import { MainButton } from "../../components/common/Button";
import Categories from "../../components/mypage/Categories";
import { colorSystem, size } from "../../styles/color";
import { useState } from "react";

const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }

  h3 {
    width: 100%;
    margin-top: 160px;
    margin-left: 120px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
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
      color: ${colorSystem.p500};
      border-bottom: 2px solid ${colorSystem.p500};
    }
  }

  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* 2개의 컬럼으로 설정 */
    gap: 50px;
    width: 90%;
    margin-top: 40px;

    ${size.mid} {
      display: flex;
      flex-direction: column;
      margin-top: 40px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 50px;
    }
  }

  /* 지난 이용 내역 텍스트 */
  .use-detail {
    width: 100%;
    margin-top: 20px;
    margin-left: 120px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
    ${size.mid} {
      margin-left: 82px;
    }
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
      margin-left: 82px;
    }
  }
`;

const BookingDetail = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  return (
    <WrapStyle>
      <Categories />
      <div className="inner">
        <h3>예약 내역</h3>
        <div className="tabs">
          <div
            className={`tab ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("upcoming");
            }}
          >
            이용예정
          </div>
          <div
            className={`tab ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("completed");
            }}
          >
            이용완료
          </div>
          <div
            className={`tab ${activeTab === "cancelde" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("cancelde");
            }}
          >
            취소내역
          </div>
        </div>

        {/* 이용 예정 */}
        {activeTab === "upcoming" && (
          <div className="container">
            <div className="form-group">
              {/* <div>
                <MainButton label="이용예정" />
              </div> */}
              <BookingDetailForm upComing={true} />
            </div>
            <div className="form-group">
              {/* <div>
                <MainButton label="이용예정" />
              </div> */}
              <BookingDetailForm upComing={true} />
            </div>
            <div className="form-group">
              {/* <div>
                <MainButton label="이용예정" />
              </div> */}
              <BookingDetailForm upComing={true} />
            </div>
          </div>
        )}

        {/* 이용 내역 */}
        {activeTab === "completed" && (
          <>
            <div className="container">
              <div className="form-group">
                {/* <div className="completed-reserv">
                  <MainButton label="이용완료" />
                </div> */}
                <BookingDetailForm isCompleted={true} />
              </div>
              <div className="form-group">
                {/* <div className="completed-reserv">
                  <MainButton label="이용완료" />
                </div> */}
                <BookingDetailForm isCompleted={true} />
              </div>
            </div>
          </>
        )}
        {/* 취소 내역 */}
        {activeTab === "cancelde" && (
          <>
            <div className="container">
              <div className="form-group">
                {/* <div className="completed-reserv">
                  <MainButton label="이용완료" />
                </div> */}
                <BookingDetailForm />
              </div>
              <div className="form-group">
                {/* <div className="completed-reserv">
                  <MainButton label="이용완료" />
                </div> */}
                <BookingDetailForm />
              </div>
            </div>
          </>
        )}
      </div>
    </WrapStyle>
  );
};

export default BookingDetail;
