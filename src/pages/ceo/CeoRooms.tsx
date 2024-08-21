import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import PeakModal from "../../components/ceo/PeakModal";
import AlertModal from "../../components/common/AlertModal";
import { CeoActionButton, DeleteButton } from "../../components/common/Button";
import CheckModal from "../../components/common/CheckModal";
import Loading from "../../components/common/Loading";
import CeoCategories from "../../components/mypage/CeoCategories";
import { useGlamping } from "../../contexts/GlampingContext";
import { colorSystem, size } from "../../styles/color";
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
  position: relative;
  border: 1px solid ${colorSystem.g200};

  &:hover {
    .rooms-item-btn {
      opacity: 1;
    }
  }

  .rooms-item {
    border-radius: 15px;
  }

  .rooms-item-btn {
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;

    button {
      width: 90px;
      height: 30px;
      border: 1px solid ${colorSystem.g500};
    }
  }

  span {
    width: 100%;
    position: absolute;
    right: 0px;
    bottom: 0px;
    font-weight: 500;
    font-size: 0.8rem;
    letter-spacing: 0.6px;
    border-radius: 0px 0px 13px 13px;
    padding: 5px 5px 2px 5px;
    cursor: default;
    background-color: rgba(0, 0, 0, 0.2);
    color: ${colorSystem.white};
    text-align: right;
  }
`;

interface Room {
  roomId: string;
  roomName: string;
  roomImg: string;
}

const CeoRooms = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState<boolean>(false);
  const [checkModalMessage, setCheckModalMessage] = useState<string>("");
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const ceoAccessToken = useFetchCeoAccessToken();
  const { glampId } = useGlamping();

  // 객실 정보 리스트 불러오기
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        if (!ceoAccessToken) return;
        const response = await axios.get(`/api/owner/room/${glampId}`, {
          headers: {
            Authorization: `Bearer ${ceoAccessToken}`,
          },
        });
        setRooms(response.data.room);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // 삭제 확인
  const handleDeleteClick = (roomId: string) => {
    const selectedRoom = rooms.find(room => room.roomId === roomId);
    if (selectedRoom) {
      setSelectedRoomId(roomId);
      setIsCheckModalOpen(true);
      setCheckModalMessage(
        `'${selectedRoom.roomName}' 객실을 \n 삭제하시겠습니까?`,
      );
    }
  };

  // 객실 삭제
  const handleConfirmDelete = async () => {
    setIsCheckModalOpen(false);
    try {
      if (!ceoAccessToken || !selectedRoomId) return;
      const response = await axios.delete(`/api/owner/room/${selectedRoomId}`, {
        headers: {
          Authorization: `Bearer ${ceoAccessToken}`,
        },
      });

      if (response.data.code === "SU") {
        setRooms(prevRooms =>
          prevRooms.filter(room => room.roomId !== selectedRoomId),
        );
        setIsAlertModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseAlertModal = () => {
    setIsAlertModalOpen(false);
  };

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
        {loading ? (
          <Loading />
        ) : (
          <>
            <RoomsTitle>
              <h3>객실 관리</h3>
              <CeoActionButton onClick={handleOpenModal} label="성수기 설정" />
            </RoomsTitle>
            <RoomListStyle>
              <RoomAddStyle>
                <Link to="/ceoroom/new">
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
                  <div className="rooms-item-btn">
                    <Link to={`/ceoroom/edit/${room.roomId}`}>
                      <CeoActionButton label="수정" />
                    </Link>
                    <DeleteButton
                      label="삭제"
                      onClick={() => handleDeleteClick(room.roomId)}
                    />
                  </div>

                  <span>{room.roomName}</span>
                  <div className="rooms-item" />
                </RoomsStyle>
              ))}
            </RoomListStyle>
          </>
        )}
      </div>
      {isModalOpen && (
        <PeakModal
          onClose={handleCloseModal}
          ceoAccessToken={ceoAccessToken}
          glampId={glampId}
        />
      )}
      <CheckModal
        isOpen={isCheckModalOpen}
        onClose={() => setIsCheckModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message={checkModalMessage}
      />
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={handleCloseAlertModal}
        message="삭제가 완료되었습니다."
      />
    </WrapStyle>
  );
};

export default CeoRooms;
