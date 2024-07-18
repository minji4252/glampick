import styled from "@emotion/styled";
import filterBarbecue from "../images/icon/filter-barbecue.png";
import filterBarbecue2 from "../images/icon/filter-barbecue2.png";
import filterMountain from "../images/icon/filter-mountain.png";
import filterMountain2 from "../images/icon/filter-mountain2.png";
import filterOcean from "../images/icon/filter-ocean.png";
import filterOcean2 from "../images/icon/filter-ocean2.png";
import filterPet from "../images/icon/filter-pet.png";
import filterPet2 from "../images/icon/filter-pet2.png";
import filterSwim from "../images/icon/filter-swim.png";
import filterSwim2 from "../images/icon/filter-swim2.png";
import filterToilet from "../images/icon/filter-toilet.png";
import filterToilet2 from "../images/icon/filter-toilet2.png";
import filterWifi from "../images/icon/filter-wifi.png";
import filterWifi2 from "../images/icon/filter-wifi2.png";
import emptyImg from "../images/emptyImg.png";
import { colorSystem, size } from "../styles/color";

export const SearchPageStyle = styled.div`
  position: relative;
`;
export const SearchInner = styled.div`
  width: calc(100% - 30px);
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px auto;
  padding: 90px 0 250px 0;
  flex-direction: column;
  @media all and (max-width: 950px) {
    padding: 50px 0 200px 0;
  }
`;

export const SearchTop = styled.div`
  width: 100%;
  height: 90px;
  margin-top: 20px;
  background: #eaeff6;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  align-items: baseline;
  @media all and (max-width: 950px) {
    height: 150px;
  }
`;

export const SearchResult = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-size: 16px;
  @media all and (max-width: 950px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding-right: 30px;
  }
`;

// 상단 검색 결과 항목
export const ResultContents = styled.div`
  display: flex;
  align-items: center;
  label {
    font-weight: 600;
    padding-left: 30px;
    border-left: 1px solid ${colorSystem.g600};
  }
  .no-border {
    border-left: none;
    @media all and (max-width: 950px) {
      border-left: 1px solid ${colorSystem.g600};
    }
  }
  input {
    /* width: 80px;
    height: 25px; */
    border: none;
    font-size: 16px;
    background: rgba(255, 255, 255, 0);
    color: ${colorSystem.g800};
    margin-left: 10px;
  }
  select {
    width: 110px;
    height: 50px;
    border-radius: 30px;
    border: none;
    font-family: "Pretendard Variable";
    background: rgba(255, 255, 255, 0);
    font-size: 16px;
    color: ${colorSystem.primary};
    text-align: center;
    outline: none;
    option {
      background-color: ${colorSystem.g150};
      border-radius: 10px;
      color: ${colorSystem.g800};
    }
  }

  .search-date {
    width: 240px;
  }

  .search-member {
    display: flex;
    width: 110px;
    input {
      width: 50px;
      margin-left: 20px;
      text-align: center;
      justify-content: center;
      align-items: center;
      border-radius: 50px;
      border: none;
      font-size: 16px;
      color: ${colorSystem.primary};
      background: rgba(255, 255, 255, 0);
      outline: none;
    }
    > p {
      font-size: 16px;
      color: ${colorSystem.primary};
      cursor: default;
    }
  }
`;

export const SearchInnerTop = styled.div`
  width: 100%;
  max-width: 1080px;
  height: 105px;
  align-content: flex-end;
  ${size.mid} {
    width: 100%;
    max-width: 1080px;
    height: 200px;
  }
`;

// 상단 필터 항목
export const SearchFilter = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  .search-filter {
    display: flex;
    gap: 30px;

    > div {
      width: 52px;
      height: 55px;
      background-size: auto;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
    }

    .filter-pet {
      background-image: url(${filterPet2});
    }
    .filter-pet.active {
      background-image: url(${filterPet});
    }
    .filter-ocean {
      background-image: url(${filterOcean2});
    }
    .filter-ocean.active {
      background-image: url(${filterOcean});
    }
    .filter-mountain {
      background-image: url(${filterMountain2});
    }
    .filter-mountain.active {
      background-image: url(${filterMountain});
    }
    .filter-swim {
      background-image: url(${filterSwim2});
    }
    .filter-swim.active {
      background-image: url(${filterSwim});
    }
    .filter-wifi {
      background-image: url(${filterWifi2});
    }
    .filter-wifi.active {
      background-image: url(${filterWifi});
    }
    .filter-barbecue {
      background-image: url(${filterBarbecue2});
    }
    .filter-barbecue.active {
      background-image: url(${filterBarbecue});
    }
    .filter-toilet {
      width: 65px;
      background-image: url(${filterToilet2});
    }

    .filter-toilet.active {
      width: 65px;
      background-image: url(${filterToilet});
    }

    ${size.mid} {
      max-width: 768px;
      height: 200px;
      padding: 0 50px 50px 50px;
      flex-wrap: wrap;
      justify-content: flex-start;
      display: flex;
      /* grid-template-columns: repeat(5, 52px); */
      justify-content: center;
      gap: 5px 20px;
      > div {
        width: 52px;
        margin-right: 20px;
        margin-bottom: 20px;
      }
    }
    @media all and (max-width: 493px) {
      padding: 0 0 50px 0;
    }
  }
`;

export const SearchMenu = styled.div`
  padding: 0 20px;
  margin: 20px 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  // 정렬
  .search-aline {
    > select {
      border: none;
      font-family: "Pretendard Variable";
      background: rgba(255, 255, 255, 0);
      font-size: 16px;
      color: ${colorSystem.p900};
      text-align: center;
      outline: none;

      > option {
        color: ${colorSystem.primary};
      }
    }
  }
  // 검색 결과
  .search-result {
    font-size: 14px;
  }
`;

export const SearchInnerList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 1080px;
  padding-bottom: 40px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  @media all and (max-width: 950px) {
    width: 100%;
    margin: 0 20px;
  }
`;

// 페이지네이션 할 곳
export const SearchInnerBottom = styled.div`
  margin-top: 40px;
  .search-page {
    font-size: 18px;
    display: flex;
    gap: 40px;
  }
`;

export const NoResultStyle = styled.div`
  width: 70%;
  background-color: ${colorSystem.background};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  margin: 50px 70px;
  letter-spacing: 2px;

  .no-result-img {
    background: url(${emptyImg}) no-repeat center;
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

// Search 페이지의 카드
export const SearchContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 950px;
  height: 240px;
  padding: 40px 0;
  margin: 40px 0;
  border-top: 1px solid;
  border-color: ${colorSystem.g200};
  :last-child {
    border-bottom: none;
  }
  :first-of-type {
    border-top: none;
  }
  .search-image {
    width: 400px;
    /* width: 100%; */
    height: 240px;
    margin-left: 15px;
    border-radius: 20px;
  }
  .search-detail {
    width: 550px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 40px 10px 50px;

    .sc-top {
      .sc-name {
        font-size: 22px;
        margin-bottom: 10px;
        font-weight: 600;
      }
      .sc-review {
        display: flex;
        font-size: 15px;
        .sc-review-top {
          display: flex;
          svg {
            margin: 0 5px;
            color: #ffd233;
          }
          .sc-score {
            margin-right: 15px;
          }
        }
        .sc-review-bottom {
          .sc-count {
          }
        }
        ${size.mid} {
          flex-direction: column;
          gap: 5px;
        }
      }
    }
    .sc-bottom {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      .sc-price {
        font-size: 17px;
        font-weight: 500;
      }
    }
  }

  @media all and (max-width: 950px) {
    max-width: 950px;
    width: 100%;

    .search-image {
      min-width: 240px;
      width: 100%;
      background-size: cover;
      border-radius: 15px;
    }
    .search-detail {
      gap: 30px;
    }
  }
`;

export default SearchPageStyle;
