import styled from "@emotion/styled";
import { colorSystem, size } from "../color";
import emptyImg from "../../images/emptyImg.png";
import notBookingImg from "../../images/notbookingImg.png";

// 사장님 페이지 - 리뷰 관리
export const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }
  h3 {
    width: 100%;
    margin-top: 50px;
    margin-left: 120px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
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
    }
  }

  /* .tabs {
    height: 1000px;
  } */

  /* 탭 메뉴 */
  .tabs {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 110px;
    margin-top: 20px;
    font-size: 1rem;
    color: ${colorSystem.g900};
    font-weight: 600;
    margin-top: 20px;
  }

  .tab {
    padding: 10px 5px;
    margin: 0px 10px;
    cursor: pointer;
    &.active {
      font-weight: 600;
      color: ${colorSystem.ceo};
      border-bottom: 2px solid ${colorSystem.ceo};
    }
  }

  .container {
    /* 임시 높이 */
    /* height: 500px; */
    display: grid;
    gap: 50px;
    width: 90%;
    margin-top: 40px;
    margin-bottom: 60px;

    .form-group {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
`;
export const NoReviewsStyle = styled.div`
  width: 70%;
  background-color: ${colorSystem.background};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  margin-bottom: 250px;
  letter-spacing: 2px;

  .no-review-img {
    background: url(${emptyImg}) no-repeat center;
    background-size: cover;
    width: 50px;
    height: 50px;
    margin-top: 100px;
  }

  h4 {
    font-size: 1.1rem;
    margin-top: 20px;
  }

  p {
    margin-bottom: 100px;
  }
`;

export const NotContentStyle = styled.div`
  /* width: 150%; */
  background-color: ${colorSystem.background};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  /* margin-top: 65px; */
  margin-bottom: 250px;
  letter-spacing: 2px;
  padding-bottom: 50px;
  .logo-img {
    background: url(${notBookingImg}) no-repeat center;
    background-size: cover;
    width: 150px;
    height: 100px;
    margin-top: 100px;
  }

  a {
    max-width: 180px;
    width: 100%;
  }

  h4 {
    font-size: 1.1rem;
    margin-top: 10px;
  }
  .room-search-btn {
    margin-top: 40px;
    margin-bottom: 60px;
    position: relative;
    button {
      width: 100%;
      height: 40px;
      text-align: left;
      -webkit-justify-content: left;
    }
    svg {
      width: 38px;
      height: 38px;
      color: ${colorSystem.white};
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 10%;
      pointer-events: none;
    }
  }
`;

// 사장님 페이지 - 리뷰 카드

export const ReviewCardStyle = styled.div`
  display: flex;
  margin-bottom: 40px;

  .review-card-right {
    max-width: 800px;
    width: 100%;
  }

  .review-card-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 50px;

    div {
      border-radius: 100%;
      width: 65px;
      height: 65px;
    }

    span {
      margin-top: 10px;
      font-weight: 600;
    }
  }

  h5 {
    display: none;
    font-weight: 600;
  }
`;
export const UserSection = styled.div`
  .review-title {
    max-width: 570px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      display: flex;
      gap: 10px;
    }

    span {
      letter-spacing: 1.5px;
    }

    button {
      height: 25px;
      display: none;
    }
  }
  .review-score {
    display: flex;
    gap: 3px;
    color: ${colorSystem.star};
  }

  .review-content {
    font-size: 1rem;

    .review-glamp-name {
      cursor: pointer;
      padding: 5px;
      width: fit-content;
      display: flex;
      align-items: center;
      gap: 10px;

      &:hover {
        color: ${colorSystem.p300};
      }
    }

    span {
      font-weight: 600;
    }

    p,
    textarea {
      margin-top: 15px;
      max-width: 570px;
      line-height: 1.5rem;
      font-size: 0.9rem;
    }

    button {
      margin-top: 15px;
      height: 35px;
      font-size: 0.9rem;
    }
  }
`;

export const ReviewImage = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;

  > div {
    max-width: 180px;
    width: 100%;
    height: 200px;
    border-radius: 25px;
    background-size: cover;
  }

  @media all and (min-width: 768px) and (max-width: 850px) {
    .review-card-img2,
    .review-card-img3 {
      display: none;
    }

    .review-card-img1 {
      width: 100%;
      max-width: 370px;
      background-size: cover;
    }
  }

  @media all and (max-width: 540px) {
    .review-card-img2,
    .review-card-img3 {
      display: none;
    }

    .review-card-img1 {
      width: 100%;
      max-width: 370px;
      background-size: cover;
    }
  }
`;

export const UnderLine = styled.div`
  width: 95%;
  height: 1px;
  border-bottom: 1px solid ${colorSystem.g200};
  margin-bottom: 40px;
`;
