import { useEffect, useState } from "react";
import "../styles/common.css";
import "../styles/reset.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import SearchCard from "../components/SearchCard";

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
import { useLocation, useSearchParams } from "react-router-dom";

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
  const [region, setRegion] = useState("");
  const [inDate, setInDate] = useState("");
  const [outDate, setOutDate] = useState("");
  const [people, setPeople] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const region1 = searchParams.get("region");
  const inDate1 = searchParams.get("inDate");
  const outDate1 = searchParams.get("outDate");
  const people1 = searchParams.get("people");

  // 필터 아이콘 토글 (중복 선택 가능)
  const toggleFilter = filter => {
    setActiveFilters(prevState => ({
      ...prevState,
      [filter]: !prevState[filter],
    }));
  };
  // 중복 안 되게
  // const toggleFilter = filter => {
  //   setActiveFilters(prevState => ({
  //     ...Object.fromEntries(
  //       Object.entries(prevState).map(([key]) => [key, key === filter]),
  //     ),
  //   }));
  // };

  useEffect(() => {
    // 검색 결과는 그냥 {region1 } 이런거 그대로 받아오고 axios없앰 검색 결과만 가져옴
    const fetchData = async () => {
      try {
        // Get search results
        // const searchUrl = `http://192.168.0.7:8080/api/glamping/search?region=${region1}&inDate=${inDate1}&outDate=${outDate1}&people=${people1}`;
        const glampingUrl = `http://192.168.0.7:8080/api/glamping/search?region=${region1}&inDate=${inDate1}&outDate=${outDate1}&people=${people1}`;
        // const searchResponse = await axios.get(searchUrl);
        // setSearchResults(searchResponse.data);
        // console.log("검색 결과:", searchResponse.data);

        // // Get glamping list data
        // const glampingUrl = "/api/glamping/search";
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
  }, [region1, inDate1, outDate1, people1]);

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
                  value={region1}
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
                <input type="text" value={"검색어"} readOnly></input>
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
                  region={item.region}
                  starPoint={item.starPoint}
                  reviewCount={item.reviewCount}
                  price={item.price}
                />
              ))}
            </SearchInnerList>
            <SearchInnerBottom>
              <ul className="search-page">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <MdOutlineKeyboardArrowRight />
              </ul>
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
