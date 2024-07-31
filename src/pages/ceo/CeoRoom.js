import styled from "@emotion/styled";
import { useState } from "react";
import { Link } from "react-router-dom";
import CeoCategories from "../../components/ceo/CeoCategories";
import { CeoActionButton } from "../../components/common/Button";
import PeakModal from "../../components/common/PeakModal";
import { colorSystem, size } from "../../styles/color";
import { FaPlus } from "react-icons/fa6";

const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }
  h3 {
    /* width: 100%; */
    /* margin-top: 50px; */
    margin-left: 120px;
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

  a {
    max-width: 150px;
    width: 100%;
  }
`;
const RoomsTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
`;

const RoomsStyle = styled.div`
  width: 100%;
  margin-top: 50px;
  margin-left: 50px;
`;

const RoomAddStyle = styled.button`
  max-width: 150px;
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

  margin-bottom: 1000px;

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

const CeoRoom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <CeoActionButton
            onClick={handleOpenModal}
            label="성수기 및 주말 설정"
          />
        </RoomsTitle>
        <RoomsStyle>
          <Link to="/ceorooms">
            <RoomAddStyle>
              <FaPlus />
              <span>객실 추가</span>
            </RoomAddStyle>
          </Link>
        </RoomsStyle>
      </div>
      {isModalOpen && <PeakModal onClose={handleCloseModal} />}
    </WrapStyle>
  );
};

export default CeoRoom;
