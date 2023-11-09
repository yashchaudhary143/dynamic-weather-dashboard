// src/components/HourlyForecast/HourlyForecast.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './HourlyForecast.module.css'; // Make sure to create this CSS module

const HourlyForecast: React.FC<{ hourlyData: any[] }> = ({ hourlyData }) => {
  // Prepare the data for the chart
  const data = hourlyData.map(hour => ({
    time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temperature: hour.temp
  }));

  return (
    <div className={styles.hourlyForecast}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyForecast;
