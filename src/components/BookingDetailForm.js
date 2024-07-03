import React from "react";
import { colorSystem } from "../styles/color";
import ClampingImage from "../images/main-list-1.png";
import styled from "@emotion/styled";

const Container = styled.div``;

export const FormContents = styled.div`
  width: 511px;
  height: 278px;
  margin-top: 13px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 65px;

  .top-contents {
    width: 100%;
    height: 25%;
    padding: 14px 20px;
    border-bottom: 2px solid ${colorSystem.g200};
  }

  h2 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .reserv-number {
    font-size: 15px;
    color: ${colorSystem.g800};
  }

  .bottom-contents {
    width: 100%;
    height: 75%;
    padding: 25px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  p {
    font-size: 15px;
    color: ${colorSystem.g700};
  }
  .reserv-info {
    width: 100%;
    display: flex;
    gap: 20px;
  }

  .reserv-info-img {
    width: 140px;
    height: 110px;
    background: url(${ClampingImage}) no-repeat center;
    border-radius: 20px;
  }
  .reserv-info-txt {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: ${colorSystem.g900};
  }

  h4 {
    font-size: 17px;
    font-weight: 600;
  }

  .room-type {
    font-size: 17px;
  }

  .date-used {
    font-size: 15px;
  }

  .check-time {
    font-size: 15px;
  }

  .cancel-btn {
    font-size: 14px;
    font-weight: 600;
    color: ${colorSystem.error};
    margin-left: auto;
    /* 글자 오른쪽 끝에 배치 */
  }
`;

export const BookingDetailForm = () => {
  return (
    <FormContents>
      <div className="top-contents">
        <h2>2024.06.27(목)</h2>
        <div className="reserv-number">예약번호: 000000000</div>
      </div>
      <div className="bottom-contents">
        <p>숙소</p>
        <div className="reserv-info">
          <div className="reserv-info-img"></div>
          <div className="reserv-info-txt">
            <h4>별빛 글램핑</h4>
            <div className="room-type">A룸 202호</div>
            <div className="date-used">2024.07.01 ~ 2024.07.02 | 1박</div>
            <div className="check-time">체크인 16:00 | 체크아웃 12:00</div>
          </div>
        </div>
        <div className="cancel-btn">취소</div>
      </div>
    </FormContents>
  );
};

export default BookingDetailForm;
