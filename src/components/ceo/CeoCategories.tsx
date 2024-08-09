import styled from "@emotion/styled";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useCeo } from "../../contexts/CeoContext";
import { colorSystem } from "../../styles/color";

const CategoriesStyle = styled.div`
  position: fixed;
  top: 180px;
  left: 90px;
  max-width: 270px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  > div {
    cursor: default;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 4px;
  }

  h2 {
    font-size: 1rem;
    color: ${colorSystem.g400};
  }

  @media all and (max-width: 1910px) {
    position: relative;
    top: 70px;
    left: 90px;
  }
`;

const NavLinkStyle = styled(NavLink)`
  width: 200px;
  background-color: ${colorSystem.white};
  padding: 10px;
  font-size: 1.1rem;
  white-space: pre;
  font-weight: 700;
  color: ${colorSystem.g800};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 30px;
  margin-bottom: 5px;
  span {
    height: 20px;
  }

  &:hover {
    color: ${colorSystem.ceo700};
  }

  &.active {
    color: ${colorSystem.g800};
    background-color: ${colorSystem.ceo300};
    font-weight: 700;
  }
`;

const UnderLine = styled.div`
  border-bottom: 2px solid ${colorSystem.g300};
  margin: 30px 0;
`;

const categorieTab = [
  { name: "ceoglamping", text: "글램핑장 관리" },
  { name: "ceoroom", text: "객실 관리" },
  { name: "ceobooking", text: "예약 관리" },
  { name: "ceoreview", text: "리뷰 관리" },
  { name: "chart", text: "매장 분석" },
  { name: "ceoinfo", text: "내 정보 관리" },
];
const CeoCategories = () => {
  const { ceoInfo } = useCeo();
  const ceoPreEmail = ceoInfo.ownerEmail.split("@")[0];

  return (
    <CategoriesStyle>
      <div>
        <h1>{ceoInfo.ownerName}님</h1>
        <h2>@{ceoPreEmail}</h2>
      </div>

      <UnderLine />
      {categorieTab.map(category => (
        <NavLinkStyle key={category.name} to={`/${category.name}`}>
          <span>{category.text}</span> <IoIosArrowForward />
        </NavLinkStyle>
      ))}
    </CategoriesStyle>
  );
};

export default CeoCategories;
