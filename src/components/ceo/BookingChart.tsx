import React from "react";
import { ResponsiveLine } from "@nivo/line";

const BookingChart = () => {
  const data = [
    {
      id: "1번방",
      color: "#f49998",
      data: [
        { x: "08-01", y: 6 },
        { x: "08-02", y: 12 },
        { x: "08-03", y: 4 },
        { x: "08-04", y: 7 },
        { x: "08-05", y: 2 },
        { x: "08-06", y: 9 },
        { x: "08-07", y: 5 },
      ],
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
        data={data}
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
