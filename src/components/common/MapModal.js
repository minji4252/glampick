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

const MapModal = ({ isOpen, onClose, searchData }) => {
  if (!isOpen) return null;

  return (
    <MapModalStyle>
      <SearchMapModal>
        <button onClick={onClose} className="close-btn">
          <IoClose />
        </button>
        <MapContent>
          <LeftList>
            {/* {searchData.map(item => (
              <SearchCard
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
            ))} */}
          </LeftList>
          <RightMap>
            <SearchMap />
          </RightMap>
        </MapContent>
      </SearchMapModal>
    </MapModalStyle>
  );
};

export default MapModal;
