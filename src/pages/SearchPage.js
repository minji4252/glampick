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
  const [searchResults, setSearchResults] = useState([]);
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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const region1 = queryParams.get("region");
  const inDate1 = queryParams.get("inDate");
  const outDate1 = queryParams.get("outDate");
  const people1 = queryParams.get("people");

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
    const getSearchResult = async () => {
      try {
        const url = `http://192.168.0.7:8080/api/glamping/search?region=${region1}&inDate=${inDate1}&outDate=${outDate1}&people=${people1}`;
        console.log("실제로 가는 데이터: ", url);
        const response = await axios.get(url);

        // const url = "http://192.168.0.7:8080/api/glamping/search";
        // const response = await axios.get(url, { params });
        // `http://192.168.0.7:8080/api/glamping/search?region=&inDate=&outDate=&people= `,);
        setSearchResults(response.data);
        console.log("검색 결과:", response.data);
      } catch (error) {
        console.log("검색 중 오류:", error);
      }
    };

    getSearchResult();
  }, [region, inDate, outDate, people]);

  return (
    <SearchPageStyle>
      <main>
        <div className="search-wrap">
          <SearchTop>
            <SearchResult>
              <ResultContents>
                {/* <label htmlFor="place" className="no-border">
                  지역
                </label>
                <input type="text" value={region}></input> */}
                <label htmlFor="place">지역</label>

                <input
                  type="text"
                  value={region}
                  onChange={e => setRegion(e.target.value)}
                />
              </ResultContents>
              <ResultContents>
                {/* <label htmlFor="date">날짜</label>
                <input
                  type="text"
                  value={"inDate - outDate"}
                  className="search-date"
                ></input> */}
                <label htmlFor="date">날짜</label>
                <input
                  type="text"
                  value={`${inDate} - ${outDate}`}
                  className="search-date"
                  onChange={e => setInDate(e.target.value)}
                />
              </ResultContents>
              <ResultContents>
                {/* <label htmlFor="member">인원</label>
                <input type="text" value={"{people}명"}></input> */}
                <label htmlFor="member">인원</label>
                <input
                  type="text"
                  value={`${people}명`}
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
                  {searchResults.length} 개 검색 결과
                </div>
              </SearchMenu>
            </SearchInnerTop>
            <SearchInnerList>
              {searchResults.map(result => (
                <SearchCard key={result.id} {...result} />
              ))}
              {/* <SearchCard />
              <SearchCard />
              <SearchCard />
              <SearchCard />
              <SearchCard /> */}
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
          <p>지역: {region1}</p>
          <p>체크인: {inDate1}</p>
          <p>체크아웃: {outDate1}</p>
          <p>인원: {people1}</p>
        </div>
      </main>
    </SearchPageStyle>
  );
};

export default SearchPage;
