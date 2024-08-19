import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMountainData, getPetData, getPopularData } from "../apis/main";
import MainCalendar from "../components/MainCalendar";
import MainCard from "../components/MainCard";
import { ActionButton } from "../components/common/Button";
import glampickLogoMain from "../images/glampick_logo_white.png";
import LoginUserIcon from "../images/icon/main-login-user.png";
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
} from "../styles/MainPageStyle";
import "../styles/common.css";
import "../styles/reset.css";
import MainBanner from "../components/MainBanner";

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

interface GlampingData {
  glampId: string;
  glampingName: string;
  region: keyof typeof regionNames;
  starPoint: number;
  reviewCount: number;
  price: number;
  glampingImg: string;
}

interface MainPageProps {
  isLogin: boolean;
  isCeoLogin: boolean;
  handleLogout: () => void;
}

const MainPage: React.FC<MainPageProps> = ({
  isLogin,
  isCeoLogin,
  handleLogout,
}) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [popularData, setPopularData] = useState<GlampingData[]>([]);
  const [petData, setPetData] = useState<GlampingData[]>([]);
  const [mountainData, setMountainData] = useState<GlampingData[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string>("all"); // 선택 지역
  const [selectedDate, setSelectedDate] = useState<Date[]>([today, tomorrow]);
  const [selectedMember, setSelectedMember] = useState<number>(2); // 선택 인원수
  const [selectedWord, setSelectedWord] = useState<string>(""); // 검색어
  const navigate = useNavigate();

  // 검색 결과 (우리나라 날짜로)
  const formatDateLocal = (date: Date | undefined) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const queryParams = new URLSearchParams({
      region: selectedPlace,
      inDate: formatDateLocal(selectedDate[0]),
      outDate: formatDateLocal(selectedDate[1]),
      people: selectedMember.toString(),
      searchWord: selectedWord,
    });

    const url = `/search?${queryParams.toString()}`;
    navigate(url);
  };

  // 데이터 불러오기
  const fetchData = async (
    fetchFunction: () => Promise<GlampingData[]>,
    setData: React.Dispatch<React.SetStateAction<GlampingData[]>>,
  ) => {
    try {
      const dataArray = await fetchFunction();
      setData(dataArray);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData(getPopularData, setPopularData);
  }, []);

  useEffect(() => {
    fetchData(getPetData, setPetData);
  }, []);

  useEffect(() => {
    fetchData(getMountainData, setMountainData);
  }, []);

  const handleDateSelect = (date: Date[]) => {
    setSelectedDate(date);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
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
            {isLogin || isCeoLogin ? (
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
                  <Link
                    to={isCeoLogin ? "/ceoglamping" : "/bookingdetail"}
                    className="main-user-nav"
                  >
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
                    // console.log("선택한 지역:", e.target.value);
                  }}
                >
                  <option value="all">전국</option>
                  <option value="seoul">서울/경기</option>
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
                <div className="m-sc-member-icon" />
                <input
                  type="number"
                  min="2"
                  max="6"
                  id="memberinput"
                  value={selectedMember}
                  onChange={e =>
                    setSelectedMember(
                      Number(e.target.value),
                      // console.log("선택 인원:", e.target.value);
                    )
                  }
                  onKeyDown={handleKeyDown}
                />
                <p>명</p>
              </li>
              <li className="m-sc-input">
                <div className="m-sc-input-field">
                  <div className="search-icon" />
                  <input
                    className="input"
                    placeholder="여행지나 숙소 검색"
                    type="text"
                    value={selectedWord}
                    onChange={e => setSelectedWord(e.target.value)}
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
          <MainBanner />
          <MainList>
            <MainListTitle>
              <Link
                to={`/search?region=all&inDate=${selectedDate[0]?.toISOString().slice(0, 10)}&outDate=${selectedDate[1]?.toISOString().slice(0, 10)}&people=${2}`}
              >
                <p>🥇 지금 가장 인기있는</p>
              </Link>
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
                    glampingImg={item.glampingImg}
                  />
                ))}
              </>
            </MainListContents>
          </MainList>
          <MainList>
            <MainListTitle>
              <Link
                to={`/search?region=all&inDate=${selectedDate[0]?.toISOString().slice(0, 10)}&outDate=${selectedDate[1]?.toISOString().slice(0, 10)}&people=${2}&filter=4`}
              >
                <p>🐶 반려동물과 함께할 수 있는</p>
              </Link>
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
                    glampingImg={item.glampingImg}
                  />
                ))}
              </>
            </MainListContents>
          </MainList>
          <MainList>
            <MainListTitle>
              <Link
                to={`/search?region=all&inDate=${selectedDate[0]?.toISOString().slice(0, 10)}&outDate=${selectedDate[1]?.toISOString().slice(0, 10)}&people=${2}&filter=3`}
              >
                <p>🏕️ 산속에서 즐기는</p>
              </Link>
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
                    glampingImg={item.glampingImg}
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
