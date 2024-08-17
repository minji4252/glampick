import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
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

  .price-label {
    position: absolute;
    bottom: 70px;
    left: -30px;
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
    z-index: 1;
  }

  .custom-overlay {
    font-size: 14px;
    font-weight: 500;
    color: ${colorSystem.ceo};
    padding: 8px;
    border-radius: 8px;
    background-color: ${colorSystem.background};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    border: 1px solid ${colorSystem.ceo};
  }
`;

const SearchMap = ({
  center,
  region,
  region1,
  markers = [],
  inDate,
  outDate,
  people,
}) => {
  const mapContainer = useRef(null);

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

      // 가격 뜨기
      const priceLabel = `
        <div class="price-label" onclick="handlePriceLabelClick('${marker.lat}', '${marker.lng}', '${marker.glampId}', '${marker.glampName}')">
          ${formattedPrice(marker.price)}
        </div>
      `;

      const priceOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: priceLabel,
        zIndex: 200,
      });

      priceOverlay.setMap(map);
    });

    // 가격 클릭하면 글램핑장 이름 뜨기
    window.handlePriceLabelClick = (lat, lng, glampId, glampName) => {
      const position = new window.kakao.maps.LatLng(lat, lng);
      const content = `
        <div class="custom-overlay" onclick="handleInfoWindowClick('${glampId}')">
          ${glampName}
        </div>
      `;

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: content,
        yAnchor: 1.9,
        zIndex: 1000,
      });

      customOverlay.setMap(map);
    };

    // 글램핑장 이름 클릭 시 페이지 이동
    window.handleInfoWindowClick = glampId => {
      const url = `/places/${glampId}?inDate=${inDate}&outDate=${outDate}&people=${people}`;
      window.location.href = url;
    };

    return () => {
      if (mapContainer.current) {
        mapContainer.current.innerHTML = "";
      }
      window.handlePriceLabelClick = null;
      window.handleInfoWindowClick = null;
    };
  }, [center, zoomLevel, markers, inDate, outDate, people]);

  // 가격 포맷팅
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
