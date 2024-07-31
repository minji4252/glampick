import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CustomCalendarHeader, StyledCalendarWrapper } from "./CalendarStyle";
import moment from "moment";

const BookingCalendar = () => {
  return (
    <StyledCalendarWrapper>
      <Calendar
        // 헤더를 커스터마이즈
        view="month"
        formatDay={(locale, date) => moment(date).format("D")}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        value={new Date()}
        // customHeader라는 이름으로 커스터마이징
        customHeader={CustomCalendarHeader}
      />
    </StyledCalendarWrapper>
  );
};

export default BookingCalendar;
