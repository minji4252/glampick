import React from "react";
import { ResponsiveLine } from "@nivo/line";

interface BookingDataItem {
  days: string;
  roomCounts: string;
}

interface BookingChartProps {
  data: BookingDataItem[];
}

// 날짜 변환 00-00-00 -> 00-00
const formatDate = (date: string): string => date.replace(/^\d{4}-/, "");

const BookingChart: React.FC<BookingChartProps> = ({ data }) => {
  const chartData = [
    {
      id: "1번방",
      color: "#f49998",
      data: data.map(item => ({
        x: formatDate(item.days),
        y: Number(item.roomCounts),
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
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "예약 수",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
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
