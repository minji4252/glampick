import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaBookmark } from "react-icons/fa";
import {
  getBookingData,
  getCancelData,
  getRevenueData,
} from "../../apis/ceochartapi";
import BookingChart from "../../components/ceo/BookingChart";
import CancelChart from "../../components/ceo/CancelChart";
import CeoCategories from "../../components/mypage/CeoCategories";
import SalesChart from "../../components/ceo/SalesChart";
import {
  ChartCalendarStyle,
  ChartLoading,
  ChartWrapStyle,
  ListContent,
  StateStyle,
  TapStyle,
} from "../../styles/ceo/ChartStyle";
import useFetchAccessToken from "../../utils/CeoAccessToken";
import SearchCalendar from "../../components/search/SearchCalendar";
import LoadingNobg from "../../components/common/LoadingNobg";

const Chart = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [starPointAvg, setStarPointAvg] = useState(0);
  const [heart, setHeart] = useState(0);
  const [bookingData, setBookingData] = useState([]);
  const [totalBookingData, setTotalBookingData] = useState(0);
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenueData, setTotalRevenueData] = useState(0);
  const [cancelData, setCancelData] = useState([]);
  const [startDayId, setStartDayId] = useState(null);
  const [endDayId, setEndDayId] = useState(null);
  const [currentPeriod, setCurrentPeriod] = useState("weekly");
  const [currentPeriodBtn, setCurrentPeriodBtn] = useState("weekly");
  const ceoAccessToken = useFetchAccessToken();
  const [loading, setLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState([null, null]);

  // 날짜 형식 변환
  const formatDate = date => date.toISOString().split("T")[0];

  // 주간 버튼 클릭 시
  const handleWeeklyClick = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 7));
    const startDay = formatDate(startOfWeek);
    const endDay = formatDate(endOfWeek);

    setStartDayId(startDay);
    setEndDayId(endDay);
    setCurrentPeriod("daily");
    setCurrentPeriodBtn("weekly");
    setShowCalendar(false);
  };

  // 월간 버튼 클릭 시
  const handleMonthlyClick = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    setStartDayId(formatDate(start));
    setEndDayId(formatDate(end));
    setCurrentPeriod("weekly");
    setCurrentPeriodBtn("monthly");
    setShowCalendar(false);
  };

  // 기간 설정 클릭 시 토글
  const handleCustomClick = () => {
    setShowCalendar(prev => !prev);
    setCurrentPeriod("monthly");
    setCurrentPeriodBtn("custom");
  };

  // 기간 직접 설정시
  useEffect(() => {
    if (selectedDate[0] && selectedDate[1]) {
      const startDate = new Date(selectedDate[0]);
      const endDate = new Date(selectedDate[1]);

      startDate.setDate(startDate.getDate() + 1);
      endDate.setDate(endDate.getDate() + 1);

      const startDay = formatDate(startDate);
      const endDay = formatDate(endDate);

      setStartDayId(startDay);
      setEndDayId(endDay);
      setCurrentPeriodBtn("custom");

      const diffInDays = Math.ceil(
        (endDate - startDate) / (1000 * 60 * 60 * 24),
      );

      if (diffInDays < 7) {
        setCurrentPeriod("daily");
      } else if (diffInDays <= 30) {
        setCurrentPeriod("weekly");
      } else {
        setCurrentPeriod("monthly");
      }
    }
  }, [selectedDate]);

  const formattedCancelResult = isNaN(cancelData.formattedResult)
    ? 0
    : cancelData.formattedResult;

  const menuArr = [
    {
      name: "예약",
      count: `${totalBookingData ?? 0}`,
      content: <BookingChart data={bookingData} period={currentPeriod} />,
    },
    {
      name: "매출",
      count: `${(totalRevenueData ?? 0).toLocaleString()}원`,
      content: <SalesChart data={revenueData} period={currentPeriod} />,
    },
    {
      name: "취소율",
      count: `${formattedCancelResult}%`,
      content: <CancelChart data={cancelData} />,
    },
  ];

  const selectMenuHandler = index => {
    setCurrentTab(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!ceoAccessToken) return;

        const fetchBookingData = async () => {
          const response = await getBookingData(
            ceoAccessToken,
            startDayId,
            endDayId,
          );
          if (response.code === "SU") {
            setBookingData(response.popularRooms);
            setTotalBookingData(response.total);
          }
        };

        const fetchRevenueData = async () => {
          const response = await getRevenueData(
            ceoAccessToken,
            startDayId,
            endDayId,
          );
          if (response.code === "SU") {
            setRevenueData(response.revenue);
            setTotalRevenueData(response.totalPay);
          }
        };

        const fetchCancelData = async () => {
          const response = await getCancelData(
            ceoAccessToken,
            startDayId,
            endDayId,
          );
          if (response.code === "SU") {
            setCancelData(response);
          }
        };

        await fetchBookingData();
        await fetchRevenueData();
        await fetchCancelData();
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (startDayId && endDayId) {
      fetchData();
    }
  }, [ceoAccessToken, startDayId, endDayId]);

  useEffect(() => {
    handleWeeklyClick(); // 기본값은 주간 데이터

    const fetchData = async () => {
      try {
        if (!ceoAccessToken) return;
        const response = await axios.get(`/api/owner/starheart`, {
          headers: {
            Authorization: `Bearer ${ceoAccessToken}`,
          },
        });
        if (response.data.code === "SU") {
          setStarPointAvg(response.data.point[0].starPointAvg);
          setHeart(response.data.point[0].heart);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [ceoAccessToken]);

  return (
    <ChartWrapStyle>
      <CeoCategories />
      <div className="inner">
        {loading ? (
          <ChartLoading>
            <LoadingNobg />
          </ChartLoading>
        ) : (
          <>
            <div className="chart-title">
              <h3>매장 분석</h3>
              <StateStyle>
                <div>
                  <h2>북마크</h2>
                  <div className="bookmark-icon">
                    <FaBookmark />
                    <p>{heart}</p>
                  </div>
                </div>
                <div>
                  <h2>별점</h2>
                  <div className="starpoint-icon">
                    <FaStar />
                    <p>{starPointAvg}</p>
                  </div>
                </div>
              </StateStyle>
            </div>
            <TapStyle>
              <ChartCalendarStyle show={showCalendar}>
                <SearchCalendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  minDate={undefined}
                />
              </ChartCalendarStyle>
              <div className="period-select">
                <span
                  className={`period-weekly ${currentPeriodBtn === "weekly" ? "active" : ""}`}
                  onClick={handleWeeklyClick}
                >
                  주간
                </span>
                <div>·</div>
                <span
                  className={`period-monthly ${currentPeriodBtn === "monthly" ? "active" : ""}`}
                  onClick={handleMonthlyClick}
                >
                  월간
                </span>
                <div>·</div>
                <span
                  className={`period-custom ${currentPeriodBtn === "custom" ? "active" : ""}`}
                  onClick={handleCustomClick}
                >
                  기간설정
                </span>
              </div>
              <div>
                {menuArr.map((ele, index) => (
                  <li
                    key={index}
                    className={
                      currentTab === index ? "submenu focused" : "submenu"
                    }
                    onClick={() => selectMenuHandler(index)}
                  >
                    {ele.name} <p>{ele.count}</p>
                  </li>
                ))}
              </div>
              <ListContent>{menuArr[currentTab].content}</ListContent>
            </TapStyle>
          </>
        )}
      </div>
    </ChartWrapStyle>
  );
};

export default Chart;
