import React from "react";
import { ResponsivePie } from "@nivo/pie";

const CancelChart = () => {
  const data = [
    {
      id: "1번방",
      label: "1번방",
      value: 174,
      color: "hsl(273, 70%, 50%)",
    },
    {
      id: "2번방",
      label: "2번방",
      value: 554,
      color: "hsl(338, 70%, 50%)",
    },
    {
      id: "3번방",
      label: "3번방",
      value: 76,
      color: "hsl(109, 70%, 50%)",
    },
    {
      id: "4번방",
      label: "4번방",
      value: 377,
      color: "hsl(25, 70%, 50%)",
    },
    {
      id: "5번방",
      label: "5번방",
      value: 456,
      color: "hsl(217, 70%, 50%)",
    },
  ];

  return (
    <div>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsivePie
          data={data}
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
          fill={[
            {
              match: {
                id: "ruby",
              },
              id: "dots",
            },
            {
              match: {
                id: "c",
              },
              id: "dots",
            },
            {
              match: {
                id: "go",
              },
              id: "dots",
            },
            {
              match: {
                id: "python",
              },
              id: "dots",
            },
            {
              match: {
                id: "scala",
              },
              id: "lines",
            },
            {
              match: {
                id: "lisp",
              },
              id: "lines",
            },
            {
              match: {
                id: "elixir",
              },
              id: "lines",
            },
            {
              match: {
                id: "javascript",
              },
              id: "lines",
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
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
    </div>
  );
};

export default CancelChart;
