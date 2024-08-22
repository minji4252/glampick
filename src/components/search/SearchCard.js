import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MainButton } from "../common/Button";
import { SearchContent } from "../../styles/SearchPageStyle";

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
    // console.log("예약하기");
  };

  const SearchCardUrl = `/places/${glampId}?inDate=${inDate}&outDate=${outDate}&people=${people}`;

  return (
    <SearchContent key={glampId}>
      <Link to={SearchCardUrl}>
        <div
          className="search-image"
          style={{
            backgroundImage: `url(${glampPic})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      </Link>
      <div className="search-detail">
        <div className="sc-top">
          <Link to={SearchCardUrl}>
            <div className="sc-name">{glampName}</div>
          </Link>
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
          <Link to={SearchCardUrl}>
            <MainButton onClick={handleButtonClick} label="예약하기" />
          </Link>
        </div>
      </div>
    </SearchContent>
  );
};

export default SearchCard;
