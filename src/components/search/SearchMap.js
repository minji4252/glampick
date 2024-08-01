import styled from "@emotion/styled";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const SearchMapStyle = styled.div`
  width: 350px;
  height: 250px;
  /* background: pink; */
  margin-top: 20px;
  margin-bottom: 30px;
  border-radius: 20px;

  @media all and (max-width: 1300px) {
    width: 100%;
    max-width: 900px;
  }
`;

const SearchMap = () => {
  return (
    <SearchMapStyle>
      <Map
        center={{ lat: 35.86952722, lng: 128.6061745 }}
        style={{ width: "100%", height: "100%", borderRadius: "20px" }}
      >
        {/* <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker> */}
      </Map>
    </SearchMapStyle>
  );
};

export default SearchMap;
