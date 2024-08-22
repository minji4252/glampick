import styled from "@emotion/styled";
import SearchIcon from "../images/icon/icon-search-white.png";
import MemberIcon from "../images/icon/main-member-icon.png";
import MainBigImage from "../images/main-big.gif";
import TopIcon from "../images/icon/gototop.png";
import { colorSystem, size } from "../styles/color";

// 메인 페이지

// 메인 헤더
export const MainHeader = styled.div`
  align-content: center;
  position: fixed;
  width: 100%;
  height: 110px;
  max-width: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: block;
  z-index: 999;
  transition: top 0.3s;
  .main-login {
    width: 130px;
    height: 35px;
    background: #fff;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    p {
      color: #355179;
    }
  }
  .main-nav {
    display: flex;
    gap: 10px;
  }
  .main-logout {
    width: 85px;
    height: 35px;
    background: #fff;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    p {
      font-weight: 500;
      color: #355179;
    }
  }
  .main-user {
    display: flex;
    align-items: flex-end;
    .main-user-icon {
      width: 35px;
      height: 35px;
    }
  }
`;

export const MainPageStyle = styled.div`
  position: relative;

  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
// 메인 상단 섹션
export const MainSec1 = styled.section`
  height: 1080px;
  width: 100%;
  padding: 0 10px;
  max-width: 100%;
  display: block;
  background: url(${MainBigImage}) no-repeat center;
  background-size: cover;
  ${size.large} {
    display: inline-flex;
    flex-direction: column;
  }
`;

export const MainBigTitle = styled.div`
  margin-top: 380px;
  margin-bottom: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  .main-title {
    display: flex;
    gap: 10px;
    > p {
      font-weight: bold;
      font-size: 45px;
      color: #fff;
      letter-spacing: -0.9px;
      cursor: default;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    ${size.large} {
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    ${size.mid} {
      gap: 10px;
      > p {
        font-size: 38px;
      }
    }
  }
  ${size.large} {
    margin-top: 230px;
    margin-bottom: 70px;
  }
  ${size.mid} {
    margin-top: 200px;
    margin-bottom: 50px;
  }
`;

// 메인 검색창
export const MainSearch = styled.div`
  height: 100px;
  margin-bottom: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  .header-button {
    width: 130px;
    height: 40px;
    background: #355179;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    color: #fff;
  }
  ${size.large} {
    height: auto;
  }
`;
// 메인 검색 항목
export const MainSearchContent = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  ${size.large} {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  ${size.mid} {
    gap: 10px;
  }

  > li {
    float: left;
  }

  .m-sc-place {
    width: 110px;
    height: 50px;

    > select {
      width: 110px;
      height: 50px;
      border-radius: 30px;
      border: none;
      font-family: "Pretendard Variable";
      background: rgba(255, 255, 255, 0);
      font-size: 20px;
      color: ${colorSystem.white};
      text-align: center;
      outline: none;
      cursor: pointer;
      > option {
        background-color: ${colorSystem.g150};
        border-radius: 10px;
        color: ${colorSystem.g800};
      }
    }
  }

  .m-sc-date {
    border-left: 2px solid ${colorSystem.white};
    height: 50px;
    padding-left: 20px;
    margin: 0 20px;
    display: flex;
    align-items: center;

    ${size.large} {
      padding: 0;
      border: none;
    }
  }

  .m-sc-member {
    border-left: 2px solid ${colorSystem.white};
    height: 50px;
    padding-left: 40px;
    margin: 0 20px;
    display: flex;
    align-items: center;
    .m-sc-member-icon {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      background: url(${MemberIcon}) no-repeat center;
    }
    > input {
      width: 30px;
      /* width: 80px; */
      height: 50px;
      text-align: center;
      justify-content: center;
      align-items: center;
      border-radius: 50px;
      border: none;
      font-size: 20px;
      color: ${colorSystem.white};
      background: rgba(255, 255, 255, 0);
      outline: none;
      cursor: pointer;
    }
    > p {
      font-size: 20px;
      color: ${colorSystem.white};
      cursor: default;
    }
    ${size.large} {
      padding: 0;
      border: none;
    }
  }
  .m-sc-input {
    border-left: 2px solid ${colorSystem.white};
    height: 50px;
    padding-left: 20px;
    margin: 0 20px;
    align-items: center;
    display: flex;
    ${size.large} {
      padding: 0;
      border: none;
    }
    .m-sc-input-field {
      display: flex;
      .search-icon {
        width: 40px;
        height: 40px;
        background: url(${SearchIcon}) no-repeat center;
        margin-right: 10px;
      }
      > input {
        width: 180px;
        background: rgba(255, 255, 255, 0.7);
        border: none;
        border-radius: 10px;
        font-size: 20px;
        color: ${colorSystem.g800};
        padding-left: 10px;
        ::placeholder {
          font-size: 18px;
        }
      }
    }
  }
  .m-sc-search button {
    display: flex;
    width: 110px;
    height: 45px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 500px;
    background: ${colorSystem.white};
    border: none;
    color: ${colorSystem.g800};
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: bold;
    ${size.large} {
      margin-top: 20px;
    }
    ${size.mid} {
      margin-top: 10px;
    }
  }
`;

// 메인 하단 섹션
export const MainSec2 = styled.section`
  padding-top: 100px;
  padding-bottom: 200px;
  max-width: 950px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 80px;
`;

// 추천 글램핑장 리스트 (3 항목)
export const MainList = styled.div``;
export const MainListTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
  color: ${colorSystem.g800};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  ${size.mid} {
    display: flex;
    justify-content: center;
    font-size: 25px;
  }
`;
export const MainListContents = styled.div`
  width: 100%;
  display: flex;
  gap: 40px;
  margin-bottom: 70px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  ${size.mid} {
    flex-direction: column;
  }
`;
export const GotoTop = styled.div`
  .top-icon {
    width: 43px;
    height: 43px;
    position: fixed;
    cursor: pointer;
    right: 50px;
    bottom: 50px;
    background: url(${TopIcon}) no-repeat center;
  }
`;

// 메인 카드 컴포넌트
export const MainArticle = styled.article`
  display: flex;
  flex-direction: column;
  :hover {
    transform: translateY(-5px);
    transition: 0.5s;
  }
  .article-image {
    position: relative;
    width: 290px;
    height: 190px;
    border-radius: 32px;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);

    .article-place {
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      width: 100%;
      height: 34px;
      border-radius: 0px 0px 32px 32px;
      background: rgba(123, 123, 123, 0.5);
      padding: 0 20px;
      font-size: 16px;
      color: #fff;
      font-weight: 600;
      svg {
        width: 20px;
        height: 20px;
        color: #fff;
        margin-right: 2px;
      }
    }
  }
  ${size.mid} {
    display: flex;
    flex-direction: row;
  }
`;

export const ArticleContent = styled.div`
  margin: 20px 10px 0 10px;
  ${size.mid} {
    margin-left: 20px;
    align-content: center;
  }
  .article-top {
    display: flex;
    flex-direction: column;

    .article-detail {
      justify-content: flex-end;
    }
    .review-count {
      justify-content: flex-end;
    }

    ${size.mid} {
      flex-direction: column;
      align-items: baseline;
      margin-bottom: 10px;
      gap: 5px;
    }
  }
  .glamping-name {
    font-size: 18px;
    font-weight: 600;
  }
  .article-detail {
    display: flex;
    cursor: default;

    svg {
      margin: 0 5px;
      color: #ffd233;
    }
    .review-score {
      margin-right: 5px;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .review-count {
    font-size: 14px;
    display: flex;
    justify-self: flex-end;
  }
  .article-bottom {
    display: flex;
    margin-top: 5px;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 12px;
    .glamping-price {
      font-size: 16px;
      font-weight: 600;
      padding-bottom: 5px;
      cursor: default;
    }
    ${size.mid} {
      margin-top: 20px;
      flex-direction: column;
    }
  }
`;

export default MainPageStyle;
