import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../atoms/loginState";
import { colorSystem } from "../../styles/color";

const CategoriesStyle = styled.div`
  position: fixed;
  top: 180px;
  left: 90px;
  max-width: 270px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 1rem;

  > div {
    cursor: default;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-use-select: none;
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
  width: 166px;
  font-size: 1.1rem;
  white-space: pre;
  padding-bottom: 0.25rem;
  font-weight: 700;
  color: ${colorSystem.g900};
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    height: 20px;
  }

  &:hover {
    color: ${colorSystem.g500};
  }

  &.active {
    color: ${colorSystem.ceo};
    font-weight: 700;

    span {
      border-bottom: 2px solid ${colorSystem.ceo};
    }
  }

  > svg {
    color: ${colorSystem.ceo};
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
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [userInfo, setUserInfo] = useState({
    userEmail: "",
    userNickname: "",
  });

  // 토큰정보 불러오기
  useEffect(() => {
    const fetchAccessToken = () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          setAccessToken(token);
        } else {
          console.log("엑세스 토큰 없음");
        }
      } catch (error) {
        console.log("엑세스 토큰 가져오는 중 에러", error);
      }
    };
    fetchAccessToken();
  }, []);

  // 유저 정보 불러오기
  useEffect(() => {
    const getUser = async () => {
      try {
        if (!accessToken) return;
        const response = await axios.get(`/api/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // console.log(response);
        setUserInfo({
          userEmail: response.data.userEmail,
          userNickname: response.data.userNickname,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [accessToken]);

  const userPreEmail = userInfo.userEmail.split("@")[0];

  return (
    <CategoriesStyle>
      <div>
        <h1>김사장님{userInfo.userNickname}</h1>
        <h2>@ceo123{userPreEmail}</h2>
      </div>

      <UnderLine />
      {categorieTab.map(categoty => (
        <NavLinkStyle key={categoty.name} to={`/${categoty.name}`}>
          <span>{categoty.text}</span> <IoIosArrowForward />
        </NavLinkStyle>
      ))}
    </CategoriesStyle>
  );
};

export default CeoCategories;
