import React from "react";
import styled from "@emotion/styled";
import { Map, MapMarker } from "react-kakao-maps-sdk";
// import markerImage from "../../images/icon/location-red.png";
import markerImage from "../../images/icon/location-cute.png";

const SearchMapStyle = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;

  @media all and (max-width: 1300px) {
    width: 100%;
    max-width: 900px;
  }
`;

const SearchMap = ({ center, region, region1, markers = [] }) => {
  const defaultCenter = { lat: 36.1398393, lng: 128.1135947 }; // 기본 좌표(전국)

  // 전국일 때만 레벨 12, 아니면 10
  const zoomLevel = region === "all" || region1 === "all" ? 12 : 10;

  // 가격 단위
  const formattedPrice = price => {
    return Number(price).toLocaleString("ko-KR");
  };

  // 커스텀 마커 설정
  const imageSize = { width: 43, height: 43 }; // 이미지 크기
  const imageOptions = { offset: { x: 27, y: 69 } }; // 이미지 내 위치

  return (
    <SearchMapStyle>
      <Map
        center={center || defaultCenter}
        style={{ width: "100%", height: "100%" }}
        level={zoomLevel}
      >
        {markers.map((marker, index) => (
          <MapMarker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            image={{
              src: markerImage,
              size: {
                width: imageSize.width,
                height: imageSize.height,
              },
              options: {
                offset: {
                  x: imageOptions.offset.x,
                  y: imageOptions.offset.y,
                },
              },
            }}
          >
            <div style={{ color: "#000" }}>{formattedPrice(marker.price)}</div>
          </MapMarker>
        ))}
      </Map>
    </SearchMapStyle>
  );
};

export default SearchMap;
