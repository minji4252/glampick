import axios from "axios";
import { useEffect, useState } from "react";
import Categories from "../../components/mypage/Categories";
import FavoriteCard from "../../components/mypage/FavoriteCard";
import {
  EmptyStyle,
  FavoriteContents,
  FavoriteStyle,
} from "../../styles/FavoriteStyle";
import Loading from "../../components/common/Loading";
import ListPagination from "../../components/common/ListPagination";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../atoms/loginState";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  // const [accessToken, setAccessToken] = useState("");
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postPerPage] = useState(6); // 페이지네이션 페이지당 보여질 목록 수

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        setLoading(true);
        if (token) {
          setAccessToken(token);

          // 관심 목록 가져오기
          axios.defaults.withCredentials = true;
          const response = await axios.get("/api/user/favorite-glamping", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setFavorites(response.data.favoritelist);
          console.log("관심 목록 불러옴: ", response.data.favoritelist);
        } else {
          console.log("accessToken 없음");
        }
        setLoading(false);
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

  // 현재 페이지에 해당하는 항목들 가져오기
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentFavorites = favorites.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = pageNumber => setCurrentPage(pageNumber);

  return (
    <FavoriteStyle>
      {loading && <Loading />}
      <Categories />
      <div className="inner">
        <h3>관심 목록</h3>
        {currentFavorites.length > 0 ? (
          <FavoriteContents>
            {currentFavorites.map(item => (
              <FavoriteCard
                key={item.glampId}
                glampId={item.glampId}
                glampName={item.glampName}
                glampImage={item.glampImage}
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
        <ListPagination
          currentPage={currentPage}
          totalItems={favorites.length}
          itemsPerPage={postPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </FavoriteStyle>
  );
};

export default Favorite;
