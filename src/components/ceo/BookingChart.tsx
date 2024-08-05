import React from "react";
import { ResponsiveLine } from "@nivo/line";

const BookingChart = () => {
  const data = [
    {
      id: "5번방",
      color: "hsl(82, 70%, 50%)",
      data: [
        { x: "08-01", y: 188 },
        { x: "08-02", y: 203 },
        { x: "08-03", y: 300 },
        { x: "08-04", y: 65 },
        { x: "08-05", y: 18 },
        { x: "08-06", y: 151 },
        { x: "08-07", y: 4 },
        { x: "08-08", y: 276 },
        { x: "08-09", y: 14 },
        { x: "08-10", y: 81 },
        { x: "08-11", y: 28 },
        { x: "08-12", y: 50 },
      ],
    },
    {
      id: "4번방",
      color: "hsl(233, 70%, 50%)",
      data: [
        { x: "08-01", y: 146 },
        { x: "08-02", y: 191 },
        { x: "08-03", y: 218 },
        { x: "08-04", y: 23 },
        { x: "08-05", y: 25 },
        { x: "08-06", y: 273 },
        { x: "08-07", y: 150 },
        { x: "08-08", y: 164 },
        { x: "08-09", y: 143 },
        { x: "08-10", y: 232 },
        { x: "08-11", y: 19 },
        { x: "08-12", y: 143 },
      ],
    },
    {
      id: "3번방",
      color: "hsl(293, 70%, 50%)",
      data: [
        { x: "08-01", y: 205 },
        { x: "08-02", y: 262 },
        { x: "08-03", y: 78 },
        { x: "08-04", y: 260 },
        { x: "08-05", y: 37 },
        { x: "08-06", y: 284 },
        { x: "08-07", y: 236 },
        { x: "08-08", y: 65 },
        { x: "08-09", y: 203 },
        { x: "08-10", y: 239 },
        { x: "08-11", y: 105 },
        { x: "08-12", y: 208 },
      ],
    },
    {
      id: "2번방",
      color: "hsl(249, 70%, 50%)",
      data: [
        { x: "08-01", y: 198 },
        { x: "08-02", y: 35 },
        { x: "08-03", y: 252 },
        { x: "08-04", y: 81 },
        { x: "08-05", y: 269 },
        { x: "08-06", y: 75 },
        { x: "08-07", y: 217 },
        { x: "08-08", y: 193 },
        { x: "08-09", y: 109 },
        { x: "08-10", y: 61 },
        { x: "08-11", y: 18 },
        { x: "08-12", y: 83 },
      ],
    },
    {
      id: "1번방",
      color: "hsl(107, 70%, 50%)",
      data: [
        { x: "08-01", y: 117 },
        { x: "08-02", y: 214 },
        { x: "08-03", y: 64 },
        { x: "08-04", y: 166 },
        { x: "08-05", y: 24 },
        { x: "08-06", y: 171 },
        { x: "08-07", y: 281 },
        { x: "08-08", y: 192 },
        { x: "08-09", y: 188 },
        { x: "08-10", y: 201 },
        { x: "08-11", y: 165 },
        { x: "08-12", y: 136 },
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
    <div>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveLine
          data={data}
          theme={theme}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
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
          enableGridY={false}
          colors={{ scheme: "paired" }}
          lineWidth={3}
          pointSize={5}
          pointColor={{ from: "color", modifiers: [] }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "color", modifiers: [] }}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-12}
          enableCrosshair={false}
          enableTouchCrosshair={true}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 110,
              translateY: 1,
              itemsSpacing: 3,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 11,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default BookingChart;
