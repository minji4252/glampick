import React from "react";
import Categories from "../../components/mypage/Categories";
import styled from "@emotion/styled";
import { FaStar } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";
import { colorSystem } from "../../styles/color";

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

  @media all and (max-width: 768px) {
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
`;

const MyReviewGroup = styled.div`
  margin-top: 65px;
  max-width: 1060px;
  width: 100%;
`;
const MyReviewCard = styled.div`
  display: flex;

  .myreview-card-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 50px;

    div {
      background-color: pink;
      border-radius: 100%;
      width: 65px;
      height: 65px;
    }

    span {
      margin-top: 10px;
      font-weight: 600;
    }
  }
`;
const UserSection = styled.div`
  .myreview-title {
    display: flex;
    gap: 10px;
  }
  .myreview-score {
    display: flex;
    gap: 3px;
    color: ${colorSystem.star};
  }

  .myreview-img {
    display: flex;
    gap: 10px;
    margin-top: 20px;

    > div {
      width: 190px;
      height: 200px;
      background-color: lightblue;
      border-radius: 25px;
    }
  }

  .myreview-content {
    margin-top: 30px;
    font-size: 1rem;

    span {
      font-weight: 600;
    }

    p {
      margin-top: 25px;
    }

    svg {
      color: ${colorSystem.g400};
      font-size: 1.5rem;
    }
  }

  height: 1000px;
`;
const OwnerSection = styled.div``;

const MyReview = () => {
  return (
    <WrapStyle>
      <Categories />
      <div className="inner">
        <h3>나의 후기 (2개)</h3>
        <MyReviewInfo>
          <p>
            후기는 작성 후 48시간 이내에 본문만 수정이 가능하며, 작성자는 현재
            닉네임으로 변경됩니다.
          </p>
          <p>삭제한 후기는 복구할 수 없습니다.</p>
          <p>후기 삭제는 후기 작성일로부터 30일 이후에 가능합니다.</p>
        </MyReviewInfo>
        <MyReviewGroup>
          <MyReviewCard>
            <div className="myreview-card-left">
              <div></div>
              <span>별하숲</span>
            </div>
            <div className="myreview-card-right">
              <UserSection>
                <div className="myreview-title">
                  <div className="myreview-score">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <span>06/15</span>
                </div>
                <div className="myreview-img">
                  <div>이미지</div>
                  <div>이미지</div>
                  <div>이미지</div>
                </div>
                <div className="myreview-content">
                  <span>별별 글램핑 (A룸 202호)</span>
                  <RiEdit2Line />
                  <p>
                    너무 좋았습니당 어쩌고 저쩌고 다음에 또 갈 수 있으면 얼마나
                    좋게요 ^^ 너무 좋았습니당 어쩌고 저쩌고 다음에 또 갈 수
                    있으면 얼마나 좋게요 ^^ 너무 좋았습니당 어쩌고 저쩌고 다음에
                    또 갈 수 있으면 얼마나 좋게요 ^^
                  </p>
                </div>
              </UserSection>
              <OwnerSection></OwnerSection>
            </div>
          </MyReviewCard>
        </MyReviewGroup>
      </div>
    </WrapStyle>
  );
};

export default MyReview;
