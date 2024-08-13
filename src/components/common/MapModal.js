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

// import React, { useEffect, useState } from "react";
// import { IoClose } from "react-icons/io5";
// import {
//   MapModalStyle,
//   SearchMapModal,
//   MapContent,
//   LeftList,
//   RightMap,
// } from "../../styles/MapModalStyle";
// import SearchMap from "../search/SearchMap";
// import MapCard from "../search/MapCard";
// import axios from "axios";

// const MapModal = ({ isOpen, onClose, center, region, region1 }) => {
//   const [searchData, setSearchData] = useState([]);

//   useEffect(() => {
//     if (isOpen) {
//       // API 호출
//       axios
//         .get("/api/glamping/search/map")
//         .then(response => {
//           const { mapList } = response.data;
//           setSearchData(mapList);
//         })
//         .catch(error => {
//           console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
//         });
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <MapModalStyle>
//       <SearchMapModal>
//         <button onClick={onClose} className="close-btn">
//           <IoClose />
//         </button>
//         <MapContent>
//           <LeftList>
//             {searchData.map(item => (
//               <MapCard
//                 key={item.glampId}
//                 glampId={item.glampId}
//                 glampPic={item.glampPic}
//                 glampName={item.glampName}
//                 region={item.region}
//                 starPoint={item.starPoint}
//                 reviewCount={item.reviewCount}
//                 price={item.price}
//                 inDate={item.inDate}
//                 outDate={item.outDate}
//                 people={item.people}
//               />
//             ))}
//           </LeftList>
//           <RightMap>
//             <SearchMap center={center} region={region} region1={region1} />
//           </RightMap>
//         </MapContent>
//       </SearchMapModal>
//     </MapModalStyle>
//   );
// };

// export default MapModal;
