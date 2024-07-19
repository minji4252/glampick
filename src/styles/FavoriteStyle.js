import { colorSystem, size } from "./color";
import emptyImg from "../images/coffeeImg.png";
import styled from "@emotion/styled";
import FavoriteIcon from "../images/icon/favorite-icon.png";
import ArticleImage from "../images/main-list-3.png";

// 관심 글램핑장 목록

export const FavoriteStyle = styled.div`
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
`;

export const FavoriteContents = styled.div`
  margin: 65px 0 200px 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
  padding: 0 60px;
  .favorite-content {
    position: relative;
  }
`;

export const EmptyStyle = styled.div`
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

  .empty-img {
    background: url(${emptyImg}) no-repeat center;
    background-size: cover;
    width: 50px;
    height: 50px;
    margin-top: 100px;
  }

  h4 {
    font-size: 1.1rem;
    margin-top: 20px;
    margin-bottom: 100px;
  }
`;

// 관심 글램핑장 카드 컴포넌트

export const FavoriteArticle = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;
  :hover {
    transform: translateY(-5px);
    transition: 0.5s;
  }
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
      width: 100%;
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
  .favorite-heart {
    position: absolute;
    top: 10px;
    right: 15px;
    width: 43px;
    height: 38px;
    background: url(${FavoriteIcon}) no-repeat center;
    cursor: pointer;
    ${size.mid} {
      left: 230px;
    }
  }
  ${size.mid} {
    display: flex;
    flex-direction: row;
  }
`;

export const ArticleContent = styled.div`
  margin: 20px 10px 0 10px;
  ${size.mid} {
    margin-left: 20px;
    align-content: center;
  }
  .article-top {
    display: flex;
    flex-direction: grid;
    align-items: flex-end;

    ${size.mid} {
      flex-direction: column;
      align-items: baseline;
      margin-bottom: 10px;
      gap: 5px;
    }
  }
  .glamping-name {
    font-size: 18px;
    font-weight: 600;
  }
  .article-detail {
    display: flex;
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
  }

  .article-bottom {
    display: flex;
    margin-top: 5px;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 12px;
    ${size.mid} {
      display: block;
      /* align-self: start; */
    }
    .glamping-price {
      font-size: 16px;
      font-weight: 600;
      padding-bottom: 5px;
    }
    ${size.mid} {
      margin-top: 20px;
      flex-direction: column;
    }
  }
`;
