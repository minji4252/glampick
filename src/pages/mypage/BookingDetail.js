import styled from "@emotion/styled";
import BookingDetailForm from "../../components/BookingDetailForm";
import { MainButton } from "../../components/common/Button";
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

  .container {
    width: 90%;
    height: 800px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 65px;

    /* 이용예정 버튼 */
    > div > button {
      width: 100px;
    }
    .completed-reserv {
      > button {
        background-color: #cecece;
      }
    }
  }
`;

const BookingDetail = () => {
  return (
    <WrapStyle>
      <Categories />
      <div className="inner">
        <h3>예약 내역</h3>
        <div className="container">
          <div>
            <MainButton label="이용예정" />
          </div>
          <BookingDetailForm />
          <div>
            <MainButton label="이용예정" />
          </div>
          <BookingDetailForm />
        </div>
        <h3>이용 내역</h3>
        {/* 버튼 색상 및 폼 디자인 바꿔야 함 */}
        <div className="container">
          <div className="completed-reserv">
            <MainButton label="이용완료" />
          </div>
          <BookingDetailForm isCompleted={true} />
          <div className="completed-reserv">
            <MainButton label="이용완료" />
          </div>
          <BookingDetailForm isCompleted={true} />
        </div>
      </div>
    </WrapStyle>
  );
};

export default BookingDetail;
