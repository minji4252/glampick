import axios from "axios";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { Link } from "react-router-dom";
import AlertModal from "../components/common/AlertModal";
import { ActionButton, MainButton } from "../components/common/Button";
import useModal from "../hooks/UseModal";
import GlampingDetailStyle, {
  InfoGroup,
  OptionItems,
  ReviewContent,
  ReviewTitle,
  RoomCard,
  RoomCardBooking,
  RoomCardLeft,
  RoomCardRight,
  RoomInfo,
  RoomInfomation,
  RoomIntro,
  RoomLocation,
  RoomOption,
  RoomPic,
  RoomProperty,
  RoomReview,
  RoomSelect,
  RoomSelectTitle,
  RoomTitle,
  UnderLine,
} from "../styles/GlampingDetailStyle";

const GlampingDetail = () => {
  const [isLiked, setIsLiked] = useState(false);
  const { openModal, closeModal } = useModal();
  const [alertMessage, setAlertMessage] = useState("");

  const toggleLike = async () => {
    try {
      const res = await axios.get(`/api/glamping/favorite`);
      if (res.data.resultValue === 1) {
        setIsLiked(true);
        setAlertMessage("관심 글램핑장 목록에 추가되었습니다");
      } else if (res.data.resultValue === 0) {
        setIsLiked(false);
        setAlertMessage("관심 글램핑장 목록에서 삭제되었습니다");
      }
      openModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GlampingDetailStyle>
      <div className="inner">
        <RoomProperty>
          <RoomPic>
            <div className="main-img" />
          </RoomPic>
          <RoomTitle>
            <span>그린 파인트리글램핑&카라반</span>
            <button onClick={toggleLike}>
              {isLiked ? <GoHeartFill /> : <GoHeart />}
            </button>
          </RoomTitle>
          <RoomReview>
            <ReviewTitle>
              <FaStar />
              <div className="review-score">5.0</div>
              <div className="review-evaluat">1557명 평가</div>
              <Link to="/review">
                <button>리뷰보기</button>
              </Link>
            </ReviewTitle>
            <ReviewContent>
              <div className="review-content">
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
                    포기해야겠지 했는데 다들 규칙들을 너무 잘 지켜 주셔서
                    조용해서 너무너무 좋았어요!! -리뷰작성자
                  </p>
                </div>
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
          <div className="view-all">
            <ActionButton label="모두 보기" />
          </div>
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
      {/* <AlertModal
        isOpen={openModal}
        onClose={closeModal}
        message={alertMessage}
      /> */}
    </GlampingDetailStyle>
  );
};

export default GlampingDetail;
