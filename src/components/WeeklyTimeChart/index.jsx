import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';


const aggregateDataByWeek = (timeEntries) => {
  const aggregatedData = {};

  timeEntries.forEach((entry) => {
    const date = new Date(entry.date);
    const week = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
    const hours = parseInt(entry.hours, 10);

    if (!aggregatedData[week]) {
      aggregatedData[week] = 0;
    }

    aggregatedData[week] += hours;
  });

  return Object.entries(aggregatedData).map(([week, hours]) => ({ name: week, value: hours }));
};

const WeeklyTimeChart = () => {
  const timeEntries = useSelector((state) => state.timeTracking.timeEntries);
  const data = aggregateDataByWeek(timeEntries);

  const COLORS = ['#008000', '#0000FF', '#FFBB28', '#FFA500'];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default WeeklyTimeChart;
