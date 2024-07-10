import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import glampickLogoMain from "../images/glampick_logo_white.png";
import SearchIcon from "../images/icon/icon-search-white.png";
import MemberIcon from "../images/icon/main-member-icon.png";
import MainBigImage from "../images/main-big.gif";
import LoginUserIcon from "../images/icon/main-login-user.png";
import TopIcon from "../images/icon/gototop.png";

import { Link } from "react-router-dom";
import MainCard from "../components/MainCard";
import { colorSystem, size } from "../styles/color";
import "../styles/common.css";
import "../styles/reset.css";
import { ActionButton } from "../components/common/Button";

import MainCalendar from "../components/MainCalendar";
import axios from "axios";
import AlertModal from "../components/common/AlertModal";
import useModal from "../hooks/UseModal";

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
  background-size: cover;
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
      /* position: absolute; */
    }
    > p {
      /* position: relative; */
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
  gap: 80px;
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
  width: 100%;
  display: flex;
  gap: 40px;
  margin-bottom: 70px;

  ${size.mid} {
    flex-direction: column;
  }
`;
const GotoTop = styled.div`
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

const MainPage = ({ isLogin }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [popularData, setPopularData] = useState([]);
  const [petData, setPetData] = useState([]);
  const [mountainData, setMountainData] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("seoul"); // 선택 지역
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
  const [selectedMember, setSelectedMember] = useState(2); // 선택 인원 수
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  // const [openModal, setOpenModal] = useState(false);
  // const [alertMessage, setAlertMessage] = useState("");

  const handleSearch = () => {
    // 날짜 필수 선택
    if (!selectedDate) {
      alert("날짜를 선택해 주세요.");
      return;
    }
    const baseUrl = "http://localhost:8080/api/glamping/search";
    const queryParams = new URLSearchParams({
      region: selectedPlace,
      inDate: selectedDate.toISOString().slice(0, 10),
      outDate: selectedDate.toISOString().slice(0, 10),
      people: selectedMember,
    });
    const url = `${baseUrl}?${queryParams.toString()}`;
    // const url = `${baseUrl}?region=${selectedPlace}&inDate=${inDate}&outDate=${outDate}&people=${selectedMember}`;
    window.location.href = url;
  };

  // 지금 가장 인기있는 TOP3
  useEffect(() => {
    const getPopularData = async () => {
      try {
        const response = await axios.get("/api/main");
        const popularArray = response.data.popular;
        console.log("인기 top3");
        console.log(popularArray);
        setPopularData(popularArray);
      } catch (error) {
        console.error(error);
      }
    };
    getPopularData();
  }, []);

  // 반려동물과 함께할 수 있는 TOP 3
  useEffect(() => {
    const getPetData = async () => {
      try {
        const response = await axios.get("/api/main");
        const petArray = response.data.petFriendly;
        console.log("반려동물 top3");
        console.log(petArray);
        setPetData(petArray);
      } catch (error) {
        console.error(error);
      }
    };
    getPetData();
  }, []);

  // 산속에서 즐기는 TOP 3
  useEffect(() => {
    const getMountainData = async () => {
      try {
        const response = await axios.get("/api/main");
        const mountainArray = response.data.mountainView;
        console.log("마운틴뷰 top3");
        console.log(mountainArray);
        setMountainData(mountainArray);
      } catch (error) {
        console.error(error);
      }
    };
    getMountainData();
  }, []);

  // 헤더 숨김, 표시
  useEffect(() => {
    function handleScroll() {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // 위에서부터 400px까지는 항상 헤더 표시하긔
      // 아래에서부터 1000px 이내 항상 헤더 숨기기
      if (currentScrollTop <= 400) {
        setIsVisible(true);
      } else if (
        currentScrollTop >=
        document.documentElement.scrollHeight - window.innerHeight - 1100
      ) {
        setIsVisible(false);
      } else {
        if (currentScrollTop > lastScrollTop) {
          setIsVisible(false); // 스크롤 다운시 헤더 숨김
        } else {
          setIsVisible(true); // 스크롤 업시 헤더 표시
        }
      }

      setLastScrollTop(currentScrollTop);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  // "맨 위로" 버튼
  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          <div className="main-nav">
            {isLogin ? (
              <>
                <button className="main-logout">
                  <Link to="/">
                    <p>로그아웃</p>
                  </Link>
                </button>
                <div className="main-user">
                  <Link to="/bookingdetail" className="main-user-nav">
                    <img
                      src={LoginUserIcon}
                      alt="로그인 유저 아이콘"
                      className="main-user-icon"
                    />
                  </Link>
                </div>
              </>
            ) : (
              <button className="main-login">
                <Link to="/login">
                  <p>로그인/회원가입</p>
                </Link>
              </button>
            )}
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
                <select
                  name="place"
                  id="place"
                  value={selectedPlace}
                  onChange={e => setSelectedPlace(e.target.value)}
                >
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
                <MainCalendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </li>
              <li className="m-sc-member">
                <div className="m-sc-member-icon"></div>
                <input
                  type="number"
                  min="2"
                  max="6"
                  defaultValue={2}
                  id="memberinput"
                  value={selectedMember}
                  onChange={e => setSelectedMember(e.target.value)}
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
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </li>
              <li className="m-sc-search">
                <Link to="/search">
                  <ActionButton label="검색" onClick={handleSearch} />
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
              <>
                {popularData.map(item => (
                  <MainCard
                    key={item.glampId}
                    glampId={item.glampId}
                    glampingName={item.glampingName}
                    region={item.region}
                    starPoint={item.starPoint}
                    reviewCount={item.reviewCount}
                    price={item.price}
                  />
                ))}
              </>
            </MainListContents>
          </MainList>
          <MainList>
            <MainListTitle>
              <p>🐶 반려동물과 함께할 수 있는</p>
            </MainListTitle>
            <MainListContents>
              <>
                {petData.map(item => (
                  <MainCard
                    key={item.glampId}
                    glampId={item.glampId}
                    glampingName={item.glampingName}
                    region={item.region}
                    starPoint={item.starPoint}
                    reviewCount={item.reviewCount}
                    price={item.price}
                  />
                ))}
              </>
            </MainListContents>
          </MainList>
          <MainList>
            <MainListTitle>
              <p>🏕️ 산속에서 즐기는</p>
            </MainListTitle>
            <MainListContents>
              <>
                {mountainData.map(item => (
                  <MainCard
                    key={item.glampId}
                    glampId={item.glampId}
                    glampingName={item.glampingName}
                    region={item.region}
                    starPoint={item.starPoint}
                    reviewCount={item.reviewCount}
                    price={item.price}
                  />
                ))}
              </>
            </MainListContents>
          </MainList>
        </MainSec2>
        <GotoTop>
          <div className="top-icon" onClick={MoveToTop}></div>
        </GotoTop>
      </main>
      {/* 모달 관련 */}
      {/* <AlertModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        message={alertMessage}
      /> */}
    </WrapStyle>
  );
};

export default MainPage;
