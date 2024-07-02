import styled from "@emotion/styled";
import Categories from "../../components/mypage/Categories";
import { colorSystem } from "../../styles/color";

const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }

  h3 {
    width: 100%;
    margin-top: 160px;
    margin-left: 120px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
  }

  .임시 {
    height: 1000px;
  }
`;

const BookingDetail = () => {
  return (
    <WrapStyle>
      <Categories />
      <div className="inner">
        <h3>예약 내역</h3>
        <div className="임시">
          {/* 작업하실때 임시부분만 지우고 사용하세용 @@ */}
        </div>
      </div>
    </WrapStyle>
  );
};

export default BookingDetail;
