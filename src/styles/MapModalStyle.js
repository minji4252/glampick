import styled from "@emotion/styled";
import { colorSystem } from "./color";

export const MapModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid ${colorSystem.p100};
  width: calc(100% - 15%);
  height: calc(100% - 15%);
  font-size: 0.8rem;
  background: ${colorSystem.white};
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 99999;
  > p {
    margin-top: 15px;
    color: ${colorSystem.g800};
    font-weight: 500;
    font-size: 0.8rem;
    padding: 0 15px;
    line-height: 1.1rem;
  }

  .close-btn {
    background-color: transparent;
    border: 0px;
    position: absolute;
    width: 17px;
    top: 0;
    right: 10px;
    cursor: pointer;
    max-width: 25px;
  }

  .close-btn svg {
    width: 150%;
    height: 25px;
    color: #777;
  }
`;
export const SearchMapModal = styled.div``;

export const MapContent = styled.div`
  display: grid;
  flex-direction: row;
  grid-template-columns: 1fr 3fr;
`;

export const LeftList = styled.div`
  background: pink;
`;
export const RightMap = styled.div`
  background: skyblue;
`;
