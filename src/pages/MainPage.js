import { useEffect, useState } from "react";
import glampickLogoMain from "../images/glampick_logo_white.png";
import LoginUserIcon from "../images/icon/main-login-user.png";
import { Link, useNavigate } from "react-router-dom";
import MainCard from "../components/MainCard";
import "../styles/common.css";
import "../styles/reset.css";
import { ActionButton } from "../components/common/Button";
import MainCalendar from "../components/MainCalendar";
import axios from "axios";
import AlertModal from "../components/common/AlertModal";
import useModal from "../hooks/UseModal";
import MainPageStyle, {
  GotoTop,
  MainBigTitle,
  MainHeader,
  MainList,
  MainListContents,
  MainListTitle,
  MainSearch,
  MainSearchContent,
  MainSec1,
  MainSec2,
  WrapStyle,
} from "../styles/MainPageStyle";
import { removeCookie } from "../utils/cookie";

const MainPage = ({ isLogin }) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [popularData, setPopularData] = useState([]);
  const [petData, setPetData] = useState([]);
  const [mountainData, setMountainData] = useState([]);
  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();
  const [selectedPlace, setSelectedPlace] = useState("seoul"); // 선택 지역
  const [selectedDate, setSelectedDate] = useState([today, tomorrow]);
  const [selectedMember, setSelectedMember] = useState(2); // 선택 인원 수
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const navigate = useNavigate();

  // 로그아웃
  const handleLogout = () => {
    removeCookie("access-Token", { path: "/" });
    navigate("/login");
  };

  const handleSearch = () => {
    const formatDate = date => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const queryParams = new URLSearchParams({
      region: selectedPlace,
      inDate: formatDate(selectedDate[0]),
      outDate: formatDate(selectedDate[1]),
      people: selectedMember,
    });

    const url = `/search?${queryParams.toString()}`;
    window.location.href = url; // 페이지 이동
  };

  // 지금 가장 인기있는 TOP3
  useEffect(() => {
    const getPopularData = async () => {
      try {
        const response = await axios.get("/api/main");
        const popularArray = response.data.popular;
        // console.log("인기 top3");
        // console.log(popularArray);
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
        // console.log("반려동물 top3");
        // console.log(petArray);
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
        // console.log("마운틴뷰 top3");
        // console.log(mountainArray);
        setMountainData(mountainArray);
      } catch (error) {
        console.error(error);
      }
    };
    getMountainData();
  }, []);

  const handleDateSelect = date => {
    setSelectedDate(date);
    console.log("선택 날짜:", date);
  };

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
    <MainPageStyle>
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
                <button
                  className="main-logout"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <p>로그아웃</p>
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
                  onChange={e => {
                    setSelectedPlace(e.target.value);
                    console.log("선택한 지역:", e.target.value);
                  }}
                >
                  <option value="none" disabled>
                    지역
                  </option>
                  <option value="seoul" selected>
                    서울/경기
                  </option>
                  <option value="gangwon">강원</option>
                  <option value="chungbuk">충북</option>
                  <option value="chungnam">충남</option>
                  <option value="gyeongbuk">경북</option>
                  <option value="gyeongnam">경남</option>
                  <option value="jeonbuk">전북</option>
                  <option value="jeonnam">전남</option>
                  <option value="jeju">제주</option>
                </select>
              </li>
              <li className="m-sc-date">
                <MainCalendar
                  selectedDate={selectedDate}
                  setSelectedDate={handleDateSelect}
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
                  onChange={e => {
                    setSelectedMember(e.target.value);
                    console.log("선택 인원:", e.target.value);
                  }}
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
                <Link
                  to={`/search?region=${selectedPlace}&inDate=${selectedDate[0]?.toISOString().slice(0, 10)}&outDate=${selectedDate[1]?.toISOString().slice(0, 10)}&people=${selectedMember}`}
                >
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
    </MainPageStyle>
  );
};

export default MainPage;
