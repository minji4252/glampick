import styled from "@emotion/styled";
import { colorSystem } from "../../styles/color";
import { ceoAccessTokenState } from "../../atoms/loginState";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useEffect } from "react";

const CeoBookingDetailStyle = styled.div`
  width: 100%;
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
      align-items: center;
      gap: 5px;
      font-weight: 600;
      margin-bottom: 7px;
    }

    .guest-name {
      padding: 4px 0px;
    }

    .guest-number {
      padding: 4px 0px;
    }

    .stay-info {
      display: flex;
      gap: 5px;
      color: ${colorSystem.g700};
    }

    .stay-night {
      color: ${colorSystem.p600};
      background-color: #eaf4ff;
      border: 2px solid ${colorSystem.p200};
      border-radius: 5px;
      padding: 4px 10px;
      margin-left: 5px;
    }
  }

  /* 총 결제 금액 */
  .total-amount {
    font-size: 1rem;
    font-weight: 600;
    color: ${colorSystem.p500};
  }
`;

interface CeoBookingDetailProps {
  detail: {
    guestName: string;
    guestNumber: number;
    stayPeriod: string;
    roomNumber: string;
    totalAmount: number;
  };
}

const CeoBookingDetail: React.FC<CeoBookingDetailProps> = ({ detail }) => {
  const [ceoAccessToken, setCeoAccessToken] =
    useRecoilState(ceoAccessTokenState);

  // useEffect(() => {
  //   // 예약 상세 내역 불러오기
  //   const getOwnerBook = async () => {
  //     if (!ceoAccessToken) return;
  //     try {
  //       const response = await axios.get(`/api/owner/book`, {
  //         headers: {
  //           Authorization: `Bearer ${ceoAccessToken}`,
  //         },
  //       });
  //       console.log(response);
  //       return response.data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getOwnerBook();
  // }, [ceoAccessToken]);

  return (
    <CeoBookingDetailStyle>
      <div className="booking-info">
        <div className="guest-info">
          <div className="guest-name">김토토님 |</div>
          <div className="guest-number">3인</div>
          {/* <div className="stay-night">2박</div> */}
        </div>
        <div className="stay-info">
          {/* 체크인 체크아웃 날짜 */}
          <div>08.06 - 08.07 |</div>
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
