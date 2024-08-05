import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const SalesChart = () => {
  const data = [
    {
      country: "08-01",
      room0: 29,
      room0Color: "hsl(170, 70%, 50%)",
      room1: 25,
      room1Color: "hsl(337, 70%, 50%)",
      room2: 195,
      room2Color: "hsl(239, 70%, 50%)",
      room3: 161,
      room3Color: "hsl(337, 70%, 50%)",
      room4: 141,
      room4Color: "hsl(198, 70%, 50%)",
      room5: 171,
      room5Color: "hsl(133, 70%, 50%)",
    },
    {
      country: "08-02",
      room0: 168,
      room0Color: "hsl(42, 70%, 50%)",
      room1: 69,
      room1Color: "hsl(166, 70%, 50%)",
      room2: 153,
      room2Color: "hsl(38, 70%, 50%)",
      room3: 151,
      room3Color: "hsl(196, 70%, 50%)",
      room4: 73,
      room4Color: "hsl(177, 70%, 50%)",
      room5: 86,
      room5Color: "hsl(208, 70%, 50%)",
    },
    {
      country: "08-03",
      room0: 191,
      room0Color: "hsl(8, 70%, 50%)",
      room1: 198,
      room1Color: "hsl(204, 70%, 50%)",
      room2: 24,
      room2Color: "hsl(159, 70%, 50%)",
      room3: 197,
      room3Color: "hsl(69, 70%, 50%)",
      room4: 138,
      room4Color: "hsl(224, 70%, 50%)",
      room5: 77,
      room5Color: "hsl(126, 70%, 50%)",
    },
    {
      country: "08-04",
      room0: 119,
      room0Color: "hsl(49, 70%, 50%)",
      room1: 169,
      room1Color: "hsl(36, 70%, 50%)",
      room2: 54,
      room2Color: "hsl(311, 70%, 50%)",
      room3: 122,
      room3Color: "hsl(58, 70%, 50%)",
      room4: 193,
      room4Color: "hsl(44, 70%, 50%)",
      room5: 172,
      room5Color: "hsl(78, 70%, 50%)",
    },
    {
      country: "08-05",
      room0: 155,
      room0Color: "hsl(39, 70%, 50%)",
      room1: 36,
      room1Color: "hsl(159, 70%, 50%)",
      room2: 103,
      room2Color: "hsl(8, 70%, 50%)",
      room3: 109,
      room3Color: "hsl(154, 70%, 50%)",
      room4: 55,
      room4Color: "hsl(115, 70%, 50%)",
      room5: 186,
      room5Color: "hsl(357, 70%, 50%)",
    },
    {
      country: "08-06",
      room0: 154,
      room0Color: "hsl(39, 70%, 50%)",
      room1: 155,
      room1Color: "hsl(232, 70%, 50%)",
      room2: 15,
      room2Color: "hsl(293, 70%, 50%)",
      room3: 173,
      room3Color: "hsl(161, 70%, 50%)",
      room4: 119,
      room4Color: "hsl(127, 70%, 50%)",
      room5: 92,
      room5Color: "hsl(208, 70%, 50%)",
    },
    {
      country: "08-07",
      room0: 75,
      room0Color: "hsl(145, 70%, 50%)",
      room1: 103,
      room1Color: "hsl(257, 70%, 50%)",
      room2: 113,
      room2Color: "hsl(71, 70%, 50%)",
      room3: 48,
      room3Color: "hsl(313, 70%, 50%)",
      room4: 165,
      room4Color: "hsl(162, 70%, 50%)",
      room5: 15,
      room5Color: "hsl(76, 70%, 50%)",
    },
  ];

  return (
    <div>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveBar
          data={data}
          keys={["room0", "room1", "room2", "room3", "room4", "room5"]}
          indexBy="country"
          margin={{ top: 50, right: 150, bottom: 50, left: 60 }}
          padding={0.7}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "room4",
              },
              id: "dots",
            },
            {
              match: {
                id: "room2",
              },
              id: "lines",
            },
          ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "날짜",
            legendPosition: "middle",
            legendOffset: 32,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "매출",
            legendPosition: "middle",
            legendOffset: -40,
            truncateTickAt: 0,
          }}
          enableTotals={true}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.7]],
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          motionConfig={{
            mass: 1,
            tension: 170,
            friction: 26,
            clamp: false,
            precision: 0.01,
            velocity: 0,
          }}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={e =>
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          }
        />
      </div>
    </div>
  );
};

export default SalesChart;
