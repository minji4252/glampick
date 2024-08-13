import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useRecoilState } from "recoil";
import { ceoAccessTokenState } from "../../atoms/loginState";
import { StyledCalendarWrapper } from "./CalendarStyle";

interface BookingInfo {
  ingCount: number;
  cancelCount: number;
  completeCount: number;
}
interface BookingCalendarProps {
  onDateSelect: (date: Date) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onDateSelect }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [ceoAccessToken] = useRecoilState(ceoAccessTokenState);
  const [bookings, setBookings] = useState<Record<string, BookingInfo>>({});

  // 총 예약수 가져오기
  useEffect(() => {
    const getOwnerBookCount = async (date: Date) => {
      if (!ceoAccessToken) return;

      const formattedDate = moment(date).format("YYYY-MM-DD");

      try {
        const response = await axios.get(
          `/api/owner/book/count?date=${formattedDate}&page=1`,
          {
            headers: {
              Authorization: `Bearer ${ceoAccessToken}`,
            },
          },
        );
        console.log(response);
        // console.log(response.data.countList);

        // 기존 예약 데이터를 키로 변환하여 상태에 저장
        const bookingData = response.data.countList.reduce(
          (acc: Record<string, any>, curr: any) => {
            acc[curr.checkInDate] = {
              ingCount: curr.ingCount || 0,
              cancelCount: curr.cancelCount || 0,
              completeCount: curr.completeCount || 0,
            };
            return acc;
          },
          {},
        );
        setBookings(bookingData);
      } catch (error) {
        console.log(error);
      }
    };
    getOwnerBookCount(date);
  }, [ceoAccessToken, date]);

  const handleDateChange = (newDate: any) => {
    if (newDate === null) return;

    // 단일 날짜만 선택되도록 하기
    const selectedDate = Array.isArray(newDate) ? newDate[0] : newDate;
    if (selectedDate) {
      setDate(selectedDate);
      onDateSelect(selectedDate);
    }
  };

  return (
    <StyledCalendarWrapper>
      <Calendar
        view="month"
        formatDay={(locale, date) => moment(date).format("D")}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        value={date}
        calendarType="gregory" // 요일 시작을 일요일로 설정
        onChange={handleDateChange}
        tileContent={({ date }) => {
          const formattedDate = moment(date).format("YYYY-MM-DD");
          const bookingsForDate = bookings[formattedDate];

          // 예약 정보가 있는 경우
          if (bookingsForDate) {
            return (
              <div className="tile-content">
                {bookingsForDate.ingCount > 0 && (
                  <div className="ing">예정: {bookingsForDate.ingCount}</div>
                )}
                {bookingsForDate.cancelCount > 0 && (
                  <div className="cancel">
                    취소: {bookingsForDate.cancelCount}
                  </div>
                )}
                {bookingsForDate.completeCount > 0 && (
                  <div className="complete">
                    완료: {bookingsForDate.completeCount}
                  </div>
                )}
              </div>
            );
          }
          return null;
        }}
      />
    </StyledCalendarWrapper>
  );
};

export default BookingCalendar;
