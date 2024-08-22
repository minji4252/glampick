import { FaStar } from "react-icons/fa";
import { MdPlace } from "react-icons/md";

import { Link } from "react-router-dom";
import { ArticleContent, FavoriteArticle } from "../../styles/FavoriteStyle";
import { MainButton } from "../common/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../common/Loading";

interface FavoriteCardProps {
  reviewCount: number;
  price: number;
  starPoint: number;
  glampImage: string;
  glampLocation: string;
  glampName: string;
  glampId: number;
  onRemoveFavorite: (glampId: number) => void;
  accessToken: string | null;
}

const regionNames = {
  all: "전국",
  seoul: "서울/경기",
  gangwon: "강원",
  chungbuk: "충북",
  chungnam: "충남",
  gyeongbuk: "경북",
  gyeongnam: "경남",
  jeonbuk: "전북",
  jeonnam: "전남",
  jeju: "제주",
} as const;

export const FavoriteCard: React.FC<FavoriteCardProps> = ({
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
  const [roomMainImage, setRoomMainImage] = useState<string | null>(null);

  useEffect(() => {
    setRoomMainImage("pic/glamping/1/room/1/room1.jpg");
  }, []);

  const handleHeartClick = async () => {
    // console.log("삭제?");
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

      // console.log("삭제됨??");
      if (response.data.resultValue === 0) {
        setIsFavorite(false);
        onRemoveFavorite(glampId);
        // console.log("삭제됨?????");
      }
      setLoading(false);
    } catch (error) {
      console.error("관심 목록 삭제 중 에러:", error);
    }
    // 새고
    window.location.reload();
  };

  if (!isFavorite) return null;
  const locationName =
    regionNames[glampLocation as keyof typeof regionNames] || glampLocation;

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
            {locationName}
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
