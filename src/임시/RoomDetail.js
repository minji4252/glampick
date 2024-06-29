import styled from "@emotion/styled";
import React from "react";
import Image from "../images/pic.jpg";
import { FaStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { colorSystem } from "../styles/color";

const WrapStyle = styled.div`
  button {
    background-color: transparent;
    border: 0px;
    font-family: "Pretendard Variable";
  }
`;

const RoomProperty = styled.div``;
const RoomPic = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 8px;

  .main-pic {
    grid-row: span 2 / span 2;
    position: relative;
    background: url(${Image}) no-repeat center;
    background-size: cover;
    size: 100vw;
    width: 640px;
    height: 490px;
  }

  .sub-pic {
    grid-column: span 1 / span 1;
    background: yellow;
    position: relative;
    width: 270px;
    height: 240px;
  }
`;

const RoomTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 80px;
`;

const RoomReview = styled.div`
  margin-top: 25px;
`;

const ReviewTitle = styled.div`
  display: flex;
  gap: 5px;
  font-weight: 700;

  .review-evaluat {
    color: ${colorSystem.g400};
  }

  > button {
    font-weight: 800;
    color: #1273e4;
  }

  > svg {
    color: #ffd233;
  }
`;

const ReviewContent = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 20px;

  .review-content-item {
    width: 100%;
    max-width: 480px;
    height: 130px;
    background-color: #f8f8f8;
    padding: 20px;
    border-radius: 12px;
    line-height: 1.4rem;
    color: ${colorSystem.g500};
    font-size: 0.9rem;
  }

  .review-more {
    color: ${colorSystem.primary};
  }
`;

const RoomService = styled.div``;

const RoomSelect = styled.div``;
const RoomSelectTitle = styled.div``;
const RoomItemInfo = styled.div``;

const RoomInfo = styled.div``;
const RoomIntro = styled.div``;
const RoomInfomation = styled.div``;
const RoomLocation = styled.div``;

const RoomDetail = () => {
  return (
    <WrapStyle>
      <div className="inner">
        <RoomProperty>
          <RoomPic>
            <div className="main-pic"></div>
            <div className="sub-pic"></div>
            <div className="sub-pic"></div>
            <div className="sub-pic"></div>
            <div className="sub-pic"></div>
          </RoomPic>
          <RoomTitle>
            <span>그린 파인트리글램핑&카라반</span>
          </RoomTitle>
          <RoomReview>
            <ReviewTitle>
              <FaStar />
              <div className="review-score">9.5</div>
              <div className="review-evaluat">1557명 평가</div>
              <button>리뷰보기</button>
            </ReviewTitle>
            <ReviewContent>
              <div className="review-content-item">
                위치: 포천 끝자락 들어가는 초입이 약간 좁고 헷갈리긴하나 딱 헷갈
                릴 때쯤 표지판이 나옵니다. 들어가는 초입에 사무실이 있습니다.
                객실: 일단 굉장히 널찍 널찍하고 무엇보다 앞에 백운계곡이 있어서
                너무 좋습니다. 물멍 불멍 모두 편합니다. -리뷰작성자
              </div>
              <div className="review-content-item">
                진짜 너무너무 좋은 숙소였어요~!캠핑&글램핑숙소여서 숙면은
                포기해야겠지 했는데 다들 규칙들을 너무 잘 지켜 주셔서 조용해서
                너무너무 좋았어요!! -리뷰작성자
              </div>
              <div className="review-more">
                <button>더보기</button>
                <IoIosArrowForward />
              </div>
            </ReviewContent>
          </RoomReview>
          <RoomService></RoomService>
        </RoomProperty>
        <RoomSelect>
          <RoomSelectTitle></RoomSelectTitle>
          <RoomItemInfo></RoomItemInfo>
        </RoomSelect>
        <RoomInfo>
          <RoomIntro></RoomIntro>
          <RoomInfomation></RoomInfomation>
          <RoomLocation></RoomLocation>
        </RoomInfo>
      </div>
    </WrapStyle>
  );
};

export default RoomDetail;
