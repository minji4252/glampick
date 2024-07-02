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
`;

const FavoriteContents = styled.div`
  margin-top: 65px;
  width: 100%;
  height: 1000px;
  background-color: pink;
`;

const Favorite = () => {
  return (
    <WrapStyle>
      <Categories />
      <div className="inner">
        <h3>관심 목록</h3>
        <FavoriteContents></FavoriteContents>
      </div>
    </WrapStyle>
  );
};

export default Favorite;
