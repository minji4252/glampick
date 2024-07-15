import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import BookingDetailForm from "../../components/BookingDetailForm";
import Categories from "../../components/mypage/Categories";
import notBookingImg from "../../images/notbookingImg.png";
import { colorSystem, size } from "../../styles/color";
import { getCookie } from "../../utils/cookie";

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

const NotContentStyle = styled.div`
  width: 70%;
  background-color: ${colorSystem.background};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  margin-top: 65px;
  margin-bottom: 250px;
  letter-spacing: 2px;
  .logo-img {
    background: url(${notBookingImg}) no-repeat center;
    background-size: cover;
    width: 150px;
    height: 100px;
    margin-top: 100px;
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
      width: 180px;
      height: 40px;
      text-align: left;
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

const BookingDetail = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [accessToken, setAccessToken] = useState("");
  const [bookingDetails, setBookingDetails] = useState([]);
  const [completeReservation, setCompleteReservation] = useState(null);

  // 토큰정보 불러오기
  useEffect(() => {
    const fetchAccessToken = () => {
      try {
        const accessTokenFromCookie = getCookie("access-Token");
        if (accessTokenFromCookie) {
          setAccessToken(accessTokenFromCookie);
        } else {
          console.log("엑세스 토큰 없음");
        }
      } catch (error) {
        console.log("엑세스토큰 가져오는 중 에러", error);
      }
    };
    fetchAccessToken();
  }, []);

  useEffect(() => {
    const getUserBook = async () => {
      if (!accessToken) return;
      try {
        const response = await axios.get(`/api/user/book`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // console.log(response);
        // console.log(response.data);
        // console.log(response.data.reservationBeforeResultSetList);
        // console.log(response.data.reservationCancelResultSetList);
        // console.log(response.data.reservationCompleteResultSetList);
        console.log(response.data.reservationCompleteResultSetList[0]);
        const completeReservation =
          response.data.reservationCompleteResultSetList[0];
        setCompleteReservation(completeReservation); // completeReservation 상태 설정
        console.log(completeReservation);

        // const reservationList =
        //   response.data.reservationBeforeResultSetList || [];
        // setBookingDetails(
        //   Array.isArray(reservationList) ? reservationList : [],
        // );
        // console.log(reservationList);
      } catch (error) {
        console.log(error);
      }
    };
    getUserBook();
  }, [accessToken]);

  const handleTabClick = tab => {
    setActiveTab(tab);
  };

  return (
    <WrapStyle>
      <Categories />
      <div className="inner">
        <h3>예약 내역</h3>
        <div className="tabs">
          <div
            className={`tab ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => {
              handleTabClick("upcoming");
            }}
          >
            이용예정
          </div>
          <div
            className={`tab ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => {
              handleTabClick("completed");
            }}
          >
            이용완료
          </div>
          <div
            className={`tab ${activeTab === "cancelde" ? "active" : ""}`}
            onClick={() => {
              handleTabClick("cancelde");
            }}
          >
            취소내역
          </div>
        </div>

        {/* 이용 예정 */}
        {activeTab === "upcoming" && (
          <div className="container">
            <div className="form-group">
              <BookingDetailForm upComing={true} />
            </div>
            <div className="form-group">
              <BookingDetailForm upComing={true} />
            </div>
            <div className="form-group">
              <BookingDetailForm upComing={true} />
            </div>
          </div>
        )}

        {/* 이용 내역 */}
        {activeTab === "completed" && (
          <>
            <div className="container">
              <div className="form-group">
                <BookingDetailForm isCompleted={true} />
              </div>
              <div className="form-group">
                <BookingDetailForm
                  completeReservation={completeReservation}
                  isCompleted={true}
                />
              </div>
            </div>
          </>
        )}
        {/* 취소 내역 */}
        {activeTab === "cancelde" && (
          <>
            <div className="container">
              <div className="form-group">
                <BookingDetailForm />
              </div>
              <div className="form-group">
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
