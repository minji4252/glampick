import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import "../styles/common.css";
import "../styles/reset.css";
import SearchCard from "../components/SearchCard";
import ListPagination from "../components/common/ListPagination";
import axios from "axios";
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
} from "../styles/SearchPageStyle";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState({});
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

  const [region, setRegion] = useState(""); // 지역 상태
  const [inDate, setInDate] = useState(""); // 체크인 날짜 상태
  const [outDate, setOutDate] = useState(""); // 체크아웃 날짜 상태
  const [people, setPeople] = useState(""); // 인원 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [postPerPage] = useState(5); // 페이지당 보여질 아이템 수

  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 매개변수 관리
  const region1 = searchParams.get("region"); // URL에서 지역 가져오기
  const inDate1 = searchParams.get("inDate"); // URL에서 체크인 날짜 가져오기
  const outDate1 = searchParams.get("outDate"); // URL에서 체크아웃 날짜 가져오기
  const people1 = searchParams.get("people"); // URL에서 인원 가져오기

  // 필터 아이콘 토글 (중복 선택 가능)
  const toggleFilter = filter => {
    setActiveFilters(prevState => ({
      ...prevState,
      [filter]: !prevState[filter],
    }));
  };

  const regionNames = {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const glampingUrl = `http://112.222.157.156:5124/api/glamping/search?region=${region1}&inDate=${inDate1}&outDate=${outDate1}&people=${people1}&page=${currentPage}`;
        console.log(glampingUrl);
        const glampingResponse = await axios.get(glampingUrl);
        console.log(glampingResponse.data);
        console.log(glampingResponse.data.glampingListItems);
        const glampingArray = glampingResponse.data.glampingListItems;
        setSearchData(glampingArray);
        setSearchResults(glampingResponse.data);
        console.log("글램핑 검색 결과 리스트", glampingArray);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, [region1, inDate1, outDate1, people1, currentPage]);

  // 페이지네이션
  useEffect(() => {
    // 페이지가 변경될 때마다 URL 매개변수 업데이트
    setSearchParams({
      region: region1,
      inDate: inDate1,
      outDate: outDate1,
      people: people1,
      page: currentPage,
    });
  }, [currentPage]);

  return (
    <SearchPageStyle>
      <main>
        <div className="search-wrap">
          <SearchTop>
            <SearchResult>
              <ResultContents>
                <label htmlFor="place">지역</label>
                <input
                  type="text"
                  value={regionNames[region1] || ""}
                  onChange={e => setRegion(e.target.value)}
                />
              </ResultContents>
              <ResultContents>
                <label htmlFor="date">날짜</label>
                <input
                  type="text"
                  value={`${inDate1} - ${outDate1}`}
                  className="search-date"
                  onChange={e => setInDate(e.target.value)}
                />
              </ResultContents>
              <ResultContents>
                <label htmlFor="member">인원</label>
                <input
                  type="text"
                  value={`${people1}명`}
                  onChange={e => setPeople(e.target.value)}
                />
              </ResultContents>
              <ResultContents>
                <label htmlFor="input">검색어</label>
                <input type="text" value={""} readOnly></input>
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
                  <select name="aline" id="aline">
                    <option value="star">평점 높은순</option>
                    <option value="review">리뷰 많은순</option>
                    <option value="highprice">높은 가격순</option>
                    <option value="lowprice">낮은 가격순</option>
                  </select>
                </div>
                <div className="search-result">
                  {searchResults.searchCount} 개 검색 결과
                </div>
              </SearchMenu>
            </SearchInnerTop>
            <SearchInnerList>
              {searchData.map(item => (
                <SearchCard
                  key={item.glampId}
                  glampId={item.glampId}
                  glampName={item.glampName}
                  region={regionNames[item.region] || ""}
                  starPoint={item.starPoint}
                  reviewCount={item.reviewCount}
                  price={item.price}
                />
              ))}
            </SearchInnerList>
            <SearchInnerBottom>
              <ListPagination
                currentPage={currentPage}
                totalItems={searchResults.totalItems}
                itemsPerPage={postPerPage}
                onPageChange={setCurrentPage}
              />
            </SearchInnerBottom>
          </SearchInner>
          {/* 임시 */}
          {/* <p>지역: {region1}</p>
          <p>체크인: {inDate1}</p>
          <p>체크아웃: {outDate1}</p>
          <p>인원: {people1}</p> */}
        </div>
      </main>
    </SearchPageStyle>
  );
};

export default SearchPage;
