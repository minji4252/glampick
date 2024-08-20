import React from "react";
import { ResponsiveLine } from "@nivo/line";

interface BookingDataItem {
  checkInDate: string;
  reservationCount: string;
}

interface BookingChartProps {
  data: BookingDataItem[];
  isWeekly: boolean;
  period: string;
}

// 날짜 형식 변환 0000-00-00 -> 00-00
const formatDate = (date: string): string => {
  const dateParts = date.split("-");
  return `${dateParts[1]}-${dateParts[2]}`;
};

// 주차별 데이터 집계 함수
const aggregateDataByWeek = (data: BookingDataItem[]): BookingDataItem[] => {
  const weeks: { [key: number]: number } = {};
  data.forEach(item => {
    const date = new Date(item.checkInDate);
    const week = Math.ceil(date.getDate() / 7);
    if (!weeks[week]) {
      weeks[week] = 0;
    }
    weeks[week] += Number(item.reservationCount);
  });
  return Object.keys(weeks).map(week => ({
    checkInDate: `${week}주차`,
    reservationCount: weeks[Number(week)].toString(),
  }));
};

// 월별 데이터 집계 함수
const aggregateDataByMonth = (data: BookingDataItem[]): BookingDataItem[] => {
  const months: { [key: string]: number } = {};
  data.forEach(item => {
    const date = new Date(item.checkInDate);
    const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
    if (!months[month]) {
      months[month] = 0;
    }
    months[month] += Number(item.reservationCount);
  });
  return Object.keys(months).map(month => ({
    checkInDate: month,
    reservationCount: months[month].toString(),
  }));
};

const BookingChart: React.FC<BookingChartProps> = ({ data, period }) => {
  const chartData = [
    {
      id: "예약 수",
      color: "#f49998",
      data:
        period === "daily"
          ? data.map(item => ({
              x: formatDate(item.checkInDate),
              y: Number(item.reservationCount),
            }))
          : period === "weekly"
            ? aggregateDataByWeek(data).map(item => ({
                x: item.checkInDate,
                y: Number(item.reservationCount),
              }))
            : period === "monthly"
              ? aggregateDataByMonth(data).map(item => ({
                  x: item.checkInDate,
                  y: Number(item.reservationCount),
                }))
              : data.map(item => ({
                  x: formatDate(item.checkInDate),
                  y: Number(item.reservationCount),
                })),
    },
  ];

  const theme = {
    tooltip: {
      container: {
        fontSize: "14px",
      },
    },
  };

  return (
    <div style={{ width: "100%", height: 450 }}>
      <ResponsiveLine
        data={chartData}
        theme={theme}
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "날짜",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "예약 수",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        colors={["#f49998"]}
        lineWidth={3}
        pointSize={5}
        pointColor={{ from: "color", modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor", modifiers: [] }}
        enablePointLabel={true}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableSlices="x"
        enableCrosshair={false}
        enableTouchCrosshair={true}
        crosshairType="bottom-right"
        useMesh={true}
        legends={[]}
      />
    </div>
  );
};

export default BookingChart;
