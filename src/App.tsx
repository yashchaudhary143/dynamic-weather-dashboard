import React from 'react';
import WeatherDashboard from './components/WeatherDashboard/WeatherDashboard';
import NavBar from './components/NavBar/NavBar'
import './App.css'; // Assuming you have some global styles you want to apply

const App: React.FC = () => {
  return (
    <div className="App">
      <main>
        <NavBar/>
        <WeatherDashboard />
      </main>
    </div>
  );
}

export default App;
