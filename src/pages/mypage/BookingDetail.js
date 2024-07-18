import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import BookingDetailForm from "../../components/BookingDetailForm";
import Categories from "../../components/mypage/Categories";
import notBookingImg from "../../images/notbookingImg.png";
import { IoIosArrowRoundForward } from "react-icons/io";
import { colorSystem, size } from "../../styles/color";
import { getCookie } from "../../utils/cookie";
import { MainButton } from "../../components/common/Button";
import { Link } from "react-router-dom";
import Loading from "../../components/common/Loading";

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
  width: 150%;
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

const BookingDetail = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [accessToken, setAccessToken] = useState("");
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // 토큰정보 불러오기
  useEffect(() => {
    const fetchAccessToken = () => {
      try {
        const token = getCookie("access-Token");
        setLoading(true);
        if (token) {
          setAccessToken(token);
        } else {
          console.log("엑세스 토큰 없음");
        }
      } catch (error) {
        console.log("엑세스 토큰 가져오는 중 에러", error);
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
        setLoading(false);
        console.log(response);

        const {
          reservationBeforeResultSetList,
          reservationCompleteResultSetList,
          reservationCancelResultSetList,
        } = response.data;

        // 이용 예정 내역
        setUpcomingBookings(reservationBeforeResultSetList || []);
        // 이용 완료 내역
        setCompletedBookings(reservationCompleteResultSetList || []);
        // 예약 취소 내역
        setCancelledBookings(reservationCancelResultSetList || []);
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
      {loading && <Loading />}
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
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking, index) => (
                <div className="form-group" key={index}>
                  <BookingDetailForm
                    booking={booking}
                    upcoming={true}
                    glampId={booking.glampId}
                  />
                </div>
              ))
            ) : (
              <NotContentStyle>
                <div className="logo-img" />
                <h4>예약된 글램핑장이 없습니다</h4>
                <Link to="/">
                  <div className="room-search-btn">
                    <MainButton label="숙소 검색하러 가기" />
                    <IoIosArrowRoundForward />
                  </div>
                </Link>
              </NotContentStyle>
            )}
          </div>
        )}

        {/* 이용 내역 */}
        {activeTab === "completed" && (
          <>
            <div className="container">
              {completedBookings.length > 0 ? (
                completedBookings.map((booking, index) => (
                  <div className="form-group" key={index}>
                    <BookingDetailForm
                      booking={booking}
                      isCompleted={true}
                      glampId={booking.glampId}
                    />
                  </div>
                ))
              ) : (
                <NotContentStyle>
                  <div className="logo-img" />
                  <h4>예약된 글램핑장이 없습니다</h4>
                  <Link to="/">
                    <div className="room-search-btn">
                      <MainButton label="숙소 검색하러 가기" />
                      <IoIosArrowRoundForward />
                    </div>
                  </Link>
                </NotContentStyle>
              )}
            </div>
          </>
        )}
        {/* 취소 내역 */}
        {activeTab === "cancelde" && (
          <>
            <div className="container">
              {cancelledBookings.length > 0 ? (
                cancelledBookings.map((booking, index) => (
                  <div className="form-group" key={index}>
                    <BookingDetailForm
                      booking={booking}
                      isCancelled={true}
                      glampId={booking.glampId}
                    />
                  </div>
                ))
              ) : (
                <NotContentStyle>
                  <div className="logo-img" />
                  <h4>예약된 글램핑장이 없습니다</h4>
                  <Link to="/">
                    <div className="room-search-btn">
                      <MainButton label="숙소 검색하러 가기" />
                      <IoIosArrowRoundForward />
                    </div>
                  </Link>
                </NotContentStyle>
              )}
            </div>
          </>
        )}
      </div>
    </WrapStyle>
  );
};

export default BookingDetail;
