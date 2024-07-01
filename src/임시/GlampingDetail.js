import styled from "@emotion/styled";
import { FaStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { RiDoubleQuotesL } from "react-icons/ri";
import { MainButton } from "../components/common/Button";
import Image from "../images/pic.jpg";
import Room from "../images/roomin.png";
import { colorSystem } from "../styles/color";

const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }
`;

// 룸 옵션
const RoomProperty = styled.div``;

// 옵션 1
const RoomPic = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 8px;

  .main-img {
    grid-row: span 2 / span 2;
    position: relative;
    background: url(${Image}) no-repeat center;
    background-size: cover;
    size: 100vw;
    width: 640px;
    height: 490px;
  }

  .sub-img {
    grid-column: span 1 / span 1;
    background: yellow;
    position: relative;
    width: 270px;
    height: 240px;
  }
`;

// 옵션 2
const RoomTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 70px;
`;

// 옵션 3
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
    background-color: transparent;
    border: 0px;
    font-family: "Pretendard Variable";
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
    background-color: ${colorSystem.beige};
    padding: 20px;
    border-radius: 12px;
    line-height: 1.3rem;
    color: ${colorSystem.g700};
    font-size: 0.9rem;
  }

  .review-more {
    color: ${colorSystem.primary};
    button {
      background-color: transparent;
      border: 0px;
      font-family: "Pretendard Variable";
    }
  }
`;

// 옵션 4
const RoomOption = styled.div`
  margin-top: 20px;

  .option-title {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 15px 0 10px 10px;
  }
`;

const OptionItems = styled.div`
  margin-left: 20px;
  display: flex;
  gap: 25px;

  .option-item {
    > div {
      width: 40px;
      height: 30px;
      background-color: yellow;
    }
    > span {
      font-weight: 700;
      font-size: 0.9rem;
    }
  }
`;

// 객실선택
const RoomSelect = styled.div`
  width: 100%;
  margin-top: 20px;
`;
const RoomSelectTitle = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;

  > span {
    font-weight: 800;
    font-size: 1.1rem;
  }
`;
const RoomCard = styled.div`
  display: flex;
  gap: 20px;
  background-color: ${colorSystem.background};
  padding: 20px;
  margin-top: 20px;
  border-radius: 16px;

  .roomcard-left {
    > div {
      width: 400px;
      height: 240px;
      background: url(${Room}) no-repeat center;
      background-size: cover;
    }
  }

  .roomcard-right {
    margin-top: 10px;
    width: 100%;

    > span {
      font-weight: 700;
    }

    > div {
      font-weight: 300;
      background-color: ${colorSystem.white};
      border-radius: 10px;
      padding: 15px;
      width: 100%;
    }

    .roomcard-booking {
      margin-top: 40px;
      height: 145px;
      position: relative;

      > p {
        margin-bottom: 20px;
      }

      > span {
        font-weight: 600;
        position: absolute;
        right: 15px;
        bottom: 70px;
      }

      > button {
        position: absolute;
        right: 15px;
        bottom: 15px;
      }
    }

    .roomcard-txt {
      margin-top: 10px;
      > div {
        display: flex;
        gap: 35px;
      }
      .txt-top {
        margin-bottom: 5px;
      }
    }
  }
`;

//객실 정보
const RoomInfo = styled.div`
  width: 100%;

  h3 {
    font-weight: 700;
    margin: 20px 0;
  }

  ul {
    margin-top: 20px;
    margin-left: 30px;
    font-weight: 300;
    line-height: 1.5rem;
    font-size: 0.8rem;
  }

  li {
    list-style: disc;
  }

  /* li:before {
    content: "·";
    font-size: 30px;
    vertical-align: middle;
    margin-right: 5px;
  } */
`;

const RoomIntro = styled.div`
  margin-top: 20px;

  > svg {
    color: ${colorSystem.g200};
    font-size: 1.3rem;
    margin-bottom: 10px;
  }

  > p {
    font-weight: 700;
    color: ${colorSystem.g700};
    font-size: 0.8rem;
    line-height: 1rem;
  }
`;
const RoomInfomation = styled.div`
  margin-top: 40px;

  .info-item {
    > span {
      color: ${colorSystem.primary};
    }
  }
`;
const RoomLocation = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;

  > p {
    width: 100%;
    height: 500px;
    background-color: lightblue;
    border-radius: 20px;
  }

  .location-info {
    margin-top: 10px;
    margin-bottom: 40px;
    > span {
      color: ${colorSystem.g500};
      font-weight: 600;
      font-size: 0.9rem;
    }
  }
`;

const RoomDetail = () => {
  return (
    <WrapStyle>
      <div className="inner">
        <RoomProperty>
          <RoomPic>
            <div className="main-img"></div>
            <div className="sub-img"></div>
            <div className="sub-img"></div>
            <div className="sub-img"></div>
            <div className="sub-img"></div>
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
          <RoomOption>
            <hr />
            <div className="option-title">서비스 및 부대시설</div>
            <OptionItems>
              <div className="option-item">
                <div></div>
                <span>수영장</span>
              </div>
              <div className="option-item">
                <div></div>
                <span>반려동물</span>
              </div>
            </OptionItems>
          </RoomOption>
        </RoomProperty>
        <RoomSelect>
          <hr />
          <RoomSelectTitle>
            <span>객실선택</span>
          </RoomSelectTitle>
          <RoomCard>
            <div className="roomcard-left">
              <div></div>
            </div>
            <div className="roomcard-right">
              <span>감성카라반</span>
              <div className="roomcard-booking">
                <p>입실 15:00</p>
                <p>퇴실 11:00</p>
                <span>148,000원</span>
                <MainButton label="객실 예약" />
              </div>
              <div className="roomcard-txt">
                <div className="txt-top">
                  <span>객실정보</span>
                  <p>기준 2일 ~ 최대 4인 (유료)</p>
                </div>
                <div>
                  <span>추가정보</span>
                  <p>바닥난방 / 온풍기 / 개별화장실 완비</p>
                </div>
              </div>
            </div>
          </RoomCard>
          <RoomCard>
            <div className="roomcard-left">
              <div></div>
            </div>
            <div className="roomcard-right">
              <span>감성카라반</span>
              <div className="roomcard-booking">
                <p>입실 15:00</p>
                <p>퇴실 11:00</p>
                <span>148,000원</span>
                <MainButton label="객실 예약" />
              </div>
              <div className="roomcard-txt">
                <div className="txt-top">
                  <span>객실정보</span>
                  <p>기준 2일 ~ 최대 4인 (유료)</p>
                </div>
                <div>
                  <span>추가정보</span>
                  <p>바닥난방 / 온풍기 / 개별화장실 완비</p>
                </div>
              </div>
            </div>
          </RoomCard>
          <RoomCard>
            <div className="roomcard-left">
              <div></div>
            </div>
            <div className="roomcard-right">
              <span>감성카라반</span>
              <div className="roomcard-booking">
                <p>입실 15:00</p>
                <p>퇴실 11:00</p>
                <span>148,000원</span>
                <MainButton label="객실 예약" />
              </div>
              <div className="roomcard-txt">
                <div className="txt-top">
                  <span>객실정보</span>
                  <p>기준 2일 ~ 최대 4인 (유료)</p>
                </div>
                <div>
                  <span>추가정보</span>
                  <p>바닥난방 / 온풍기 / 개별화장실 완비</p>
                </div>
              </div>
            </div>
          </RoomCard>
        </RoomSelect>

        <RoomInfo>
          <RoomIntro>
            <hr />
            <h3>숙소 소개</h3>
            <RiDoubleQuotesL />
            <p>
              서울 잠실 40분 거리에 2022년 11월 신축 오픈 캠핑장입니다. <br />
              남이섬, 쁘띠프랑스, 설악 양떼목장 등 다양한 주변 명소가 있습니다.
            </p>
          </RoomIntro>
          <RoomInfomation>
            <hr />
            <h3>숙소 이용정보</h3>
            <div className="info-item">
              <span>기본정보</span>
              <ul>
                <li>
                  입실 : 15:00 | 퇴실 : 11:00 (퇴실시간 이후 30분당 오버타임
                  요금 부과됩니다 퇴실시간을 꼭 지켜주세요)
                </li>
                <li>22시 이후 입실 시 사전문의 (필수)</li>
                <li>전 객실 금연</li>
                <li>주차 가능 (1대 주차 무료 / 1대 추가시 10,000원)</li>
              </ul>
            </div>
          </RoomInfomation>
          <RoomLocation>
            <hr />
            <h3>위치</h3>
            <p>지도</p>
            <div className="location-info">
              <span>경기 포천시 이동면 연곡리 932</span>
              <ul>
                <li>산사원 차량 15분</li>
                <li>산정호수 차량 10분</li>
                <li>아트밸리 차량 20분</li>
              </ul>
            </div>
            <hr />
          </RoomLocation>
        </RoomInfo>
      </div>
    </WrapStyle>
  );
};

export default RoomDetail;
