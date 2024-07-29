import styled from "@emotion/styled";
import { colorSystem } from "../../styles/color";
import CeoCategories from "../../components/ceo/CeoCategories";

const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }
  h3 {
    width: 100%;
    margin-top: 50px;
    margin-left: 120px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
  }
  .임시 {
    height: 1000px;
  }
`;

const CeoRoom = () => {
  return (
    <WrapStyle>
      <CeoCategories />
      <div className="inner">
        <h3>CeoRoom</h3>
        <div className="임시"></div>
      </div>
    </WrapStyle>
  );
};

export default CeoRoom;
