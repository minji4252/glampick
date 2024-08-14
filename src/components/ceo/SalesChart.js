import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";

const SalesChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  console.log("data", data);
  useEffect(() => {
    const transformedData = data?.reduce((acc, curr) => {
      const { times, pay, roomName } = curr;
      const existingEntry = acc.find(entry => entry.country === times);

      if (existingEntry) {
        existingEntry[roomName] = parseFloat(pay) || 0;
      } else {
        acc.push({ country: times, [roomName]: parseFloat(pay) || 0 });
      }

      return acc;
    }, []);

    setChartData(transformedData);
  }, [data]);

  return (
    <div style={{ width: "100%", height: 450 }}>
      <ResponsiveBar
        data={chartData}
        keys={Array.from(new Set(data?.map(item => item.roomName)))}
        indexBy="country"
        margin={{ top: 50, right: 150, bottom: 50, left: 60 }}
        padding={0.7}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
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
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "매출",
          legendPosition: "middle",
          legendOffset: -40,
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
        tooltip={({ id, value, color }) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "5px 10px",
              background: "white",
              border: "1px solid #ccc",
              borderRadius: "3px",
              fontSize: "14px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: color,
                marginRight: "13px",
              }}
            ></div>
            {id}
            <strong
              style={{
                marginLeft: "5px",
                fontWeight: "700",
              }}
            >
              {value}
            </strong>
          </div>
        )}
      />
    </div>
  );
};

export default SalesChart;
