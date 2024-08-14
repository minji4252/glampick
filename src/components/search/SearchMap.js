import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import markerImage from "../../images/icon/location-icon.png";
import { colorSystem } from "../../styles/color";

const SearchMapStyle = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;

  @media all and (max-width: 1300px) {
    width: 100%;
    max-width: 900px;
  }

  .label {
    position: absolute;
    bottom: 70px;
    left: -35px;
    padding: 5px;
    background-color: white;
    border: 1px solid ${colorSystem.primary};
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    font-size: 14px;
    font-weight: 500;
    color: ${colorSystem.primary};
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
  }

  .map-card {
    display: none;
    position: absolute;
    top: -30px;
    background-color: white;
    border: 1px solid ${colorSystem.ceo};
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    padding: 10px;
    font-size: 14px;
    font-weight: 500;
    color: ${colorSystem.ceo};
    white-space: nowrap;
    z-index: 1000;
    max-width: 200px;
    transform: translate(-50%, -100%);
  }

  .label:hover + .map-card {
    display: block;
    z-index: 1000;
  }
`;

const SearchMap = ({ center, region, region1, markers = [] }) => {
  const mapContainer = useRef(null);
  const defaultCenter = { lat: 36.1398393, lng: 128.1135947 };

  // all(전국)이면 줌12, 아니면 10
  const zoomLevel = region === "all" || region1 === "all" ? 12 : 10;

  useEffect(() => {
    if (!window.kakao) {
      console.error("카카오 맵 로드 안됨");
      return;
    }

    if (!mapContainer.current) {
      console.error("mapContainer가 null 아닌지?");
      return;
    }

    const mapOption = {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level: zoomLevel,
    };

    const map = new window.kakao.maps.Map(mapContainer.current, mapOption);

    // 마커랑 오버레이
    markers.forEach(marker => {
      const position = new window.kakao.maps.LatLng(marker.lat, marker.lng);

      // CustomOverlay에 필요한 HTML
      const content = `
        <div class="label">${formattedPrice(marker.price)}</div>
        <div class="map-card">카드 띄우기</div>
        
      `;

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: content,
        zIndex: 1,
      });

      customOverlay.setMap(map);
    });

    return () => {
      if (mapContainer.current) {
        mapContainer.current.innerHTML = "";
      }
    };
  }, [center, zoomLevel, markers]);

  // 가격 단위
  const formattedPrice = price => {
    return Number(price).toLocaleString("ko-KR");
  };

  return (
    <SearchMapStyle>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }}></div>
    </SearchMapStyle>
  );
};

export default SearchMap;
