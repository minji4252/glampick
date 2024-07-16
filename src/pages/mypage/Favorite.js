import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import Categories from "../../components/mypage/Categories";
import FavoriteCard from "../../components/mypage/FavoriteCard";
import emptyImg from "../../images/coffeeImg.png";
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

const EmptyStyle = styled.div`
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

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        // 쿠키에서 access-Token 가쟈옴
        const accessTokenFromCookie = getCookie("access-Token");
        if (accessTokenFromCookie) {
          setAccessToken(accessTokenFromCookie);
        } else {
          console.log("쿠키에 access-Token 없음");
        }
      } catch (error) {
        console.log("ccess-Token 가져오는 중 에러:", error);
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!accessToken) return; // accessToken이 없으면 요청을 보내지 않음

        axios.defaults.withCredentials = true; // withCredentials 옵션 활성화
        const response = await axios.get("/api/user/favorite-glamping", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setFavorites(response.data.favoritelist);
        console.log(response.data.favoritelist);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavorites();
  }, [accessToken]); // accessToken이 업데이트될 때마다 다시 요청을 보냄

  return (
    <WrapStyle>
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
    </WrapStyle>
  );
};

export default Favorite;

// 쿠키에서 특정 이름의 쿠키 값을 가져오는 함수

function getCookie(name) {
  const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]*)`);
  return cookieValue ? cookieValue.pop() : "";
}
