import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import {
  getBookingData,
  getCancelData,
  getRevenueData,
} from "../../apis/ceochartapi";
import BookingChart from "../../components/ceo/BookingChart";
import CancelChart from "../../components/ceo/CancelChart";
import CeoCategories from "../../components/ceo/CeoCategories";
import SalesChart from "../../components/ceo/SalesChart";
import {
  ChartWrapStyle,
  ListContent,
  StateStyle,
  TapStyle,
} from "../../styles/ceo/ChartStyles";
import useFetchAccessToken from "../../utils/CeoAccessToken";
import SearchCalendar from "../../components/search/SearchCalendar";

const Chart = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [starPointAvg, setStarPointAvg] = useState(0);
  const [heart, setHeart] = useState(0);
  const [bookingData, setBookingData] = useState([]);
  const [totalBookingData, setTotalBookingData] = useState(0);
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenueData, setTotalRevenueData] = useState(0);
  const [cancelData, setCancelData] = useState([]);
  const [startDayId, setStartDayId] = useState("2024-08-01");
  const [endDayId, setEndDayId] = useState("2024-08-07");
  const [isWeekly, setIsWeekly] = useState(true);
  const ceoAccessToken = useFetchAccessToken();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState([null, null]);

  // 이번주 날짜 가져오기
  const getThisWeek = () => {
    const now = new Date();
    const firstDayOfWeek =
      now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1);
    const lastDayOfWeek = firstDayOfWeek + 6;

    const start = new Date(now.setDate(firstDayOfWeek));
    const end = new Date(now.setDate(lastDayOfWeek));

    const formatDate = date => date.toISOString().split("T")[0];

    return {
      startDayId: formatDate(start),
      endDayId: formatDate(end),
    };
  };

  // 이번 달 날짜 가져오기
  const getThisMonth = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const formatDate = date => date.toISOString().split("T")[0];

    return {
      startDayId: formatDate(start),
      endDayId: formatDate(end),
    };
  };

  // 기간 설정 클릭시
  const handleCustomClick = () => {
    setShowCalendar(prevState => !prevState);
  };

  const handleWeeklyClick = () => {
    const { startDayId, endDayId } = getThisWeek();
    setStartDayId(startDayId);
    setEndDayId(endDayId);
    setIsWeekly(true);
  };

  const handleMonthlyClick = () => {
    const { startDayId, endDayId } = getThisMonth();
    setStartDayId(startDayId);
    setEndDayId(endDayId);
    setIsWeekly(false);
  };

  const menuArr = [
    {
      name: "예약",
      count: `${totalBookingData ?? 0}`,
      content: <BookingChart data={bookingData} isWeekly={isWeekly} />,
    },
    {
      name: "매출",
      count: `${(totalRevenueData ?? 0).toLocaleString()}원`,
      content: <SalesChart data={revenueData} isWeekly={isWeekly} />,
    },
    {
      name: "취소율",
      count: `${cancelData.formattedResult}%`,
      content: <CancelChart data={cancelData} />,
    },
  ];

  const selectMenuHandler = index => {
    setCurrentTab(index);
  };

  useEffect(() => {
    // 예약 수
    const fetchBookingData = async () => {
      try {
        if (!ceoAccessToken) return;
        const response = await getBookingData(
          ceoAccessToken,
          startDayId,
          endDayId,
        );
        if (response.code === "SU") {
          setBookingData(response.popularRooms);
          setTotalBookingData(response.total);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // 매출
    const fetchRevenueData = async () => {
      try {
        if (!ceoAccessToken) return;

        const response = await getRevenueData(
          ceoAccessToken,
          startDayId,
          endDayId,
        );
        if (response.code === "SU") {
          setRevenueData(response.revenue);
          setTotalRevenueData(response.totalPay);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // 취소율
    const fetchCancelData = async () => {
      try {
        if (!ceoAccessToken) return;

        const response = await getCancelData(
          ceoAccessToken,
          startDayId,
          endDayId,
        );
        if (response.code === "SU") {
          setCancelData(response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookingData();
    fetchRevenueData();
    fetchCancelData();
  }, [ceoAccessToken, startDayId, endDayId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!ceoAccessToken) return;
        const response = await axios.get(`/api/jin/starheart`, {
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
          <div className="period-select">
            <span className="period-weekly" onClick={handleWeeklyClick}>
              주간
            </span>
            <div>·</div>
            <span className="period-monthly" onClick={handleMonthlyClick}>
              월간
            </span>
            <div>·</div>
            <span className="period-custom" onClick={handleCustomClick}>
              기간설정
            </span>
            {showCalendar && (
              <SearchCalendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            )}
          </div>
          <div>
            {menuArr.map((ele, index) => (
              <li
                key={index}
                className={currentTab === index ? "submenu focused" : "submenu"}
                onClick={() => selectMenuHandler(index)}
              >
                {ele.name} <p>{ele.count}</p>
              </li>
            ))}
          </div>
          <ListContent>{menuArr[currentTab].content}</ListContent>
        </TapStyle>
      </div>
    </ChartWrapStyle>
  );
};

export default Chart;
