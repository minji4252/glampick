import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import "../styles/datepicker.css";

const MainCalendar = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={update => {
        setDateRange(update);
      }}
      isClearable={true}
      locale={ko}
      dateFormat="yyyy-MM-dd"
      placeholderText="날짜를 선택하세요"
      className="datepicker-custom"
    />
  );
};

export default MainCalendar;
