import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";

interface SalesDataItem {
  times: string;
  roomName: string;
  pay: string;
}

interface SalesChartProps {
  data: SalesDataItem[];
  period: string;
}

// 날짜 형식 변환 0000-00-00 -> 00-00
const formatDate = (date: string): string => {
  const dateParts = date.split("-");
  return `${dateParts[1]}-${dateParts[2]}`;
};

// 주차별 데이터 집계 함수
const aggregateDataByWeek = (data: SalesDataItem[]): any[] => {
  const weeks: { [key: string]: { [roomName: string]: number } } = {};

  data.forEach(item => {
    const date = new Date(item.times);
    const week = `${Math.ceil(date.getDate() / 7)}주차`;

    if (!weeks[week]) {
      weeks[week] = {};
    }

    weeks[week][item.roomName] =
      (weeks[week][item.roomName] || 0) + parseFloat(item.pay);
  });

  return Object.keys(weeks).map(week => ({
    country: week,
    ...weeks[week],
  }));
};

// 월별 데이터 집계 함수
const aggregateDataByMonth = (data: SalesDataItem[]): any[] => {
  const months: { [key: string]: { [roomName: string]: number } } = {};

  data.forEach(item => {
    const date = new Date(item.times);
    const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!months[month]) {
      months[month] = {};
    }

    months[month][item.roomName] =
      (months[month][item.roomName] || 0) + parseFloat(item.pay);
  });

  return Object.keys(months).map(month => ({
    country: month,
    ...months[month],
  }));
};

// 날짜별 데이터 집계 함수
const aggregateDataByDate = (data: SalesDataItem[]): any[] => {
  const dates: { [key: string]: { [roomName: string]: number } } = {};

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

const SalesChart: React.FC<SalesChartProps> = ({ data, period }) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    let transformedData: SalesDataItem[] = [];

    if (period === "daily") {
      transformedData = aggregateDataByDate(data);
    } else if (period === "weekly") {
      transformedData = aggregateDataByWeek(data);
    } else if (period === "monthly") {
      transformedData = aggregateDataByMonth(data);
    }

    setChartData(transformedData);
  }, [data, period]);

  return (
    <div style={{ width: "100%", height: 450 }}>
      <ResponsiveBar
        data={chartData}
        keys={Array.from(new Set(data.map(item => item.roomName)))}
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
