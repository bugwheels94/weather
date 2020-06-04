import React from 'react';
import WeatherDashboard from './features/weather/Dashboard';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="container-fluid py-5">
        <WeatherDashboard />
      </header>
    </div>
  );
}

export default App;
