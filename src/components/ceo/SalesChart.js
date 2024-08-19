import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";

// 날짜 변환 0000-00-00 -> 00-00
const formatDate = date => {
  const dateParts = date.split("-");
  return `${dateParts[1]}-${dateParts[2]}`;
};

// 날짜별 데이터 집계 함수
const aggregateDataByDate = data => {
  const dates = {};

  data.forEach(item => {
    const date = formatDate(item.times);
    if (!dates[date]) {
      dates[date] = {};
    }

    dates[date][item.roomName] =
      (dates[date][item.roomName] || 0) + parseFloat(item.pay);
  });

  return Object.keys(dates).map(date => ({
    country: date,
    ...dates[date],
  }));
};

// 주차별 데이터 집계 함수
const aggregateDataByWeek = data => {
  const weeks = {};

  data.forEach(item => {
    const date = new Date(item.times);
    const week = Math.ceil(date.getDate() / 7);
    const key = `${week}주차`;

    if (!weeks[key]) {
      weeks[key] = {};
    }

    weeks[key][item.roomName] =
      (weeks[key][item.roomName] || 0) + parseFloat(item.pay);
  });

  const sortedWeeks = Object.keys(weeks).sort((a, b) => {
    const weekA = parseInt(a, 10);
    const weekB = parseInt(b, 10);
    return weekA - weekB;
  });

  return sortedWeeks.map(week => ({
    country: week,
    ...weeks[week],
  }));
};

const SalesChart = ({ data, isWeekly }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    console.log("매출 isWeekly", isWeekly);
    const transformedData = isWeekly
      ? aggregateDataByDate(data)
      : aggregateDataByWeek(data);

    setChartData(transformedData);
  }, [data, isWeekly]);

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
          legend: "기간",
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
