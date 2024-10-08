import { FC, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { Link } from "react-router-dom";
import { ArticleContent, MainArticle } from "../styles/MainPageStyle";
import { MainButton } from "./common/Button";

interface MainCardProps {
  glampId: string;
  glampingName: string;
  region: keyof typeof regionNames;
  starPoint: number;
  reviewCount: number;
  price: number;
  glampingImg: string;
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

const MainCard: FC<MainCardProps> = ({
  glampId,
  glampingName,
  region,
  starPoint,
  reviewCount,
  price,
  glampingImg,
}) => {
  // 가격, 리뷰 단위 수정
  const formattedPrice = Number(price).toLocaleString("ko-KR");
  const formattedStarPoint = Number(starPoint).toFixed(1);

  return (
    <MainArticle key={glampId}>
      <Link to={`/places/${glampId}`}>
        <div
          className="article-image"
          style={{
            backgroundImage: `url(${glampingImg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="article-place">
            <MdPlace />
            {regionNames[region] || ""}
          </div>
        </div>
      </Link>
      <ArticleContent>
        <div className="article-top">
          <Link to={`/places/${glampId}`}>
            <div className="glamping-name">{glampingName}</div>
          </Link>
          <div className="article-detail">
            <FaStar />
            <div className="review-score">{formattedStarPoint}</div>
          </div>
          <div className="review-count">(리뷰 {reviewCount}개)</div>
        </div>
        <div className="article-bottom">
          <div className="glamping-price">{formattedPrice} 원~</div>
          <Link to={`/places/${glampId}`}>
            <MainButton label="자세히보기" />
          </Link>
        </div>
      </ArticleContent>
    </MainArticle>
  );
};

export default MainCard;
