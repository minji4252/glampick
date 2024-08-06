import styled from "@emotion/styled";
import { colorSystem } from "../../styles/color";

interface CustomCalendarHeaderProps {
  date: Date;
  onClick: () => void;
}

export const CustomCalendarHeader: React.FC<CustomCalendarHeaderProps> = ({
  date,
  onClick,
}) => {
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });

  return (
    <div>
      <button onClick={onClick}>{`${month} ${year}`}</button>
    </div>
  );
};

export const StyledCalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 2rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 3% 4%;
    background-color: white;
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      font-size: 0.8rem;
      color: ${colorSystem.g800};
    }
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 600;
    font-size: 1.2rem;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    background-color: white;
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: white;
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  /* 요일 */
  .react-calendar__month-view__weekdays {
    margin-bottom: 7px;
  }

  /* 요일 글자 스타일*/
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
  }

  /* 일요일 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: ${colorSystem.error};
  }

  /* 토요일 파란 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
    color: #1273e4;
  }

  /* 오늘 날짜 */
  .react-calendar__tile--now {
    background: none;
    abbr {
      color: ${colorSystem.g900};
      font-weight: 600;
    }
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    border-radius: 0.8rem;
    padding: 0;
  }

  /* 네비게이션 현재 월 스타일 적용 */
  .react-calendar__tile--hasActive {
    abbr {
      color: white;
    }
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
    padding: 10px 0px 50px;
    position: relative;
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    border-radius: 0.3rem;
  }
`;
