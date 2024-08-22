import styled from "@emotion/styled";
import Spinner from "../../images/Ellipsis@1x-1.5s-200px-200px.gif";
import { colorSystem } from "../../styles/color";

const LoadingWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  /* background: rgba(255, 255, 255, 0.8); */
  z-index: 9999;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    font-size: 1rem;
    color: ${colorSystem.g600};
  }
`;
export const LoadingNobg = () => {
  return (
    <LoadingWrapper>
      <img src={Spinner} alt="로딩중" width="5%" />
      <div>잠시만 기다려주세요</div>
    </LoadingWrapper>
  );
};

export default LoadingNobg;
