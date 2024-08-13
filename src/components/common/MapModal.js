import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  MapModalStyle,
  SearchMapModal,
  MapContent,
  LeftList,
  RightMap,
} from "../../styles/MapModalStyle";
import SearchMap from "../search/SearchMap";
import MapCard from "../search/MapCard";
import axios from "axios";

const MapModal = ({ isOpen, onClose, center, region1 }) => {
  const [searchData, setSearchData] = useState([]);

  // 지역 기준으로 리스트 받아옴
  useEffect(() => {
    if (isOpen && region1) {
      axios
        .get("/api/glamping/search/map", {
          params: { region: region1 },
        })
        .then(response => {
          const { mapList } = response.data;
          setSearchData(mapList);
        })
        .catch(error => {
          console.error("지역 기준으로 리스트 받아옴 오류: ", error);
        });
    }
  }, [isOpen, region1]);

  if (!isOpen) return null;

  // searchData에서 위도 경도 가격 가져오기
  const markers = searchData.map(item => ({
    lat: parseFloat(item.lat),
    lng: parseFloat(item.lng),
    price: item.price,
  }));

  return (
    <MapModalStyle>
      <SearchMapModal>
        <button onClick={onClose} className="close-btn">
          <IoClose />
        </button>
        <MapContent>
          <LeftList>
            {searchData.map(item => (
              <MapCard
                key={item.glampId}
                glampId={item.glampId}
                glampPic={item.glampPic}
                glampName={item.glampName}
                region={item.region}
                starPoint={item.starPoint}
                reviewCount={item.reviewCount}
                price={item.price}
                inDate={item.inDate}
                outDate={item.outDate}
                people={item.people}
              />
            ))}
          </LeftList>
          <RightMap>
            <SearchMap center={center} region1={region1} markers={markers} />
          </RightMap>
        </MapContent>
      </SearchMapModal>
    </MapModalStyle>
  );
};

export default MapModal;
