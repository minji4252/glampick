import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import NotfoundLogo from "../images/notfound-logo.png";
import NotfoundImg from "../images/notfound-onlyimg.gif";
import { colorSystem } from "../styles/color";

const NotfoundWrap = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: url(${NotfoundImg}) no-repeat center;
  background-size: cover;

  .not-found-inner {
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .not-found-btn {
    width: 100%;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    width: fit-content;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const NotfounedMent = styled.div`
  color: ${colorSystem.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  p {
    font-size: 1.4rem;
    font-weight: 200;
  }

  h1 {
    font-size: 2.2rem;
    font-weight: 600;
  }
`;

const NavMain = styled.div`
  width: 280px;
  height: 140px;
  background: url(${NotfoundLogo}) no-repeat center;
  background-size: cover;
  position: absolute;
  cursor: pointer;
  border-radius: 20px;

  &:hover {
    background-color: #283b45;
    transition: all 0.5s;
  }
`;
const NotfoundPage = () => {
  return (
    <NotfoundWrap>
      <div className="not-found-inner">
        <NotfounedMent>
          <p>찾으려는 페이지의 주소가 잘못 입력되었거나</p>
          <p>주소의 변경 또는 삭제로 인해</p>
          <h1>원하시는 페이지를 찾을 수 없습니다</h1>
          <p>입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요</p>
        </NotfounedMent>
        <div className="not-found-btn">
          <Link to="/">
            <NavMain />
          </Link>
        </div>
      </div>
    </NotfoundWrap>
  );
};

export default NotfoundPage;
