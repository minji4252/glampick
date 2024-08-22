import React from "react";
import { ResponsivePie } from "@nivo/pie";

interface RoomData {
  cancelCount: string;
  nameing: string | null;
}

interface CancelData {
  room: RoomData[];
}

interface CancelChartProps {
  data: CancelData;
}

const CancelChart: React.FC<CancelChartProps> = ({ data }) => {
  const cancelData = data.room
    .filter(room => room.nameing !== null)
    .map(room => ({
      id: room.nameing || "Unknown",
      label: room.nameing || "Unknown",
      value: Number(room.cancelCount),
      color: "hsl(217, 70%, 50%)", // 예시
    }));

  // const data1 = data.room.map(room => ({
  //   id: room.nameing,
  //   label: room.nameing,
  //   value: Number(room.cancelCount),
  //   color: "hsl(217, 70%, 50%)",
  // }));

  const theme = {
    tooltip: {
      container: {
        fontSize: "14px",
      },
    },
  };

  return (
    <div style={{ width: "100%", height: 450 }}>
      <ResponsivePie
        data={cancelData}
        theme={theme}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        sortByValue={true}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextOffset={9}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsStraightLength={21}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={9}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 65,
            itemsSpacing: 13,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default CancelChart;
