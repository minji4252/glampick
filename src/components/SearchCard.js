import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SearchContent } from "../styles/SearchPageStyle";
import { MainButton } from "./common/Button";

const SearchCard = ({
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

  // 임시 이미지
  const [roomMainImage, setRoomMainImage] = useState(null);
  useEffect(() => {
    setRoomMainImage("pic/glamping/1/glamp/glamping1.jpg");
  }, []);

  return (
    <SearchContent key={glampId}>
      {/* <div className="search-image"></div> */}
      <div
        className="search-image"
        style={{
          background: `url(${roomMainImage}) no-repeat center`,
          backgroundSize: "cover",
        }}
      />
      <div className="search-detail">
        <div className="sc-top">
          <div className="sc-name">{glampName}</div>
          <div className="sc-review">
            <div className="sc-review-top">
              <FaStar />
              <div className="sc-score">{formattedStarPoint}</div>
            </div>
            <div className="sc-review-bottom">
              <div className="sc-count">{reviewCount} 개 리뷰</div>
            </div>
          </div>
        </div>
        <div className="sc-bottom">
          <div className="sc-price">{formattedPrice} 원 ~</div>
          {/* <Link to="/glampingdetail"> */}
          <Link
            to={`/glampingdetail/${glampId}?inDate=${inDate}&outDate=${outDate}&people=${people}`}
          >
            <MainButton onClick={handleButtonClick} label="예약하기" />
          </Link>
        </div>
      </div>
    </SearchContent>
  );
};

export default SearchCard;
