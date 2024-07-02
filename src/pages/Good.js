import styled from "@emotion/styled";
import React, { useState } from "react";
import { colorSystem } from "../styles/color";
import { MdOutlineArrowBackIos } from "react-icons/md";

const Good = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: "오픈특가(바베큐 제공, 에어컨...)", content: "오픈특가 룸" },
    { name: "센트럴파크 룸 (에어컨, 냉장고...)", content: "센트럴파크 룸" },
    { name: "엠파이어 룸 (에어컨, 캠프파이...)", content: "엠파이어 룸" },
    { name: "메트로폴리탄 룸 (에어컨, 냉장...)", content: "메트로폴리탄 룸" },
  ];

  const selectMenuHandler = index => {
    setCurrentTab(index);
  };

  const WrapStyle = styled.div`
    .inner {
      flex-direction: column;
    }
  `;

  const TitleStyle = styled.div`
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;

    svg {
      position: absolute;
      left: 0;
      font-size: 1.2rem;
      color: ${colorSystem.g900};
      cursor: pointer;
    }

    h1 {
      font-size: 1.2rem;
      font-weight: 700;
      color: ${colorSystem.g900};
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
      border: 1px solid ${colorSystem.g200};
      font-weight: 600;
      color: ${colorSystem.g900};
      font-size: 0.9rem;
      list-style: none;
      padding: 8px 20px;
      border-radius: 100px;
      cursor: pointer;
    }

    .focused {
      background-color: ${colorSystem.primary};
      color: ${colorSystem.white};
    }
  `;

  const BoxStyle = styled.div`
    width: 100%;
    height: 660px;
    background-color: ${colorSystem.background};
  `;

  return (
    <WrapStyle>
      <div className="inner">
        <TitleStyle>
          <MdOutlineArrowBackIos />
          <h1>뉴욕스카이</h1>
        </TitleStyle>
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
        <BoxStyle></BoxStyle>
        <h1>{menuArr[currentTab].content}</h1>
      </div>
    </WrapStyle>
  );
};

export default Good;
