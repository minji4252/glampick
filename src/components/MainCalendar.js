import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import "../styles/datepicker.css";

const MainCalendar = ({ selectedDate, setSelectedDate }) => {
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
  );
};

export default MainCalendar;
