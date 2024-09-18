import React, { useContext } from 'react';
import { TrafficLightContext } from '../context/TrafficLightContext';

const PedestrianButton = () => {
  const { state, dispatch } = useContext(TrafficLightContext);

  return (
    <button
      className={`pedestrian-button ${state.pedestrianRequested ? 'blinking' : ''}`}
      onClick={() => dispatch({ type: 'REQUEST_CROSSING' })}
    >
      {state.pedestrianRequested ? 'Waiting for Crossing' : 'Request Pedestrian Crossing'}
    </button>
  );
};

export default PedestrianButton;
