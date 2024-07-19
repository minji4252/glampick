import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import styled from "@emotion/styled";

const SearchDate = styled.div`
  .datepicker-custom {
    width: 260px;
    height: 40px;
    background: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 10px;
    padding-left: 10px;
    font-size: 18px;
    color: #424242;
  }
  .react-datepicker {
    border-radius: 20px;
  }
  .react-datepicker__day:nth-child(1),
  .react-datepicker__day-name:nth-child(1) {
    color: #ff5858;
  }
  .react-datepicker__day:nth-child(7),
  .react-datepicker__day-name:nth-child(7) {
    color: blue;
  }
  .react-datepicker__header {
    border-radius: 20px 20px 0 0;
  }
  .react-datepicker__header:not(.react-datepicker__header--has-time-select) {
    border-radius: 20px 20px 0 0;
  }
  .react-datepicker__current-month {
    color: #355179;
  }
  .react-datepicker__day-name {
    color: #424242;
  }
  .react-datepicker__close-icon::after {
    background-color: rgba(255, 255, 255, 0);
    border-color: rgba(255, 255, 255, 0);
    color: rgba(255, 255, 255, 0);
    font-size: 0px;
    cursor: default;
  }
  .react-datepicker__day--in-range {
    border-radius: 20px;
    background: #3d5d8b;
    color: #fff;
  }
  .react-datepicker__day {
  }
  .datepicker-custom {
    background: rgba(255, 255, 255, 0);
    width: 230px;
    font-size: 16px;
  }
  .react-datepicker__input-container .react-datepicker__day--selected {
    border-radius: 20px;
  }
  .react-datepicker__day--keyboard-selected {
    border-radius: 20px;
  }
  .react-datepicker__day--highlighted {
    border-radius: 20px;
  }
  .react-datepicker__day--in-selecting-range:not(
      .react-datepicker__day--in-range,
      .react-datepicker__month-text--in-range,
      .react-datepicker__quarter-text--in-range,
      .react-datepicker__year-text--in-range
    ) {
    border-radius: 20px;
  }
  .react-datepicker__day:hover {
    border-radius: 20px;
  }
  .react-datepicker__day--in-selecting-range:not {
    border-radius: 20px;
  }
`;

const SearchCalendar = ({ selectedDate, setSelectedDate }) => {
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    if (selectedDate && selectedDate[0] && selectedDate[1]) {
      setDateRange(selectedDate);
    }
  }, [selectedDate]);

  const handleChange = update => {
    setDateRange(update);
    setSelectedDate(update);
  };

  return (
    <SearchDate>
      <DatePicker
        selectsRange={true}
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        onChange={handleChange}
        isClearable={true}
        locale={ko}
        dateFormat="yyyy-MM-dd"
        placeholderText="날짜를 선택하세요"
        minDate={new Date()} // 지난 날짜 선택 못하게
        className="datepicker-custom"
      />
    </SearchDate>
  );
};

export default SearchCalendar;
