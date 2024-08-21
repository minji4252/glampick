import styled from "@emotion/styled";
import { colorSystem, size } from "./color";
import optionBarbecue from "../images/icon/filter-barbecue.png";
import optionMountain from "../images/icon/filter-mountain.png";
import optionOcean from "../images/icon/filter-ocean.png";
import optionPet from "../images/icon/filter-pet.png";
import optionSwim from "../images/icon/filter-swim.png";
import optionToilet from "../images/icon/filter-toilet.png";
import optionWifi from "../images/icon/filter-wifi.png";
import Room from "../images/roomin.png";

export const UnderLine = styled.div`
  border-bottom: 1px solid ${colorSystem.g400};
`;

export const GlampingDetailStyle = styled.div`
  margin-top: 30px;
  .inner {
    flex-direction: column;
    width: 100%;
    padding: 0 20px;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 700;
  }

  h4 {
    font-size: 0.95rem;
    line-height: 1.6rem;
    display: flex;
    align-items: center;
    margin-left: 15px;
    font-weight: 300;
    margin-top: 15px;
    white-space: pre-line;
  }

  button {
    cursor: pointer;
  }

  span,
  p,
  h4,
  h3 {
    cursor: default;
  }
`;

// 로딩
export const GlampingDetailLoading = styled.div`
  div {
    position: static !important;
  }
`;

// 룸 옵션
export const RoomProperty = styled.div`
  width: 100%;
`;

// 옵션 1
export const RoomPic = styled.div`
  .main-img {
    position: relative;
    width: 100%;
    height: 400px;
  }
`;

// 옵션 2
export const RoomTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    margin-right: 90px;
    background-color: transparent;
    border: 0px;
    width: 50px;
    height: 50px;
  }

  div {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
`;

export const RoomAround = styled.div`
  width: fit-content;
  cursor: pointer;
  display: flex;
  gap: 3px;
  color: #1273e4;
  font-weight: 700;
  font-size: 0.95rem;
  margin-top: 7px;

  &:hover {
    color: #0e5ab3;
  }
`;

// 옵션 3
export const RoomReview = styled.div`
  margin-top: 10px;
`;

export const ReviewTitle = styled.div`
  display: flex;
  height: 25px;
  align-items: center;
  gap: 5px;
  font-size: 0.95rem;
  font-weight: 700;

  > div {
    cursor: default;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  > svg {
    color: ${colorSystem.star};
    font-size: 1.1rem;
  }

  .review-score {
    margin-top: 4px;
  }

  .review-evaluat {
    color: ${colorSystem.g400};
    font-weight: 500;
    margin-top: 4px;
  }

  button {
    margin-top: 4px;
    font-weight: 600;
    color: #1273e4;
    background-color: transparent;
    border: 0px;
    font-size: 1rem;

    &:hover {
      color: #0e5ab3;
      font-weight: 700;
    }
  }
`;

export const ReviewSwiper = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  position: relative;

  .swiper {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .swiper-slide {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    max-width: 360px;
    width: 100%;
    height: 150px;
    background-color: ${colorSystem.beige};
    padding: 20px;
    border-radius: 12px;
    line-height: 1.3rem;
    > h2 {
      width: 100%;
      text-align: left;
      color: ${colorSystem.g700};
      font-size: 0.9rem;
      height: 80px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      min-width: 160px;
    }

    h5 {
      width: 100%;
      text-align: right;
      font-size: 0.9rem;
      font-weight: 600;
      margin-top: 10px;
    }
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-pagination {
    display: none;
  }

  &:hover {
    .review-all {
      display: flex;
    }
  }

  .review-all {
    display: none;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    max-width: 83px;
    max-height: 30px;

    button {
      display: flex;
      align-items: center;
      border: 1px solid ${colorSystem.primary};
      padding: 10px;
      border-radius: 30px;
      background-color: ${colorSystem.white};
      font-weight: 700;
      color: ${colorSystem.primary};
      max-height: 30px;

      &:active {
        border: 1px solid ${colorSystem.primary};
        background-color: ${colorSystem.primary};
        color: #fff;
        font-weight: 600;
      }
    }
  }
`;

export const SwiperEndStyle = styled.div`
  height: 100%;
  width: 10%;
  position: absolute;
  top: 0px;
  right: 0px;
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
  --tw-gradient-from: rgba(255, 255, 255, 0);
  --tw-gradient-to: rgba(255, 255, 255, 1);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  z-index: 10;
`;

export const ReviewAll = styled.div`
  width: 100%;
  margin-left: 20px;
  max-width: 50px;
  min-width: 50px;
  height: fit-content;
  color: ${colorSystem.primary};
  display: flex;
  align-items: center;

  button {
    background-color: transparent;
    border: 0px;
    font-family: "Pretendard Variable";
    font-weight: 700;
    color: ${colorSystem.primary};
    height: 20px;
  }

  ${size.mid} {
    margin-left: 30px;
    max-width: 700px;
  }
`;

// 옵션 4
export const RoomOption = styled.div`
  margin-top: 20px;

  .option-title {
    margin: 15px 0 25px 10px;
  }
`;

export const OptionItems = styled.div`
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
export const RoomSelect = styled.div`
  width: 100%;
  margin-top: 20px;

  .view-all {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 25px;

    button {
      width: 250px;
      font-weight: 800;
    }
  }
`;
export const RoomSelectTitle = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const RoomSoldOutCard = styled.div`
  background-color: ${colorSystem.background};
  width: 100%;
  padding: 60px 20px;
  margin-top: 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  svg {
    width: 40px;
    height: 40px;
    color: ${colorSystem.g300};
    margin-bottom: 10px;
  }

  span {
    font-size: 1.2rem;
    color: ${colorSystem.g700};
    font-weight: 700;
  }

  h5 {
    font-size: 1.3rem;
    color: ${colorSystem.g600};
    font-weight: 700;
  }

  p {
    color: ${colorSystem.g600};
  }
`;

export const RoomCard = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  background-color: ${colorSystem.background};
  padding: 20px;
  margin-top: 20px;
  border-radius: 16px;

  ${size.mid} {
    flex-direction: column;
    width: 100%;
    div {
      max-width: 720px;
      width: 100%;
    }
  }
`;

export const RoomCardLeft = styled.div`
  max-width: 400px;
  width: 100%;

  .roomcard-img {
    width: 100%;
    height: 240px;
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

export const RoomCardRight = styled.div`
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

export const RoomCardBooking = styled.div`
  margin-top: 40px;
  height: 145px;
  position: relative;

  p {
    margin-bottom: 20px;
    font-weight: 400;
    color: ${colorSystem.g800};
    font-size: 0.9rem;
  }

  span {
    font-size: 1.1rem;
    font-weight: 600;
    position: absolute;
    right: 15px;
    bottom: 70px;
    font-family: "Radio Canada", sans-serif !important;
  }

  em {
    font-size: 1rem;
    font-weight: 400;
    margin-left: 1px;
  }

  button {
    position: absolute;
    right: 15px;
    bottom: 15px;
  }

  .sold-out-style {
    span {
      color: ${colorSystem.g400};
    }

    button {
      background-color: ${colorSystem.g400};
      color: ${colorSystem.white};
      cursor: default;
    }
  }
`;

//객실 정보
export const RoomInfo = styled.div`
  width: 100%;

  h3 {
    margin: 20px 0;
  }
`;

export const RoomIntro = styled.div`
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
export const RoomInfomation = styled.div`
  margin-top: 40px;
`;
export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  .info-item {
    > span {
      color: ${colorSystem.primary};
      font-weight: 500;
    }
  }

  .info-notice {
    h4 {
      line-height: 0.8rem;
    }
  }
`;

export const RoomLocation = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;

  .location-map {
    width: 100%;
    height: 400px;
  }

  .location-info {
    margin-top: 20px;
    margin-bottom: 40px;

    > span {
      color: ${colorSystem.g500};
      font-weight: 600;
      font-size: 0.9rem;
      display: flex;
      align-items: center;

      svg {
        cursor: pointer;
        margin-left: 15px;
        width: 17px;
        height: 17px;
      }

      span {
        color: ${colorSystem.p200};
        margin-left: 5px;
        font-size: 0.8rem;
      }
    }
  }
`;

export const StickyOptionStyle = styled.div`
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  right: 30px;
  border-radius: 12px;
  padding: 20px;
  background-color: ${colorSystem.white};
  z-index: 999;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${colorSystem.g700};

  .sticky-date div input {
    font-weight: 400;
    color: ${colorSystem.g900};
    font-family: "Radio Canada", sans-serif !important;
    cursor: pointer;
    margin-top: 5px;
    font-size: 1.1rem;

    &:hover {
      color: ${colorSystem.p500};
    }
  }
  .sticky-people {
    margin-top: 20px;
  }
  .sticky-people div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
  }
  .sticky-people div input {
    font-size: 16px;
    font-weight: 400;
    color: ${colorSystem.g900};
    background-color: transparent;
    border: 0;
    font-family: "Radio Canada", sans-serif !important;
    cursor: pointer;
    line-height: 40px;
    font-size: 1.2rem;

    &:hover {
      color: ${colorSystem.p500};
    }
  }

  svg {
    position: absolute;
    right: 20px;
    top: -17px;
    font-size: 2.5rem;
    color: ${colorSystem.g200};
  }
`;

export default GlampingDetailStyle;
