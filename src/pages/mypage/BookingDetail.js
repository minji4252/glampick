import styled from "@emotion/styled";
import BookingDetailForm from "../../components/BookingDetailForm";
import { MainButton } from "../../components/common/Button";
import Categories from "../../components/mypage/Categories";
import { colorSystem, size } from "../../styles/color";

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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* 2개의 컬럼으로 설정 */
    gap: 40px;
    width: 90%;
    margin-top: 65px;
    ${size.mid} {
      display: flex;
      flex-direction: column;
      margin-top: 40px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    /* 이용예정 버튼 */
    > div > button {
      display: block;
      width: 100px;
    }
    /* 이용완료 버튼 */
    .completed-reserv {
      > button {
        background-color: ${colorSystem.g300};
        &:hover {
          border: 1px solid ${colorSystem.g400};
          background-color: ${colorSystem.g400};
        }
      }
    }
  }

  /* 지난 이용 내역 텍스트 */
  .use-detail {
    width: 100%;
    margin-top: 20px;
    margin-left: 120px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
    ${size.mid} {
      margin-left: 82px;
    }
  }
  @media all and (max-width: 1910px) {
    display: flex;
    .inner {
      margin-left: 82px;
    }
  }

  ${size.mid} {
    flex-direction: column;
    h3 {
      margin-top: 250px;
      margin-left: 82px;
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
          <div className="form-group">
            <div>
              <MainButton label="이용예정" />
            </div>
            <BookingDetailForm />
          </div>
          <div className="form-group">
            <div>
              <MainButton label="이용예정" />
            </div>
            <BookingDetailForm />
          </div>
          <div className="form-group">
            <div>
              <MainButton label="이용예정" />
            </div>
            <BookingDetailForm />
          </div>
        </div>

        <div className="use-detail">지난 이용 내역</div>
        <div className="container">
          <div className="form-group">
            <div className="completed-reserv">
              <MainButton label="이용완료" />
            </div>
            <BookingDetailForm isCompleted={true} />
          </div>
          <div className="form-group">
            <div className="completed-reserv">
              <MainButton label="이용완료" />
            </div>
            <BookingDetailForm isCompleted={true} />
          </div>
        </div>
      </div>
    </WrapStyle>
  );
};

export default BookingDetail;
