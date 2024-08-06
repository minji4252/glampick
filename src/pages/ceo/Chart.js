import styled from "@emotion/styled";
import { colorSystem, size } from "../../styles/color";
import CeoCategories from "../../components/ceo/CeoCategories";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import BookingChart from "../../components/ceo/BookingChart";
import SalesChart from "../../components/ceo/SalesChart";
import CancelChart from "../../components/ceo/CancelChart";
import { FaBookmark } from "react-icons/fa6";

const ChartWrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }
  h3 {
    width: 55%;
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

  > div {
    border: 1px solid ${colorSystem.g150};
    max-width: 140px;
    width: 100%;
    padding: 10px;
    border-radius: 12px;
    font-weight: 500;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.07) 3px 3px 3px 0px;

    h2 {
      color: ${colorSystem.g800};
      font-size: 0.8rem;
      font-weight: 600;
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
  margin-top: 70px;
  margin-left: 120px;

  > div {
    max-width: 730px;
    width: 100%;

    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }

  li {
    padding-left: 10px;
    padding-top: 5px;
    width: 100%;
    height: 130px;
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
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 90px;
    font-weight: 400;
    font-size: 1.5rem;
    font-family: "Radio Canada", sans-serif !important;
  }
`;

const ListContent = styled.div`
  margin-left: 120px;

  width: 100%;
  font-size: 2rem;
  margin-bottom: 30vh;

  > div {
    max-width: 730px;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.07) 3px 3px 3px 0px;
    border-radius: 12px;
    border: 1px solid ${colorSystem.g150};
  }
`;

const Chart = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: "예약", count: "21건", content: <BookingChart /> },
    { name: "매출", count: "520,000원", content: <SalesChart /> },
    { name: "취소율", count: "4%", content: <CancelChart /> },
  ];

  const selectMenuHandler = index => {
    setCurrentTab(index);
  };

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
                <p>2561</p>
              </div>
            </div>
            <div>
              <h2>별점</h2>
              <div className="starpoint-icon">
                <FaStar />
                <p>5.0</p>
              </div>
            </div>
          </StateStyle>
        </div>
        <TapStyle>
          <div>
            {menuArr.map((ele, index) => {
              return (
                <li
                  key={index}
                  className={
                    currentTab === index ? "submenu focused" : "submenu"
                  }
                  onClick={() => selectMenuHandler(index)}
                >
                  {ele.name} <p>{ele.count}</p>
                </li>
              );
            })}
          </div>
        </TapStyle>
        <ListContent>
          <div>{menuArr[currentTab].content}</div>
        </ListContent>
      </div>
    </ChartWrapStyle>
  );
};

export default Chart;
