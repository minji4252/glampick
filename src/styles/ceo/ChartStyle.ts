import styled from "@emotion/styled";
import { colorSystem, size } from "../color";

export const ChartWrapStyle = styled.div`
  margin-bottom: 20vw;
  .inner {
    flex-direction: column;
  }
  h3 {
    width: 100%;
    margin-top: 50px;
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

  .chart-title {
    display: flex;
    width: 100%;
    margin-left: 120px;
  }
`;

export const StateStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  margin-top: 35px;
  margin-left: 180px;
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  > div {
    border: 1px solid ${colorSystem.g150};
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.07) 3px 3px 3px 0px;
    max-width: 140px;
    width: 100%;
    padding: 10px;
    font-weight: 500;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;

    h2 {
      color: ${colorSystem.g800};
      font-size: 0.8rem;
      font-weight: 600;
      margin-top: 3px;
    }

    p {
      font-size: 1rem;
      font-family: "Radio Canada", sans-serif !important;
      font-weight: 400;
    }
  }

  .starpoint-icon {
    display: flex;
    align-items: center;
    gap: 4px;

    svg {
      color: ${colorSystem.star};
      font-size: 1.1rem;
    }
  }

  .bookmark-icon {
    display: flex;
    align-items: center;
    gap: 4px;

    svg {
      color: ${colorSystem.error};
      font-size: 1rem;
    }
  }
`;

export const TapStyle = styled.div`
  width: 100%;
  max-width: 900px;
  margin-top: 30px;

  .period-select {
    justify-content: flex-end;
    gap: 10px;

    span {
      cursor: pointer;
      &:hover {
        color: ${colorSystem.ceo300};
      }
    }
  }

  .period-select span.active {
    color: ${colorSystem.ceo};
    font-weight: 700;
    font-size: 1rem;
  }

  > div {
    width: 100%;
    display: flex;
    gap: 30px;
    margin-bottom: 20px;
  }

  li {
    padding: 7px;
    width: 100%;
    height: 100px;
    border: 1px solid ${colorSystem.g150};
    font-weight: 600;
    color: ${colorSystem.g800};
    font-size: 0.85rem;
    list-style: none;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.07) 3px 3px 3px 0px;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${colorSystem.g100};
    }
  }

  .focused {
    background-color: ${colorSystem.ceo300};
    transition: background-color 0.3s;

    &:hover {
      background-color: ${colorSystem.ceo300};
    }
  }

  p {
    padding: 0;
    width: 100%;
    height: 85%;
    text-align: center;
    line-height: 60px;
    font-weight: 400;
    font-size: 1.5rem;
    font-family: "Radio Canada", sans-serif !important;
  }
`;

export const ChartCalendarStyle = styled.div<{ show: boolean }>`
  opacity: ${({ show }) => (show ? 1 : 0)};
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
  justify-content: flex-end;
  margin-bottom: 15px !important;

  .datepicker-custom {
    border: 1px solid ${colorSystem.g150};
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.07) 3px 3px 3px 0px;
    font-size: 0.8rem !important;
    width: 190px !important;
    text-align: center;
    padding: 0 !important;
    font-family: "Radio Canada", sans-serif !important;
    font-weight: 400;
    color: ${colorSystem.black};
  }
`;

export const ListContent = styled.div`
  max-width: 900px;

  width: 100%;
  font-size: 2rem;
  margin-bottom: 30vh;
  margin-top: 30px;

  > div {
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.07) 3px 3px 3px 0px;
    border-radius: 12px;
    border: 1px solid ${colorSystem.g150};
  }
`;
