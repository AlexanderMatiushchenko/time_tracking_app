import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';

const aggregateDataByCategory = (timeEntries) => {
  const aggregatedData = {};

  timeEntries.forEach((entry) => {
    const category = entry.category;
    const hours = parseInt(entry.hours, 10);

    if (!aggregatedData[category]) {
      aggregatedData[category] = 0;
    }

    aggregatedData[category] += hours;
  });

  return Object.entries(aggregatedData).map(([category, hours]) => ({ name: category, value: hours }));
};

const CategoryTimeChart = () => {
  const timeEntries = useSelector((state) => state.timeTracking.timeEntries);
  const data = aggregateDataByCategory(timeEntries);

  const COLORS = {
    'Learning': '#0088FE',
    'Work': '#00C49F',
    'Private': '#FFBB28',
    
  };

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
        {data.map((entry) => (
          <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CategoryTimeChart;
