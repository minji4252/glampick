import React from "react";

import { IoClose } from "react-icons/io5";
import {
  MapModalStyle,
  SearchMapModal,
  MapContent,
  LeftList,
  RightMap,
} from "../../styles/MapModalStyle";

const MapModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <MapModalStyle>
      <SearchMapModal>
        <button onClick={onClose} className="close-btn">
          <IoClose />
        </button>
        <MapContent>
          <LeftList>리스트 부분</LeftList>
          <RightMap>지도 부분</RightMap>
        </MapContent>
      </SearchMapModal>
    </MapModalStyle>
  );
};

export default MapModal;
