import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import "../styles/datepicker.css";

const MainCalendar = ({ selectedDate, setSelectedDate }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [inDate, outDate] = dateRange;

  useEffect(() => {
    setDateRange(selectedDate);
  }, [selectedDate]);

  // yyyy-MM-dd 형식으루
  const formatDate = date => {
    return date
      ? `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
      : "";
  };

  // inDate outDate 콘솔
  const handleChange = update => {
    setDateRange(update);
    setSelectedDate(update);

    if (update[0] && update[1]) {
      console.log("inDate(시작):", formatDate(update[0]));
      console.log("outDate(끝):", formatDate(update[1]));
    } else {
      console.log("inDate(시작):", formatDate(update[0]));
      console.log("outDate(끝):", formatDate(update[1]));
    }
  };

  return (
    <DatePicker
      selectsRange={true}
      startDate={inDate}
      endDate={outDate}
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
