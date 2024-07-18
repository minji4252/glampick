import { FaStar } from "react-icons/fa";
import { MdPlace } from "react-icons/md";

import { Link } from "react-router-dom";
import { ArticleContent, FavoriteArticle } from "../../styles/FavoriteStyle";
import { MainButton } from "../common/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../common/Loading";

export const FavoriteCard = ({
  reviewCount,
  price,
  starPoint,
  glampImage,
  glampLocation,
  glampName,
  glampId,
  onRemoveFavorite,
  accessToken,
}) => {
  const [isFavorite, setIsFavorite] = useState(true);
  const [loading, setLoading] = useState(false);

  // 가격, 리뷰 단위 수정
  const formattedPrice = Number(price).toLocaleString("ko-KR");
  const formattedStarPoint = Number(starPoint).toFixed(1);

  // 임시 이미지
  const [roomMainImage, setRoomMainImage] = useState(null);
  useEffect(() => {
    setRoomMainImage("pic/glamping/1/room/1/room1.jpg");
  }, []);

  const handleHeartClick = async () => {
    console.log("삭제?");
    setLoading(true);
    try {
      const response = await axios.get(`/api/glamping/favorite`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          glampId: glampId,
          action: "remove",
        },
      });

      console.log("삭제됨??");
      if (response.data.resultValue === 0) {
        setIsFavorite(false);
        onRemoveFavorite(glampId);
        console.log("삭제됨?????");
      }
      setLoading(false);
    } catch (error) {
      console.error("관심 목록 삭제 중 에러:", error);
    }
    // 새고
    window.location.reload();
  };

  if (!isFavorite) return null;

  return (
    <FavoriteArticle key={glampId}>
      {loading && <Loading />}
      <Link to={`/places/${glampId}`}>
        <div
          className="article-image"
          style={{
            backgroundImage: `url(${glampImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="article-place">
            <MdPlace />
            {glampLocation}
          </div>
        </div>
      </Link>
      <div className="favorite-heart" onClick={handleHeartClick}></div>
      <ArticleContent>
        <div className="article-top">
          <Link to={`/places/${glampId}`}>
            <div className="glamping-name">{glampName}</div>
          </Link>
          <div className="article-detail">
            <FaStar />
            <div className="review-score">{formattedStarPoint}</div>
          </div>
          <div className="review-count">(리뷰 {reviewCount}개)</div>
        </div>
        <div className="article-bottom">
          <div className="glamping-price">{formattedPrice}원~</div>
          <Link to={`/places/${glampId}`}>
            <MainButton label="예약하기"></MainButton>
          </Link>
        </div>
      </ArticleContent>
    </FavoriteArticle>
  );
};

export default FavoriteCard;
