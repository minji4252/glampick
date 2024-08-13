import styled from "@emotion/styled";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const SearchMapStyle = styled.div`
  width: 100%;
  height: 100%;
  /* margin-bottom: 30px; */
  position: relative;
  display: flex;

  @media all and (max-width: 1300px) {
    width: 100%;
    max-width: 900px;
  }
`;

const SearchMap = ({ center, region, region1 }) => {
  const defaultCenter = { lat: 36.1398393, lng: 128.1135947 }; // 기본 좌표 (전국)

  // 전국일때만 레벨 12, 아니면 8
  const zoomLevel = region === "all" || region1 === "all" ? 12 : 8;

  return (
    <SearchMapStyle>
      <Map
        center={center || defaultCenter}
        style={{ width: "100%", height: "100%" }}
        level={zoomLevel}
      >
        {/* <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker> */}
      </Map>
    </SearchMapStyle>
  );
};

export default SearchMap;
