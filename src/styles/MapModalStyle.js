import styled from "@emotion/styled";
import { colorSystem, size } from "./color";

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
  overflow: hidden;
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
    top: 5px;
    right: 15px;
    cursor: pointer;
    max-width: 25px;
    z-index: 9;
  }

  .close-btn svg {
    width: 150%;
    height: 25px;
    color: #777;
  }
`;
export const SearchMapModal = styled.div`
  height: 100%;
`;

export const MapContent = styled.div`
  display: grid;
  height: 100%;
  flex-direction: row;
  grid-template-columns: 1fr 2.5fr;
`;

export const LeftList = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`;
export const RightMap = styled.div`
  /* overflow: hidden; */
`;

export const MapCardContent = styled.div`
  /* overflow-y: auto; */
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  /* max-width: 950px; */
  /* height: 240px; */
  padding: 20px 10px;
  padding-right: 35px;
  border-top: 1px solid;
  border-color: ${colorSystem.g200};
  :last-child {
    border-bottom: none;
  }
  :first-of-type {
    border-top: none;
  }
  .map-image {
    /* width: 200px; */
    width: 100%;
    height: 240px;
    margin-left: 15px;
    border-radius: 20px;
  }
  .map-detail {
    /* width: 550px; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 20px 10px 30px;

    .map-top {
      .map-name {
        font-size: 20px;
        margin-bottom: 10px;
        font-weight: 600;
      }
      .map-review {
        display: flex;
        font-size: 14px;
        .map-review-top {
          display: flex;

          svg {
            margin: 0 5px;
            color: #ffd233;
          }
          .map-score {
            margin-right: 15px;
          }
        }
        .map-review-bottom {
          .sc-count {
          }
        }
        ${size.mid} {
          flex-direction: column;
          gap: 5px;
        }
      }
    }
    .map-bottom {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      .map-price {
        font-size: 15px;
        font-weight: 500;
      }
    }
  }

  @media all and (max-width: 950px) {
    max-width: 950px;
    width: 100%;

    .map-image {
      min-width: 240px;
      width: 100%;
      background-size: cover;
      border-radius: 15px;
    }
    .map-detail {
      gap: 30px;
    }
  }
`;
