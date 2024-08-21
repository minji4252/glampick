import styled from "@emotion/styled";
import { colorSystem, size } from "../color";

export const WrapStyle = styled.div`
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
    margin-bottom: 65px;
  }

  em {
    color: ${colorSystem.g400};
    margin-left: 5px;
    font-weight: 500;
  }

  form {
    max-width: 800px;
    width: 100%;
    margin-right: 30px;

    .submit-btn {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 60px;
      margin-bottom: 30vh;
      button {
        width: 30%;
        height: 50px;
        font-size: 1.1rem;
      }
    }
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
`;

export const CeoBoxStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 20px;
  padding-bottom: 30px;
  border-radius: 20px;
  border: 1px solid ${colorSystem.g400};
  margin-bottom: 30px;

  label {
    font-weight: 600;
    color: ${colorSystem.g800};
    margin-bottom: 10px;
  }

  input,
  textarea {
    max-width: 640px;
    width: 100%;
    border: 0px;
    background-color: ${colorSystem.g100};
    height: 40px;
    border-radius: 10px;
    padding: 15px;
  }

  textarea {
    height: 140px;
    resize: none;
  }

  h4 {
    color: ${colorSystem.placeholder};
  }

  span {
    position: absolute;
    bottom: 7px;
    color: ${colorSystem.error};
    font-size: 0.8rem;
    margin-left: 10px;
    font-weight: 600;
  }

  .number-group {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .number-input {
    max-width: 150px;
    text-align: center;
  }

  .room-img-label {
    margin-bottom: 0;
  }

  .weekday-error {
    margin-left: 40px;
  }

  .weekend-error {
    margin-left: 265px;
  }

  .peopleNum-error {
    margin-left: 0px;
  }

  .peopleMax-error {
    margin-left: 150px;
  }
`;

export const PeopleNumberStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    max-width: 65px !important;
    width: 100%;
  }
`;

export const CheckInRoomStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    margin-bottom: 1px;
    margin-right: 7px;
  }

  .number-group {
    gap: 5px;
  }
`;

export const RoomOptionStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: ${colorSystem.g600};

  .option {
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 100px;
    margin: 5px;
    font-weight: 600;
    transition:
      background-color 0.3s,
      color 0.3s;
    border: 1px solid ${colorSystem.g400};

    &.selected {
      background-color: ${colorSystem.primary};
      color: ${colorSystem.white};
      border: 1px solid transparent;
      font-weight: 500;
    }
  }
`;
