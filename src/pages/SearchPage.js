import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchCard from "../components/SearchCard";
import ListPagination from "../components/common/ListPagination";
import SearchPageStyle, {
  ResultContents,
  SearchFilter,
  SearchInner,
  SearchInnerBottom,
  SearchInnerList,
  SearchInnerTop,
  SearchMenu,
  SearchResult,
  SearchTop,
  NoResultStyle,
} from "../styles/SearchPageStyle";
import "../styles/common.css";
import "../styles/reset.css";
import Loading from "../components/common/Loading";
import SearchCalendar from "../components/SearchCalendar";

const SearchPage = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [searchResults, setSearchResults] = useState({
    totalItems: 0,
    glampingListItems: [],
  });
  const [searchData, setSearchData] = useState([]);
  // 필터 아이콘 선택
  const [activeFilters, setActiveFilters] = useState({
    pet: false,
    ocean: false,
    mountain: false,
    swim: false,
    toilet: false,
    wifi: false,
    barbecue: false,
  });

  // 검색 결과
  const [region, setRegion] = useState(""); // 지역
  const [inDate, setInDate] = useState(""); // 체크인
  const [outDate, setOutDate] = useState(""); // 체크아웃
  const [people, setPeople] = useState(""); // 인원
  const [searchWord, setSearchWord] = useState("");
  const [sort, setSort] = useState(1); // 정렬 (초기값 1 - 추천순)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const [postPerPage] = useState(5); // 페이지네이션 페이지당 보여질 목록 수

  // URL 쿼리 매개변수
  const [searchParams, setSearchParams] = useSearchParams();
  const region1 = searchParams.get("region"); // URL에서 지역 가져옴
  const inDate1 = searchParams.get("inDate"); // 체크인 날짜
  const outDate1 = searchParams.get("outDate"); // 체크아웃 날짜
  const people1 = searchParams.get("people"); // 인원
  const searchWord1 = searchParams.get("searchWord"); // 검색어
  const filter1 = searchParams.get("filter"); // 필터
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState([today, tomorrow]);

  useEffect(() => {
    // 추천리스트에서 filter있는 항목 선택시 url에 뜨게 + 필터 액티브 효과 활성화
    if (filter1) {
      const filters = filter1.split(",").map(Number);
      const newActiveFilters = Object.keys(activeFilters).reduce((acc, key) => {
        acc[key] = filters.includes(filterMapping[key]);
        return acc;
      }, {});
      setActiveFilters(newActiveFilters);
    }
  }, [filter1]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let glampingUrl = `/api/glamping/search?region=${region1}&inDate=${inDate1}&outDate=${outDate1}&people=${people1}&sortType=${sort}&page=${currentPage}`;
        if (filter1) {
          glampingUrl += `&filter=${filter1}`;
        }
        if (searchWord1) {
          glampingUrl += `&searchWord=${searchWord1}`;
        }
        const glampingResponse = await axios.get(glampingUrl);
        const totalItems = glampingResponse.data.totalItems || 1;
        setSearchData(glampingResponse.data.glampingListItems);
        setSearchResults(glampingResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    region1,
    inDate1,
    outDate1,
    people1,
    searchWord1,
    sort,
    currentPage,
    filter1,
  ]);

  // 필터 아이콘 번호로
  const filterMapping = {
    pet: 4,
    ocean: 2,
    mountain: 3,
    swim: 1,
    toilet: 6,
    wifi: 7,
    barbecue: 5,
  };

  // 지역명 한글로
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
  };

  // 정렬 select값 정수로
  const handleSortChange = e => {
    setSort(parseInt(e.target.value));
  };

  // 필터 아이콘 토글 (중복 선택 가능)
  const toggleFilter = filter => {
    setActiveFilters(prevState => {
      const newFilters = { ...prevState, [filter]: !prevState[filter] };
      const filterParams = Object.keys(newFilters)
        .filter(key => newFilters[key])
        .map(key => filterMapping[key])
        .join(",");
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        filter: filterParams || "",
      });
      return newFilters;
    });
  };

  // 페이지 개수 계산
  const totalPages = Math.ceil(searchResults.totalItems / postPerPage);

  useEffect(() => {
    const params = {
      // 페이지가 변경될 때마다 URL 매개변수 업데이트
      region: region1,
      inDate: inDate1,
      outDate: outDate1,
      people: people1,
      sortType: sort,
      page: currentPage,
      filter:
        Object.keys(activeFilters)
          .filter(key => activeFilters[key])
          .map(key => filterMapping[key])
          .join(",") || "",
      searchWord: searchWord1 || "",
    };

    // 검색어 null 또는 빈문자열 아닌 경우에만 업뎃
    if (searchWord1) {
      params.searchWord = searchWord1;
    }

    // setSearchParams(params);
  }, [sort, currentPage, activeFilters, searchWord1, inDate1, outDate1]);

  useEffect(() => {
    if (people1) {
      setPeople(people1);
    }
    if (inDate1 && outDate1) {
      setSelectedDate([new Date(inDate1), new Date(outDate1)]);
    }
  }, [people1, inDate1, outDate1]);
  const handleDateChange = dates => {
    setSelectedDate(dates);
  };

  const handleApplyDate = () => {
    // 선택된 날짜에 하루를 추가
    const inDateStr = new Date(selectedDate[0].getTime() + 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    const outDateStr = new Date(selectedDate[1].getTime() + 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    setInDate(inDateStr);
    setOutDate(outDateStr);
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      inDate: inDateStr,
      outDate: outDateStr,
    });
  };

  return (
    <SearchPageStyle>
      {loading && <Loading />}
      <main>
        <div className="search-wrap">
          <SearchTop>
            <SearchResult>
              <ResultContents>
                <label htmlFor="place">지역</label>
                <select
                  value={region1}
                  className="search-place"
                  onChange={e => {
                    setRegion(e.target.value);
                    setSearchParams({
                      ...Object.fromEntries(searchParams.entries()),
                      region: e.target.value,
                    });
                  }}
                >
                  <option value="" disabled>
                    지역
                  </option>
                  {Object.keys(regionNames).map(regionKey => (
                    <option key={regionKey} value={regionKey}>
                      {regionNames[regionKey]}
                    </option>
                  ))}
                </select>
              </ResultContents>
              <ResultContents>
                <label htmlFor="date">날짜</label>
                <SearchCalendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
                <button onClick={handleApplyDate} className="date-select">
                  선택
                </button>
              </ResultContents>
              <ResultContents>
                <label htmlFor="member">인원</label>
                <div className="search-member">
                  <input
                    type="number"
                    min="2"
                    max="6"
                    value={people}
                    onChange={e => {
                      setPeople(e.target.value);
                      setSearchParams({
                        ...Object.fromEntries(searchParams.entries()),
                        people: e.target.value,
                      });
                    }}
                  />
                  <p>명</p>
                </div>
              </ResultContents>
              <ResultContents>
                <label htmlFor="input">검색어</label>
                <input
                  type="text"
                  value={searchWord1} // 검색어 업데이트
                  className="search-input"
                  onChange={e => {
                    setSearchWord(e.target.value);
                    setSearchParams({
                      ...Object.fromEntries(searchParams.entries()),
                      searchWord: e.target.value || "", // 빈 문자열로 처리
                    });
                  }}
                />
              </ResultContents>
            </SearchResult>
          </SearchTop>
          <SearchInner>
            <SearchInnerTop>
              <SearchFilter>
                <div className="search-filter">
                  <div
                    className={`filter-pet ${
                      activeFilters.pet ? "active" : ""
                    }`}
                    onClick={() => toggleFilter("pet")}
                  />
                  <div
                    className={`filter-ocean ${
                      activeFilters.ocean ? "active" : ""
                    }`}
                    onClick={() => toggleFilter("ocean")}
                  />
                  <div
                    className={`filter-mountain ${
                      activeFilters.mountain ? "active" : ""
                    }`}
                    onClick={() => toggleFilter("mountain")}
                  />
                  <div
                    className={`filter-swim ${
                      activeFilters.swim ? "active" : ""
                    }`}
                    onClick={() => toggleFilter("swim")}
                  />
                  <div
                    className={`filter-wifi ${
                      activeFilters.wifi ? "active" : ""
                    }`}
                    onClick={() => toggleFilter("wifi")}
                  />
                  <div
                    className={`filter-barbecue ${
                      activeFilters.barbecue ? "active" : ""
                    }`}
                    onClick={() => toggleFilter("barbecue")}
                  />
                  <div
                    className={`filter-toilet ${
                      activeFilters.toilet ? "active" : ""
                    }`}
                    onClick={() => toggleFilter("toilet")}
                  />
                </div>
              </SearchFilter>
              <SearchMenu>
                <div className="search-aline">
                  <select
                    name="aline"
                    id="aline"
                    value={sort}
                    onChange={handleSortChange}
                  >
                    <option value="1">추천순</option>
                    <option value="2">평점 높은순</option>
                    <option value="3">리뷰 많은순</option>
                    <option value="4">낮은 가격순</option>
                    <option value="5">높은 가격순</option>
                  </select>
                </div>
                <div className="search-result">
                  {searchResults.searchCount} 개 검색 결과
                </div>
              </SearchMenu>
            </SearchInnerTop>
            <SearchInnerList>
              {searchResults.code === "RN" ? (
                <NoResultStyle>
                  <div className="no-result-img" />
                  <h4>검색 결과가 없습니다</h4>
                  <p>{searchWord1} 에 대한 철자나 띄어쓰기를 확인해 보세요</p>
                </NoResultStyle>
              ) : (
                searchData.map(item => (
                  <SearchCard
                    key={item.glampId}
                    glampId={item.glampId}
                    glampPic={item.glampPic}
                    glampName={item.glampName}
                    region={regionNames[item.region] || ""}
                    starPoint={item.starPoint}
                    reviewCount={item.reviewCount}
                    price={item.price}
                    inDate={inDate1}
                    outDate={outDate1}
                    people={people1}
                  />
                ))
              )}
            </SearchInnerList>
            {searchResults.code !== "RN" && (
              <SearchInnerBottom>
                <ListPagination
                  currentPage={currentPage}
                  totalItems={searchResults.searchCount || 1}
                  itemsPerPage={postPerPage}
                  onPageChange={setCurrentPage}
                  totalPages={totalPages}
                />
              </SearchInnerBottom>
            )}
          </SearchInner>
        </div>
      </main>
    </SearchPageStyle>
  );
};

export default SearchPage;
