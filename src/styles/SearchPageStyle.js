import styled from "@emotion/styled";
import { colorSystem, size } from "../styles/color";
import filterPet from "../images/icon/filter-pet.png";
import filterPet2 from "../images/icon/filter-pet2.png";
import filterOcean from "../images/icon/filter-ocean.png";
import filterOcean2 from "../images/icon/filter-ocean2.png";
import filterMountain from "../images/icon/filter-mountain.png";
import filterMountain2 from "../images/icon/filter-mountain2.png";
import filterSwim from "../images/icon/filter-swim.png";
import filterSwim2 from "../images/icon/filter-swim2.png";
import filterToilet from "../images/icon/filter-toilet.png";
import filterToilet2 from "../images/icon/filter-toilet2.png";
import filterWifi from "../images/icon/filter-wifi.png";
import filterWifi2 from "../images/icon/filter-wifi2.png";
import filterBarbecue from "../images/icon/filter-barbecue.png";
import filterBarbecue2 from "../images/icon/filter-barbecue2.png";

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
  margin-top: 80px;
  background: #eaeff6;
  display: flex;
  justify-content: center;
  align-items: center;
  @media all and (max-width: 950px) {
    height: 120px;
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
    width: 80px;
    height: 25px;
    border: none;
    font-size: 16px;
    background: rgba(255, 255, 255, 0);
    color: ${colorSystem.g800};
    margin-left: 10px;
  }
  .search-date {
    width: 240px;
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

export default SearchPageStyle;
