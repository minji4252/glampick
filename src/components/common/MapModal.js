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
import LoadingNobg from "./LoadingNobg";

const MapModal = ({
  isOpen,
  onClose,
  center,
  region1,
  inDate,
  outDate,
  inDate1,
  outDate1,
  people,
}) => {
  const [searchData, setSearchData] = useState([]);
  // 로딩
  const [isLoading, setIsLoading] = useState(true);

  // 지역 기준으로 리스트 받아옴
  useEffect(() => {
    if (isOpen && region1) {
      setIsLoading(true);
      axios
        .get("/api/glamping/search/map", {
          params: { region: region1 },
        })
        .then(response => {
          const { mapList } = response.data;
          setSearchData(mapList);
          setIsLoading(false);
        })
        .catch(error => {
          console.error("지역 기준으로 리스트 받아옴 오류: ", error);
          setIsLoading(false);
        });
    }
  }, [isOpen, region1]);

  if (!isOpen) return null;

  // searchData에서 위도 경도 가격 가져오기
  const markers = searchData.map(item => ({
    lat: parseFloat(item.lat),
    lng: parseFloat(item.lng),
    price: item.price,
    glampName: item.glampName,
    glampId: item.glampId,
  }));

  return (
    <MapModalStyle>
      <SearchMapModal>
        <button onClick={onClose} className="close-btn">
          <IoClose />
        </button>
        <MapContent>
          {isLoading ? ( // 로딩 상태일 때 로딩 컴포넌트 표시
            <LoadingNobg />
          ) : (
            <>
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
                    inDate={inDate}
                    outDate={outDate}
                    inDate1={inDate1}
                    outDate1={outDate1}
                    people={people}
                  />
                ))}
              </LeftList>
              <RightMap>
                <SearchMap
                  center={center}
                  region1={region1}
                  markers={markers}
                  inDate={inDate}
                  outDate={outDate}
                  people={people}
                />
              </RightMap>
            </>
          )}
        </MapContent>
      </SearchMapModal>
    </MapModalStyle>
  );
};

export default MapModal;
