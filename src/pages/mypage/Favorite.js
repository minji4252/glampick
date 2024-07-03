import styled from "@emotion/styled";
import Categories from "../../components/mypage/Categories";
import ArticleImage from "../../images/main-list-2.png";
import { colorSystem } from "../../styles/color";
import { FaStar } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import MainCard from "../../components/MainCard";

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
`;

const FavoriteContents = styled.div`
  margin: 65px 0 200px 0;
  width: 100%;
  /* height: 1000px; */
  /* background-color: pink; */
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  /* justify-content: center; */
  padding: 0 150px 0 60px;
`;

const FavoriteList = styled.article`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;

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

const ListContent = styled.div`
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
    > button {
      cursor: pointer;
      width: 65px;
      height: 30px;
      justify-content: center;
      align-items: center;
      border-radius: 500px;
      border: none;
      background: ${colorSystem.primary};
    }
    p {
      font-size: 12px;
      color: ${colorSystem.white};
      font-family: "Pretendard Variable";
    }
    .glamping-price {
      font-size: 16px;
      font-weight: 600;
    }
  }
`;

const Favorite = () => {
  return (
    <WrapStyle>
      <Categories />
      <div className="inner">
        <h3>관심 목록</h3>
        <FavoriteContents>
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
        </FavoriteContents>
      </div>
    </WrapStyle>
  );
};

export default Favorite;
