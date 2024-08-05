import styled from "@emotion/styled";
import { colorSystem, size } from "../../styles/color";
import CeoCategories from "../../components/ceo/CeoCategories";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import BookingChart from "../../components/ceo/BookingChart";
import SalesChart from "../../components/ceo/SalesChart";
import CancelChart from "../../components/ceo/CancelChart";

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
  }
`;

const StateStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;

  > div {
    max-width: 100px;
    width: 100%;
    border: 2px solid ${colorSystem.ceo};
    padding: 10px;
    border-radius: 35px;
    font-size: 0.9rem;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      font-size: 1.2rem;
      margin-top: 5px;
    }
  }

  .star-point {
    display: flex;
    align-items: center;
    gap: 4px;

    svg {
      color: ${colorSystem.star};
      font-size: 1.1rem;
    }
  }
`;

const TapStyle = styled.div`
  width: 100%;

  > div {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    justify-content: flex-start;
  }

  li {
    max-width: 200px;
    width: 100%;
    height: 130px;
    border: 1px solid ${colorSystem.g200};
    font-weight: 600;
    color: ${colorSystem.g900};
    font-size: 1.1rem;
    list-style: none;
    border-radius: 12px;
    text-align: center;
    line-height: 130px;
    cursor: pointer;
  }

  .focused {
    background-color: ${colorSystem.ceo300};
    color: ${colorSystem.white};
  }
`;

const ListContent = styled.div`
  width: 100%;
  max-width: 1000px;
  font-size: 2rem;
  margin-bottom: 30vh;
`;

const Chart = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: "예약", content: <BookingChart /> },
    { name: "매출", content: <SalesChart /> },
    { name: "취소율", content: <CancelChart /> },
  ];

  const selectMenuHandler = index => {
    setCurrentTab(index);
  };

  return (
    <WrapStyle>
      <CeoCategories />
      <div className="inner">
        <div className="chart-title">
          <h3>매장 분석</h3>
          <StateStyle>
            <div>
              <h2>북마크</h2>
              <p>2500</p>
            </div>
            <div>
              <h2>별점</h2>
              <div className="star-point">
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
                  {ele.name}
                </li>
              );
            })}
          </div>
        </TapStyle>

        <ListContent>{menuArr[currentTab].content}</ListContent>
      </div>
    </WrapStyle>
  );
};

export default Chart;
