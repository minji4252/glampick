import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MainButton } from "../common/Button";
import { MapCardContent } from "../../styles/MapModalStyle";

interface MapCardProps {
  glampId: string;
  glampName: string;
  glampPic: string;
  starPoint: number;
  reviewCount: number;
  price: number;
  inDate: string;
  outDate: string;
  people: number;
}

const MapCard: React.FC<MapCardProps> = ({
  glampId,
  glampName,
  glampPic,
  starPoint,
  reviewCount,
  price,
  inDate,
  outDate,
  people,
}) => {
  // 가격, 리뷰 단위 수정
  const formattedPrice = Number(price).toLocaleString("ko-KR");
  const formattedStarPoint = Number(starPoint).toFixed(1);

  // 예약 버튼
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("예약하기");
  };

  const MapCardUrl = `/places/${glampId}?inDate=${inDate}&outDate=${outDate}&people=${people}`;

  return (
    <MapCardContent key={glampId}>
      <Link to={MapCardUrl}>
        <div
          className="map-image"
          style={{
            backgroundImage: `url(${glampPic})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      </Link>
      <div className="map-detail">
        <div className="map-top">
          <Link to={MapCardUrl}>
            <div className="map-name">{glampName}</div>
          </Link>
          <div className="map-review">
            <div className="map-review-top">
              <FaStar />
              <div className="map-score">{formattedStarPoint}</div>
            </div>
            <div className="map-review-bottom">
              <div className="map-count">{reviewCount} 개 리뷰</div>
            </div>
          </div>
        </div>
        <div className="map-bottom">
          <div className="map-price">{formattedPrice} 원 ~</div>
          <Link to={MapCardUrl}>
            <MainButton onClick={handleButtonClick} label="예약하기" />
          </Link>
        </div>
      </div>
    </MapCardContent>
  );
};

export default MapCard;
