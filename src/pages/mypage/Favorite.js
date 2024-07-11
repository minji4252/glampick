import styled from "@emotion/styled";
import Categories from "../../components/mypage/Categories";
import { colorSystem, size } from "../../styles/color";
import { useEffect, useState } from "react";
import FavoriteCard from "../../components/FavoriteCard";
import axios from "axios";

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

const FavoriteContents = styled.div`
  margin: 65px 0 200px 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  padding: 0 60px;
  .favorite-content {
    position: relative;
  }
`;

const Favorite = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [visibleItems, setVisibleItems] = useState([true, true, true, true]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.7:8080/api/user/favorite-glamping",
        );
        setFavorites(response.data.favoritelist);
        console.log(response.data.favoritelist);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavorites();
  }, []);

  const toggleVisibility = index => {
    const newVisibleItems = [...visibleItems];
    newVisibleItems[index] = !newVisibleItems[index];
    setVisibleItems(newVisibleItems);
  };

  // const deleteLike = async glampId => {
  //   try {
  //     const response = await axios.delete(`/api/glamping/favorite/${glampId}`);
  //     if (response.data.success) {
  //       const newVisibleItems = [...visibleItems];
  //       newVisibleItems.splice(glampId, 1);
  //       setVisibleItems(newVisibleItems);
  //     } else {
  //       console.error("삭제 실패");
  //     }
  //   } catch (error) {
  //     console.error("삭제 오류:", error);
  //   }
  // };

  return (
    <WrapStyle>
      <Categories />
      <div className="inner">
        <h3>관심 목록</h3>
        <FavoriteContents>
          {visibleItems.map(
            (isVisible, index) =>
              isVisible && (
                <div key={index} className="favorite-content">
                  {favorites.map(item => (
                    <FavoriteCard
                      key={item.glampId}
                      glampId={item.glampId}
                      glampingName={item.glampingName}
                      region={item.region}
                      starPoint={item.starPoint}
                      reviewCount={item.reviewCount}
                      price={item.price}
                    />
                  ))}
                  {/* <div
                    className="favorite-heart"
                    onClick={() => toggleVisibility(index)}
                  ></div> */}
                </div>
              ),
          )}
          {/* <div className="favorite-content">
            <FavoriteCard />
            <div className="favorite-heart"></div>
          </div>
          <div className="favorite-content">
            <FavoriteCard />
            <div className="favorite-heart"></div>
          </div>
          <div className="favorite-content">
            <FavoriteCard />
            <div className="favorite-heart"></div>
          </div> */}
        </FavoriteContents>
      </div>
    </WrapStyle>
  );
};

export default Favorite;
