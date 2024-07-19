import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import NotfoundLogo from "../images/notfound-logo.png";
import NotfoundMent from "../images/notfound-ment.png";
import NotfoundImg from "../images/notfound-onlyimg.gif";

const NotfoundWrap = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: url(${NotfoundImg}) no-repeat center;
  background-size: cover;
`;

const NotfounedMent = styled.div`
  width: 351px;
  height: 90px;
  background: url(${NotfoundMent});
`;
const NavMain = styled.div`
  width: 280px;
  height: 140px;
  background: url(${NotfoundLogo}) no-repeat center;
  background-size: cover;
  position: absolute;
  cursor: pointer;
`;
const NotfoundPage = () => {
  return (
    <NotfoundWrap>
      <div className="not-found-inner">
        <NotfounedMent />
        <Link to="/">
          <NavMain />
        </Link>
      </div>
    </NotfoundWrap>
  );
};

export default NotfoundPage;
