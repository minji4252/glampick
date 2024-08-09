import React from "react";
import { IoClose } from "react-icons/io5";
import {
  MapModalStyle,
  SearchMapModal,
  MapContent,
  LeftList,
  RightMap,
} from "../../styles/MapModalStyle";
import SearchMap from "../search/SearchMap";
import SearchCard from "../search/SearchCard";
import MapCard from "../search/MapCard";

const MapModal = ({ isOpen, onClose, searchData, center, region, region1 }) => {
  if (!isOpen) return null;

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
            <SearchMap center={center} region={region} region1={region1} />
          </RightMap>
        </MapContent>
      </SearchMapModal>
    </MapModalStyle>
  );
};

export default MapModal;
