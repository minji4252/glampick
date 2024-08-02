import styled from "@emotion/styled";
import { colorSystem, size } from "../../styles/color";
import CeoCategories from "../../components/ceo/CeoCategories";
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
`;

const ListStyle = styled.div`
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
  font-size: 2rem;
  margin-bottom: 30vh;
`;

const Chart = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: "예약", content: "예약입니다" },
    { name: "매출", content: "매출입니다" },
    { name: "취소율", content: "취소율입니다" },
  ];

  const selectMenuHandler = index => {
    setCurrentTab(index);
  };

  return (
    <WrapStyle>
      <CeoCategories />
      <div className="inner">
        <h3>매장 분석</h3>
        <ListStyle>
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
        </ListStyle>
        <ListContent>{menuArr[currentTab].content}</ListContent>
      </div>
    </WrapStyle>
  );
};

export default Chart;
