import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CeoCategories from "../../components/ceo/CeoCategories";
import { CeoActionButton } from "../../components/common/Button";
import PeakModal from "../../components/common/PeakModal";
import { colorSystem, size } from "../../styles/color";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import useFetchCeoAccessToken from "../../utils/CeoAccessToken";

const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }
  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
  }

  @media all and (max-width: 1910px) {
    display: flex;
    .inner {
      margin-left: 82px;
    }
  }

  ${size.mid} {
    flex-direction: column;
    h3 {
      margin-top: 250px;
    }
  }
`;
const RoomsTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 50px;
  margin: 42px 0 65px 120px;
`;

const RoomListStyle = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  margin-left: 200px;
  margin-top: 50px;
  margin-bottom: 50vh;
`;

const RoomAddStyle = styled.div`
  a {
    display: block;
  }
  max-width: 150px;
  width: 100%;
`;

const RoomAddBtnStyle = styled.button`
  width: 100%;
  height: 150px;
  background-color: ${colorSystem.g100};
  border: 2px dashed ${colorSystem.g200};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    width: 25px;
    height: 25px;
    color: ${colorSystem.ceo};
  }

  span {
    font-weight: 600;
    font-size: 1rem;
    color: ${colorSystem.g800};
  }

  &:hover {
    background-color: ${colorSystem.g150};
    border: 2px dashed ${colorSystem.g300};
  }
`;

const RoomsStyle = styled.div`
  max-width: 150px;
  width: 100%;
  height: 150px;
  border-radius: 15px;
  cursor: pointer;
  position: relative;

  .rooms-item {
    border-radius: 15px;
  }

  span {
    position: absolute;
    right: 10px;
    bottom: 5px;
    color: ${colorSystem.white};
    font-weight: 500;
    font-size: 0.9rem;
    letter-spacing: 1px;
  }
`;

const CeoRoom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ceoAccessToken = useFetchCeoAccessToken();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        if (!ceoAccessToken) return;
        const response = await axios.get(`/api/owner/room/2`, {
          headers: {
            Authorization: `Bearer ${ceoAccessToken}`,
          },
        });
        setRooms(response.data.room);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRooms();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <WrapStyle>
      <CeoCategories />
      <div className="inner">
        <RoomsTitle>
          <h3>객실 관리</h3>
          <CeoActionButton onClick={handleOpenModal} label="성수기 설정" />
        </RoomsTitle>
        <RoomListStyle>
          <RoomAddStyle>
            <Link to="/ceorooms">
              <RoomAddBtnStyle>
                <FaPlus />
                <span>객실 등록</span>
              </RoomAddBtnStyle>
            </Link>
          </RoomAddStyle>
          {rooms.map(room => (
            <RoomsStyle key={room.roomId}>
              <div
                className="rooms-item"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${room.roomImg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
              <span>{room.roomName}</span>
            </RoomsStyle>
          ))}
        </RoomListStyle>
      </div>
      {isModalOpen && <PeakModal onClose={handleCloseModal} />}
    </WrapStyle>
  );
};

export default CeoRoom;
