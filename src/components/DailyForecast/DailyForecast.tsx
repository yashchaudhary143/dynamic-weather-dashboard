// src/components/DailyForecast/DailyForecast.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './DailyForecast.module.css'; // Make sure to create this CSS module

const DailyForecast: React.FC<{ dailyData: any[] }> = ({ dailyData }) => {
  // Prepare the data for the chart
  const data = dailyData.map(day => ({
    date: new Date(day.dt * 1000).toLocaleDateString(),
    minTemp: day.temp.min,
    maxTemp: day.temp.max
  }));

  return (
    <div className={styles.dailyForecast}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="minTemp" stroke="#82ca9d" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="maxTemp" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyForecast;
