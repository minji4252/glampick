import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard";
import Categories from "../../components/mypage/Categories";
import { colorSystem, size } from "../../styles/color";
import coffeeImg from "../../images/coffeeImg.png";
import { MainButton } from "../../components/common/Button";
import { IoIosArrowRoundForward } from "react-icons/io";

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

const MyReviewInfo = styled.div`
  width: 100%;
  background-color: ${colorSystem.g100};
  padding: 20px;
  border-radius: 20px;
  margin-top: 65px;
  width: 90%;

  p:before {
    content: "·";
    font-size: 27px;
    vertical-align: middle;
    margin-right: 5px;
  }

  p {
    font-size: 0.95rem;
    line-height: 1.6rem;
    display: flex;
    align-items: center;
    margin-left: 10px;
    font-weight: 500;
    color: ${colorSystem.g800};
  }

  ${size.mid} {
    p {
      font-size: 0.75rem;
    }
  }
`;

const MyReviewGroup = styled.div`
  margin-top: 65px;
  max-width: 1060px;
  width: 100%;

  svg {
    display: block !important;
  }
`;

const NoReviewsStyle = styled.div`
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

  .no-review-img {
    background: url(${coffeeImg}) no-repeat center;
    background-size: cover;
    width: 50px;
    height: 50px;
    margin-top: 100px;
  }

  h4 {
    font-size: 1.1rem;
    margin-top: 20px;
  }

  p {
    margin-bottom: 100px;
  }
`;

const MyReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/user/review`);
        setReviews(response.data.userlist);
        console.log(response.data.userlist);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <WrapStyle>
      <Categories />
      <div className="inner">
        <h3>나의 후기 ({reviews.length}개)</h3>
        {reviews.length > 0 && (
          <MyReviewInfo>
            <p>
              후기는 작성 후 48시간 이내에 본문만 수정이 가능하며, 작성자는 현재
              닉네임으로 변경됩니다.
            </p>
            <p>삭제한 후기는 복구할 수 없습니다.</p>
            <p>후기 삭제는 후기 작성일로부터 30일 이후에 가능합니다.</p>
          </MyReviewInfo>
        )}
        <MyReviewGroup>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ReviewCard
                key={index}
                userNickname={review.userNickname}
                glampName={review.glampName}
                roomName={review.roomName}
                createdAt={review.createdAt}
                reviewText={review.reviewContent}
              />
            ))
          ) : (
            <NoReviewsStyle>
              <div className="no-review-img" />
              <h4>작성한 후기가 없습니다</h4>
              <p>숙소 이용 후 후기를 남겨주세요</p>
            </NoReviewsStyle>
            // <NoReviewsStyle>
            //   <div className="no-review-img" />
            //   <h4>예약된 글램핑장이 없습니다</h4>
            //   <div className="room-search-btn">
            //     <MainButton label="숙소 검색하러 가기" />
            //     <IoIosArrowRoundForward />
            //   </div>
            // </NoReviewsStyle>
          )}
        </MyReviewGroup>
      </div>
    </WrapStyle>
  );
};

export default MyReview;
