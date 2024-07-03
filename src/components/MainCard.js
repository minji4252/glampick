import { colorSystem } from "../styles/color";
import styled from "@emotion/styled";
import { FaStar } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import ArticleImage from "../images/main-list-1.png";
import { MainButton } from "./common/Button";

const MainArticle = styled.article`
  display: flex;
  flex-direction: column;
  .article-image {
    position: relative;
    width: 290px;
    height: 190px;
    border-radius: 32px;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
    background: url(${ArticleImage}) no-repeat center;
    .article-place {
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      width: 290px;
      height: 34px;
      border-radius: 0px 0px 32px 32px;
      background: rgba(123, 123, 123, 0.5);
      padding: 0 20px;
      font-size: 16px;
      color: #fff;
      font-weight: 600;
      svg {
        width: 20px;
        height: 20px;
        color: #fff;
        margin-right: 2px;
      }
    }
  }
`;

const ArticleContent = styled.div`
  margin: 20px 10px 0 10px;
  .article-top {
    display: flex;
    flex-direction: grid;
    align-items: flex-end;
  }
  .glamping-name {
    font-size: 18px;
    font-weight: 600;
  }
  svg {
    margin: 0 5px;
    color: #ffd233;
  }
  .review-score {
    margin-right: 5px;
    font-size: 14px;
    font-weight: 600;
  }
  .review-count {
    font-size: 14px;
  }
  .article-bottom {
    display: flex;
    margin-top: 5px;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 12px;
    .glamping-price {
      font-size: 16px;
      font-weight: 600;
      padding-bottom: 5px;
    }
  }
`;

export const MainCard = () => {
  return (
    <MainArticle>
      <div className="article-image">
        <div className="article-place">
          <MdPlace />
          가평
        </div>
      </div>
      <ArticleContent>
        <div className="article-top">
          <div className="glamping-name">조이글램핑</div>
          <FaStar />
          <div className="review-score">4.8</div>
          <div className="review-count">(리뷰 5개)</div>
        </div>
        <div className="article-bottom">
          <div className="glamping-price">65,000원~</div>
          <MainButton label="예약하기"></MainButton>
        </div>
      </ArticleContent>
    </MainArticle>
  );
};

export default MainCard;
