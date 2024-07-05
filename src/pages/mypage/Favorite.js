import styled from "@emotion/styled";
import Categories from "../../components/mypage/Categories";
import { colorSystem } from "../../styles/color";
import MainCard from "../../components/MainCard";
import FavoriteIcon from "../../images/icon/favorite-icon.png";
import { useState } from "react";

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
  .favorite-content {
    position: relative;
    .favorite-heart {
      position: absolute;
      top: 10px;
      right: 15px;
      width: 43px;
      height: 38px;
      background: url(${FavoriteIcon}) no-repeat center;
    }
  }
`;

const Favorite = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <WrapStyle>
      <Categories />
      <div className="inner">
        <h3>관심 목록</h3>
        <FavoriteContents>
          <div className="favorite-content">
            <MainCard> </MainCard>
            <div className="favorite-heart"></div>
          </div>

          <div className="favorite-content">
            <MainCard> </MainCard>
            <div className="favorite-heart"></div>
          </div>
          <div className="favorite-content">
            <MainCard> </MainCard>
            <div className="favorite-heart"></div>
          </div>
          <div className="favorite-content">
            <MainCard> </MainCard>
            <div className="favorite-heart"></div>
          </div>
        </FavoriteContents>
      </div>
    </WrapStyle>
  );
};

export default Favorite;
