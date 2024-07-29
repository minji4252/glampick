import styled from "@emotion/styled";
import { colorSystem, size } from "../../styles/color";
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

  .임시 {
    height: 1000px;
  }
`;

const CeoReview = () => {
  return (
    <WrapStyle>
      <CeoCategories />
      <div className="inner">
        <h3>CeoReview</h3>
        <div className="임시"></div>
      </div>
    </WrapStyle>
  );
};

export default CeoReview;
