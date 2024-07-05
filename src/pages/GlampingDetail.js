import styled from "@emotion/styled";
import { FaStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoHeartSharp } from "react-icons/io5";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MainButton } from "../components/common/Button";
import optionBarbecue from "../images/icon/filter-barbecue.png";
import optionMountain from "../images/icon/filter-mountain.png";
import optionOcean from "../images/icon/filter-ocean.png";
import optionPet from "../images/icon/filter-pet.png";
import optionSwim from "../images/icon/filter-swim.png";
import optionToilet from "../images/icon/filter-toilet.png";
import optionWifi from "../images/icon/filter-wifi.png";
import Image from "../images/pic.jpg";
import Room from "../images/roomin.png";
import { colorSystem, size } from "../styles/color";

const UnderLine = styled.div`
  border-bottom: 1px solid ${colorSystem.g400};
`;

const WrapStyle = styled.div`
  margin-top: 30px;
  .inner {
    flex-direction: column;
    width: 100%;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 700;
  }

  h4:before {
    content: "·";
    font-size: 27px;
    vertical-align: middle;
    margin-right: 5px;
  }

  h4 {
    font-size: 0.95rem;
    line-height: 1.6rem;
    display: flex;
    align-items: center;
    margin-left: 10px;
    font-weight: 300;
  }

  button {
    cursor: pointer;
  }
`;

// 룸 옵션
const RoomProperty = styled.div`
  width: 100%;
`;

// 옵션 1
const RoomPic = styled.div`
  .main-img {
    position: relative;
    background: url(${Image}) no-repeat center;
    background-size: cover;
    width: 100%;
    height: 400px;
  }
`;

// 옵션 2
const RoomTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 70px;
  position: relative;

  svg {
    /* 임시 색깔 */
    color: ${colorSystem.error};
    font-size: 3rem;
    position: absolute;
    right: 100px;
    bottom: 5px;
  }
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
    color: ${colorSystem.star};
  }
`;

const ReviewContent = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 20px;
  align-items: center;

  .review-content-item {
    width: 100%;
    max-width: 480px;
    height: 130px;
    background-color: ${colorSystem.beige};
    padding: 20px;
    border-radius: 12px;
    line-height: 1.3rem;
    > p {
      color: ${colorSystem.g700};
      font-size: 0.9rem;
      overflow: hidden;
      height: 80px;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }

  .review-more {
    max-width: 50px;
    min-width: 50px;
    height: fit-content;
    color: ${colorSystem.primary};
    display: flex;
    align-items: center;
    margin-left: 40px;

    button {
      background-color: transparent;
      border: 0px;
      font-family: "Pretendard Variable";
      font-weight: 700;
      color: ${colorSystem.primary};
      height: 20px;
    }

    ${size.mid} {
      margin-left: 0px;
    }
  }
`;

// 옵션 4
const RoomOption = styled.div`
  margin-top: 20px;

  .option-title {
    margin: 15px 0 15px 10px;
  }
`;

const OptionItems = styled.div`
  margin-left: 20px;
  display: flex;
  gap: 25px;

  .option-item {
    display: flex;
    background-size: auto;
    gap: 30px;
    > div {
      width: 65px;
      height: 55px;
    }
    .option-pet {
      background: url(${optionPet}) no-repeat center;
    }
    .option-ocean {
      background: url(${optionOcean}) no-repeat center;
    }
    .option-mountain {
      background: url(${optionMountain}) no-repeat center;
    }
    .option-swim {
      background: url(${optionSwim}) no-repeat center;
    }
    .option-toilet {
      background: url(${optionToilet}) no-repeat center;
    }
    .option-wifi {
      background: url(${optionWifi}) no-repeat center;
    }
    .option-barbecue {
      background: url(${optionBarbecue}) no-repeat center;
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
`;

const RoomCard = styled.div`
  width: 90%;
  display: flex;
  gap: 20px;
  background-color: ${colorSystem.background};
  padding: 20px;
  margin-top: 20px;
  border-radius: 16px;

  ${size.mid} {
    flex-direction: column;
    div {
      max-width: 635px;
      width: 100%;
    }
  }
`;

const RoomCardLeft = styled.div`
  max-width: 400px;
  width: 100%;

  .roomcard-img {
    width: 100%;
    height: 240px;
    background: url(${Room}) no-repeat center;
    background-size: cover;
    position: relative;
  }

  .roomcard-img:hover {
    span {
      display: block;
      cursor: pointer;
    }
  }

  .roomcard-img {
    span {
      background-color: rgba(0, 0, 0, 0.3);
      width: 100%;
      position: absolute;
      display: none;
      color: ${colorSystem.g100};
      font-size: 1.6rem;
      text-align: center;
      line-height: 240px;
      font-weight: 200;
    }
  }
`;

const RoomCardRight = styled.div`
  margin-top: 10px;
  width: 100%;

  > span {
    font-weight: 700;
    font-size: 1.1rem;
  }

  > div {
    font-weight: 300;
    background-color: ${colorSystem.white};
    border-radius: 10px;
    padding: 15px;
    width: 100%;
  }

  .roomcard-txt {
    margin-top: 10px;
    > div {
      display: flex;
      gap: 35px;
    }

    span,
    p {
      font-weight: 500;
      color: ${colorSystem.g700};
    }
  }

  .txt-top {
    margin-bottom: 5px;
  }
`;

const RoomCardBooking = styled.div`
  margin-top: 40px;
  height: 145px;
  position: relative;

  > p {
    margin-bottom: 20px;
    font-weight: 400;
    color: ${colorSystem.g800};
    font-size: 0.9rem;
  }

  > span {
    font-size: 1rem;
    font-weight: 600;
    position: absolute;
    right: 15px;
    bottom: 70px;
  }

  button {
    position: absolute;
    right: 15px;
    bottom: 15px;
  }
`;

//객실 정보
const RoomInfo = styled.div`
  width: 100%;

  h3 {
    margin: 20px 0;
  }
`;

const RoomIntro = styled.div`
  margin-top: 20px;
  position: relative;

  svg {
    color: ${colorSystem.g200};
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  > div {
    position: absolute;
    right: 0;
  }

  > p {
    font-weight: 600;
    color: ${colorSystem.g600};
    font-size: 1rem;
    line-height: 1.3rem;
    letter-spacing: 1px;
  }
`;
const RoomInfomation = styled.div`
  margin-top: 40px;
`;
const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  .info-item {
    > span {
      color: ${colorSystem.primary};
      font-weight: 500;
    }

    > div {
      margin-top: 15px;
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

    > div {
      margin-top: 15px;
    }
  }
`;

const GlampingDetail = () => {
  return (
    <WrapStyle>
      <div className="inner">
        <RoomProperty>
          <RoomPic>
            <div className="main-img" />
          </RoomPic>
          <RoomTitle>
            <span>그린 파인트리글램핑&카라반</span>
            <IoHeartSharp />
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
                <p>
                  위치: 포천 끝자락 들어가는 초입이 약간 좁고 헷갈리긴하나 딱
                  헷갈 릴 때쯤 표지판이 나옵니다. 들어가는 초입에 사무실이
                  있습니다. 객실: 일단 굉장히 널찍 널찍하고 무엇보다 앞에
                  백운계곡이 있어서 너무 좋습니다. 물멍 불멍 모두 편합니다.
                  -리뷰작성자
                </p>
              </div>
              <div className="review-content-item">
                <p>
                  진짜 너무너무 좋은 숙소였어요~!캠핑&글램핑숙소여서 숙면은
                  포기해야겠지 했는데 다들 규칙들을 너무 잘 지켜 주셔서 조용해서
                  너무너무 좋았어요!! -리뷰작성자
                </p>
              </div>
              <div className="review-more">
                <button>더보기</button>
                <IoIosArrowForward />
              </div>
            </ReviewContent>
          </RoomReview>
          <RoomOption>
            <UnderLine />
            <h3 className="option-title">테마</h3>
            <OptionItems>
              <div className="option-item">
                <div className="option-pet" />
                <div className="option-ocean" />
                <div className="option-wifi" />
              </div>
            </OptionItems>
          </RoomOption>
        </RoomProperty>

        <RoomSelect>
          <UnderLine />
          <RoomSelectTitle>
            <h3>객실선택</h3>
          </RoomSelectTitle>
          <RoomCard>
            <RoomCardLeft>
              <Link to="/roomdetail">
                <div className="roomcard-img">
                  <span>사진 더보기</span>
                </div>
              </Link>
            </RoomCardLeft>
            <RoomCardRight>
              <span>감성카라반</span>
              <RoomCardBooking>
                <p>입실 15:00</p>
                <p>퇴실 11:00</p>
                <span>148,000원</span>
                <Link to="/payment">
                  <MainButton label="객실 예약" />
                </Link>
              </RoomCardBooking>
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
            </RoomCardRight>
          </RoomCard>
          <RoomCard>
            <RoomCardLeft>
              <Link to="/roomdetail">
                <div className="roomcard-img">
                  <span>사진 더보기</span>
                </div>
              </Link>
            </RoomCardLeft>
            <RoomCardRight>
              <span>감성카라반</span>
              <RoomCardBooking>
                <p>입실 15:00</p>
                <p>퇴실 11:00</p>
                <span>148,000원</span>
                <Link to="/payment">
                  <MainButton label="객실 예약" />
                </Link>
              </RoomCardBooking>
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
            </RoomCardRight>
          </RoomCard>
          <RoomCard>
            <RoomCardLeft>
              <Link to="/roomdetail">
                <div className="roomcard-img">
                  <span>사진 더보기</span>
                </div>
              </Link>
            </RoomCardLeft>
            <RoomCardRight>
              <span>감성카라반</span>
              <RoomCardBooking>
                <p>입실 15:00</p>
                <p>퇴실 11:00</p>
                <span>148,000원</span>
                <Link to="/payment">
                  <MainButton label="객실 예약" />
                </Link>
              </RoomCardBooking>
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
            </RoomCardRight>
          </RoomCard>
          <RoomCard>
            <RoomCardLeft>
              <Link to="/roomdetail">
                <div className="roomcard-img">
                  <span>사진 더보기</span>
                </div>
              </Link>
            </RoomCardLeft>
            <RoomCardRight>
              <span>감성카라반</span>
              <RoomCardBooking>
                <p>입실 15:00</p>
                <p>퇴실 11:00</p>
                <span>148,000원</span>
                <Link to="/payment">
                  <MainButton label="객실 예약" />
                </Link>
              </RoomCardBooking>
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
            </RoomCardRight>
          </RoomCard>
        </RoomSelect>

        <RoomInfo>
          <RoomIntro>
            <UnderLine />
            <h3>숙소 소개</h3>
            <RiDoubleQuotesL />
            <p>
              서울 잠실 40분 거리에 2022년 11월 신축 오픈 캠핑장입니다. <br />
              남이섬, 쁘띠프랑스, 설악 양떼목장 등 다양한 주변 명소가 있습니다.
            </p>
            <div>
              <RiDoubleQuotesR />
            </div>
          </RoomIntro>
          <RoomInfomation>
            <UnderLine />
            <h3>숙소 이용정보</h3>
            <InfoGroup>
              <div className="info-item">
                <span>기본정보</span>
                <div>
                  <h4>
                    입실 : 15:00 | 퇴실 : 11:00 (퇴실시간 이후 30분당 오버타임
                    요금 부과됩니다 퇴실시간을 꼭 지켜주세요)
                  </h4>
                  <h4>22시 이후 입실 시 사전문의 (필수)</h4>
                  <h4>전 객실 금연</h4>
                  <h4>주차 가능 (1대 주차 무료 / 1대 추가시 10,000원)</h4>
                </div>
              </div>
              <div className="info-item">
                <span>주차장정보</span>
                <div>
                  <h4>주차장정보가 들어갑니다</h4>
                  <h4>주차 가능 (1대 주차 무료 / 1대 추가시 10,000원)</h4>
                </div>
              </div>
              <div className="info-item">
                <span>유의사항</span>
                <div>
                  <h4>최대 인원 초과시 입실이 불가 합니다 (방문객 불가)</h4>
                  <h4>객실 내 육류, 튀김류, 생선류 조리를 할 수 없습니다</h4>
                  <h4>전 객실 애완동물 출입이 불가합니다</h4>
                  <h4>보호자 동반없는 미성년자는 이용하실 수 없습니다</h4>
                </div>
              </div>
            </InfoGroup>
          </RoomInfomation>
          <RoomLocation>
            <UnderLine />
            <h3>위치</h3>
            <p></p>
            <div className="location-info">
              <span>경기 포천시 이동면 연곡리 932</span>
              <div>
                <h4>산사원 차량 15분</h4>
                <h4>산정호수 차량 10분</h4>
                <h4>아트밸리 차량 20분</h4>
              </div>
            </div>
            <UnderLine />
          </RoomLocation>
        </RoomInfo>
      </div>
    </WrapStyle>
  );
};

export default GlampingDetail;
