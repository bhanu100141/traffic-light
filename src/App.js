import React from 'react';
import { TrafficLightProvider } from './context/TrafficLightContext';
import TrafficLight from './components/TrafficLight';
import './styles.css';

function App() {
  return (
    <div>
    <TrafficLightProvider>
      <div className="app-container">
        <TrafficLight />
      </div>
    </TrafficLightProvider>
    
    </div>
  );
}

export default App;
