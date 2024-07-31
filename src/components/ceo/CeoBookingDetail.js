import styled from "@emotion/styled";
import { colorSystem } from "../../styles/color";

const CeoBookingDetailStyle = styled.div`
  width: 100%;
  max-width: 350px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid ${colorSystem.g300};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;

  .booking-info {
    width: 60%;

    .guest-info {
      display: flex;
      gap: 5px;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .stay-info {
      display: flex;
      gap: 5px;
      color: ${colorSystem.g700};
    }
  }

  /* 총 결제 금액 */
  .total-amount {
    font-size: 1rem;
    font-weight: 600;
    color: ${colorSystem.p500};
  }
`;

const CeoBookingDetail = () => {
  return (
    <CeoBookingDetailStyle>
      <div className="booking-info">
        <div className="guest-info">
          <div>김토토님 |</div>
          <div>3인</div>
          <div>2박</div>
        </div>
        <div className="stay-info">
          <div>16:00~11:00 |</div>
          <div>503호 B룸</div>
        </div>
      </div>
      <div className="total-amount">
        <div>132,000원</div>
      </div>
    </CeoBookingDetailStyle>
  );
};

export default CeoBookingDetail;
