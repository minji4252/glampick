import axios from "axios";
import { useEffect, useState } from "react";
import Categories from "../../components/mypage/Categories";
import FavoriteCard from "../../components/mypage/FavoriteCard";
import {
  EmptyStyle,
  FavoriteContents,
  FavoriteStyle,
} from "../../styles/FavoriteStyle";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const accessTokenFromCookie = getCookie("access-Token");
        if (accessTokenFromCookie) {
          setAccessToken(accessTokenFromCookie);

          // 관심 목록 가져오기
          axios.defaults.withCredentials = true;
          const response = await axios.get("/api/user/favorite-glamping", {
            headers: {
              Authorization: `Bearer ${accessTokenFromCookie}`,
            },
          });
          setFavorites(response.data.favoritelist);
          console.log("관심 목록 불러옴: ", response.data.favoritelist);
        } else {
          console.log("쿠키에 access-Token 없음");
        }
      } catch (error) {
        console.error("관심 목록 가져오기 오류:", error);
      }
    };

    fetchAccessToken();
  }, []);

  const handleRemoveFavorite = async glampId => {
    try {
      const response = await axios.get(`/api/user/favorite-glamping`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          glampId: glampId,
          action: "remove",
        },
      });

      if (response.data.resultValue === 0) {
        setFavorites(prevFavorites =>
          prevFavorites.filter(favorite => favorite.glampId !== glampId),
        );
      }
    } catch (error) {
      console.error("관심 목록 삭제 중 에러:", error);
    }
  };

  // 쿠키에서 특정 이름의 쿠키 값을 가져오는 함수
  function getCookie(name) {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${name}\\s*=\\s*([^;]*)`,
    );
    return cookieValue ? cookieValue.pop() : "";
  }

  return (
    <FavoriteStyle>
      <Categories />
      <div className="inner">
        <h3>관심 목록</h3>
        {favorites.length > 0 ? (
          <FavoriteContents>
            {favorites.map(item => (
              <FavoriteCard
                key={item.glampId}
                glampId={item.glampId}
                glampName={item.glampName}
                glampLocation={item.glampLocation}
                starPoint={item.starPoint}
                reviewCount={item.reviewCount}
                price={item.price}
                accessToken={accessToken}
                onRemoveFavorite={handleRemoveFavorite}
              />
            ))}
          </FavoriteContents>
        ) : (
          <FavoriteContents>
            <EmptyStyle>
              <div className="empty-img" />
              <h4>관심 목록이 비어있습니다</h4>
            </EmptyStyle>
          </FavoriteContents>
        )}
      </div>
    </FavoriteStyle>
  );
};

export default Favorite;
