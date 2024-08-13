import styled from "@emotion/styled";
import { colorSystem, size } from "../../styles/color";
import CeoCategories from "../../components/ceo/CeoCategories";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import BookingChart from "../../components/ceo/BookingChart";
import SalesChart from "../../components/ceo/SalesChart";
import CancelChart from "../../components/ceo/CancelChart";
import { FaBookmark } from "react-icons/fa6";
import axios from "axios";
import useFetchAccessToken from "../../utils/CeoAccessToken";
import {
  getBookingData,
  getCancelData,
  getRevenueData,
} from "../../apis/ceochartapi";

const ChartWrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }
  h3 {
    width: 100%;
    margin-top: 50px;
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

  .chart-title {
    display: flex;
    width: 100%;
    margin-left: 120px;
  }
`;

const StateStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  margin-top: 35px;
  margin-left: 180px;
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  > div {
    border: 1px solid ${colorSystem.g150};
    max-width: 140px;
    width: 100%;
    padding: 10px;
    font-weight: 500;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.07) 3px 3px 3px 0px;

    h2 {
      color: ${colorSystem.g800};
      font-size: 0.8rem;
      font-weight: 600;
      margin-top: 3px;
    }

    p {
      font-size: 1rem;
      font-family: "Radio Canada", sans-serif !important;
      font-weight: 400;
    }
  }

  .starpoint-icon {
    display: flex;
    align-items: center;
    gap: 4px;

    svg {
      color: ${colorSystem.star};
      font-size: 1.1rem;
    }
  }

  .bookmark-icon {
    display: flex;
    align-items: center;
    gap: 4px;

    svg {
      color: ${colorSystem.error};
      font-size: 1rem;
    }
  }
`;

const TapStyle = styled.div`
  width: 100%;
  max-width: 900px;
  margin-top: 60px;

  .period-select {
    justify-content: flex-end;
  }

  > div {
    width: 100%;
    display: flex;
    gap: 30px;
    margin-bottom: 20px;
  }

  li {
    padding: 7px;
    width: 100%;
    height: 100px;
    border: 1px solid ${colorSystem.g150};
    font-weight: 600;
    color: ${colorSystem.g800};
    font-size: 0.85rem;
    list-style: none;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.07) 3px 3px 3px 0px;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${colorSystem.g100};
    }
  }

  .focused {
    background-color: ${colorSystem.ceo300};
    transition: background-color 0.3s;

    &:hover {
      background-color: ${colorSystem.ceo300};
    }
  }

  p {
    padding: 0;
    width: 100%;
    height: 85%;
    text-align: center;
    line-height: 60px;
    font-weight: 400;
    font-size: 1.5rem;
    font-family: "Radio Canada", sans-serif !important;
  }
`;

const ListContent = styled.div`
  max-width: 900px;

  width: 100%;
  font-size: 2rem;
  margin-bottom: 30vh;
  margin-top: 30px;

  > div {
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.07) 3px 3px 3px 0px;
    border-radius: 12px;
    border: 1px solid ${colorSystem.g150};
  }
`;

const Chart = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [starPointAvg, setStarPointAvg] = useState(0);
  const [heart, setHeart] = useState(0);
  const [bookingData, setBookingData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [cancelData, setCancelData] = useState([]);
  const ceoAccessToken = useFetchAccessToken();

  // 임시
  const startDayId = "2024-07-01";
  const endDayId = "2024-07-15";

  const menuArr = [
    {
      name: "예약",
      count: `21건`,
      content: <BookingChart data={bookingData} />,
    },
    {
      name: "매출",
      count: "520,000원",
      content: <SalesChart data={revenueData} />,
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
        }
      } catch (error) {
        console.log(error);
      }
    };
    //  취소율
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
            <select>
              <option value="weekly">주간</option>
              <option value="monthly">월간</option>
              {/* <option value="custom">사용자 지정</option> */}
            </select>
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
