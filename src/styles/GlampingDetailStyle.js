import styled from "@emotion/styled";
import { colorSystem, size } from "./color";
import optionBarbecue from "../images/icon/filter-barbecue.png";
import optionMountain from "../images/icon/filter-mountain.png";
import optionOcean from "../images/icon/filter-ocean.png";
import optionPet from "../images/icon/filter-pet.png";
import optionSwim from "../images/icon/filter-swim.png";
import optionToilet from "../images/icon/filter-toilet.png";
import optionWifi from "../images/icon/filter-wifi.png";
import Image from "../images/pic.jpg";
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
export const RoomProperty = styled.div`
  width: 100%;
`;

// 옵션 1
export const RoomPic = styled.div`
  .main-img {
    position: relative;
    background: url(${Image}) no-repeat center;
    background-size: cover;
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

  svg {
    color: ${colorSystem.error};
    font-size: 3rem;
    margin-right: 90px;
  }

  button {
    background-color: transparent;
    border: 0px;
    width: fit-content;
  }
`;

// 옵션 3
export const RoomReview = styled.div`
  margin-top: 25px;
`;

export const ReviewTitle = styled.div`
  display: flex;
  height: 25px;
  align-items: center;
  gap: 5px;
  font-size: 0.95rem;
  font-weight: 700;

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
    font-family: "Pretendard Variable";
    font-size: 1rem;
  }
`;

export const ReviewContent = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 20px;
  align-items: center;

  .review-content {
    width: 100%;
    display: flex;
    gap: 20px;
  }

  .review-content-item {
    max-width: 360px;
    width: 100%;
    height: 150px;
    background-color: ${colorSystem.beige};
    padding: 20px;
    border-radius: 12px;
    line-height: 1.3rem;
    > p {
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

  .review-more {
    width: 100%;
    max-width: 350px;
    width: 100%;
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
      margin-left: 30px;
      max-width: 700px;
    }
  }

  ${size.mid} {
    flex-direction: column;
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
  }
`;
export const RoomSelectTitle = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const RoomCard = styled.div`
  width: 90%;
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

    > div {
      margin-top: 15px;
    }
  }
`;

export const RoomLocation = styled.div`
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

export default GlampingDetailStyle;
