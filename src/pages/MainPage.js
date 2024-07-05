import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import glampickLogoMain from "../images/glampick_logo_white.png";
import SearchIcon from "../images/icon/icon-search-white.png";
import MemberIcon from "../images/icon/main-member-icon.png";
import MainBigImage from "../images/main-big.gif";

import { Link } from "react-router-dom";
import MainCard from "../components/MainCard";
import { colorSystem, size } from "../styles/color";
import "../styles/common.css";
import "../styles/reset.css";
import { ActionButton } from "../components/common/Button";

const MainHeader = styled.div`
  align-content: center;
  position: fixed;
  width: 100%;
  height: 110px;
  max-width: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: block;
  z-index: 999;
  transition: top 0.3s;
  button {
    width: 130px;
    height: 40px;
    background: #fff;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    p {
      color: #355179;
    }
  }
`;

const WrapStyle = styled.div`
  position: relative;

  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
// 메인 상단 섹션
const MainSec1 = styled.section`
  height: 1080px;
  width: 100%;
  padding: 0 10px;
  max-width: 100%;
  display: block;
  background: url(${MainBigImage}) no-repeat center;
  ${size.large} {
    display: inline-flex;
    flex-direction: column;
  }
`;

const MainBigTitle = styled.div`
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
    }
    ${size.large} {
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    ${size.mid} {
      gap: 10px;
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
const MainSearch = styled.div`
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
const MainSearchContent = styled.ul`
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

    /* border-right: 1px solid ${colorSystem.white}; */

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
      > option {
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
    > input {
      font-size: 17px;
      width: 180px;
      height: 40px;
      justify-content: center;
      text-align: center;
      background: rgba(255, 255, 255, 0.7);
      border: none;
      border-radius: 10px;
      color: ${colorSystem.g800};
    }
    > p {
      margin: 0 10px;
      font-size: 25px;
      color: ${colorSystem.white};
    }
    ${size.large} {
      padding: 0;
      border: none;
    }
  }

  .m-sc-member {
    border-left: 2px solid ${colorSystem.white};
    height: 50px;
    padding-left: 20px;
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
    }
    > p {
      font-size: 20px;
      color: ${colorSystem.white};
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
        font-family: "Pretendard Variable";
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
    color: ${colorSystem.primary};
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
const MainSec2 = styled.section`
  padding-top: 100px;
  padding-bottom: 200px;
  max-width: 950px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

// 추천 글램핑장 리스트 (3 항목)
const MainList = styled.div``;
const MainListTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
  color: ${colorSystem.g800};
  ${size.mid} {
    display: flex;
    justify-content: center;
    font-size: 25px;
  }
`;
const MainListContents = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 70px;
  ${size.mid} {
    flex-direction: column;
  }
`;

const MainPage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        setIsVisible(false); // 스크롤 다운시 헤더 숨김
      } else {
        setIsVisible(true); // 스크롤 업시 헤더 표시
      }
      setLastScrollTop(currentScrollTop);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <WrapStyle>
      <MainHeader style={{ top: isVisible ? "0" : "-110px" }}>
        <div className="nav-inner">
          <div className="header-logo">
            <Link to="/" className="header-logo-link">
              <img
                src={glampickLogoMain}
                alt="글램픽 로고"
                className="header-logo-img"
              />
            </Link>
          </div>
          <div className="header-nav">
            <button className="header-button">
              <Link to="/login">
                <p>로그인/회원가입</p>
              </Link>
            </button>
          </div>
        </div>
      </MainHeader>

      <main className="main">
        <MainSec1>
          <MainBigTitle>
            <div className="main-title">
              <p>별빛 아래, 자연과 하나 되는</p>
              <p>특별한 밤을 예약하세요.</p>
            </div>
          </MainBigTitle>
          <MainSearch>
            <MainSearchContent>
              <li className="m-sc-place">
                <select name="place" id="place">
                  <option value="none" disabled>
                    지역
                  </option>
                  <option value="seoul" selected>
                    서울/경기
                  </option>
                  <option value="gangwon">강원</option>
                  <option value="cn">충북</option>
                  <option value="cs">충남</option>
                  <option value="tk">경북</option>
                  <option value="pk">경남</option>
                  <option value="jn">전북</option>
                  <option value="js">전남</option>
                  <option value="jeju">제주</option>
                </select>
              </li>
              <li className="m-sc-date">
                <input type="date" />
                <p>-</p>
                <input type="date" />
              </li>
              <li className="m-sc-member">
                <div className="m-sc-member-icon"></div>
                <input
                  type="number"
                  min="2"
                  max="6"
                  defaultValue={2}
                  id="memberinput"
                />
                <p>명</p>
              </li>
              <li className="m-sc-input">
                <div className="m-sc-input-field">
                  <div className="search-icon"></div>
                  <input
                    className="input"
                    placeholder="여행지나 숙소 검색"
                    type="text"
                  />
                </div>
              </li>
              <li className="m-sc-search">
                <Link to="/search">
                  <ActionButton label="검색"></ActionButton>
                </Link>
              </li>
            </MainSearchContent>
          </MainSearch>
        </MainSec1>
        <MainSec2>
          <MainList>
            <MainListTitle>
              <p>🥇 지금 가장 인기있는</p>
            </MainListTitle>
            <MainListContents>
              <MainCard />
              <MainCard />
              <MainCard />
            </MainListContents>
          </MainList>
          <MainList>
            <MainListTitle>
              <p>🐶 반려동물과 함께할 수 있는</p>
            </MainListTitle>
            <MainListContents>
              <MainCard />
              <MainCard />
              <MainCard />
            </MainListContents>
          </MainList>
          <MainList>
            <MainListTitle>
              <p>🏕️ 산속에서 즐기는</p>
            </MainListTitle>
            <MainListContents>
              <MainCard />
              <MainCard />
              <MainCard />
            </MainListContents>
          </MainList>
        </MainSec2>
      </main>
    </WrapStyle>
  );
};

export default MainPage;
