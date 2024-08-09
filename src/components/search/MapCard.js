import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MainButton } from "../common/Button";
import { SearchContent } from "../../styles/SearchPageStyle";
import { MapCardContent } from "../../styles/MapModalStyle";

const MapCard = ({
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
  const handleButtonClick = () => {
    console.log("예약하기");
  };

  return (
    <MapCardContent key={glampId}>
      <Link
        to={`/places/${glampId}?inDate=${inDate}&outDate=${outDate}&people=${people}`}
      >
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
          <div className="map-name">{glampName}</div>
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
          <Link
            to={`/places/${glampId}?inDate=${inDate}&outDate=${outDate}&people=${people}`}
          >
            <MainButton onClick={handleButtonClick} label="예약하기" />
          </Link>
        </div>
      </div>
    </MapCardContent>
  );
};

export default MapCard;
