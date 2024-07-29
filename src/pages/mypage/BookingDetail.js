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
import ListPagination from "../../components/common/ListPagination";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../atoms/loginState";

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

    ${size.mid} {
      margin-left: 70px;
    }
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
    margin-bottom: 60px;

    ${size.mid} {
      display: flex;
      flex-direction: column;
      /* margin-top: 40px; */
    }

    .form-group {
      display: flex;
      flex-direction: column;
      width: 100%;
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

export const NotContentStyle = styled.div`
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
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postPerPage] = useState(6); // 페이지네이션 페이지당 보여질 목록 수

  // 토큰정보 불러오기
  // useEffect(() => {
  //   const fetchAccessToken = () => {
  //     try {
  //       const token = localStorage.getItem("accessToken");
  //       setLoading(true);
  //       if (token) {
  //         setAccessToken(token);
  //       } else {
  //         // console.log("엑세스 토큰 없음");
  //       }
  //     } catch (error) {
  //       // console.log("엑세스 토큰 가져오는 중 에러", error);
  //     }
  //   };
  //   fetchAccessToken();
  // }, []);

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
        // console.log(response);

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
        // console.log(error);
      }
    };

    getUserBook();
  }, [accessToken]);

  const handleTabClick = tab => {
    setActiveTab(tab);
    setCurrentPage(1); // 탭 변경 시 현재 페이지 초기화
  };

  const getBookingsByTab = () => {
    switch (activeTab) {
      case "upcoming":
        return upcomingBookings;
      case "completed":
        return completedBookings;
      case "cancelled":
        return cancelledBookings;
      default:
        return [];
    }
  };

  // 예약이 취소될 때 BookingDetail 컴포넌트의 상태를 업데이트
  const handleBookingCancelled = reservationId => {
    setUpcomingBookings(prevBookings =>
      prevBookings.filter(booking => booking.reservationId !== reservationId),
    );
    setCancelledBookings(prevBookings => [...prevBookings, reservationId]);
  };

  // 현재 보여줄 예약 목록
  const bookingsToShow = getBookingsByTab().slice(
    (currentPage - 1) * postPerPage,
    currentPage * postPerPage,
  );

  // 페이지네이션을 위해 총 페이지 계산
  const totalItems = getBookingsByTab().length;
  const totalPages = Math.ceil(totalItems / postPerPage);

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
            className={`tab ${activeTab === "cancelled" ? "active" : ""}`}
            onClick={() => {
              handleTabClick("cancelled");
            }}
          >
            취소내역
          </div>
        </div>

        {/* 이용 예정 */}
        {activeTab === "upcoming" && (
          <div className="container">
            {bookingsToShow.length > 0 ? (
              bookingsToShow.map((booking, index) => (
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
              {bookingsToShow.length > 0 ? (
                bookingsToShow.map((booking, index) => (
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
        {activeTab === "cancelled" && (
          <>
            <div className="container">
              {bookingsToShow.length > 0 ? (
                bookingsToShow.map((booking, index) => (
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
        <ListPagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={postPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </WrapStyle>
  );
};

export default BookingDetail;
