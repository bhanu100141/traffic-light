import React, { useContext } from 'react';
import { TrafficLightContext } from '../context/TrafficLightContext';

const EmergencyOverrideButton = () => {
  const { dispatch } = useContext(TrafficLightContext);

  return (
    <button className='emergency-button' onClick={() => dispatch({ type: 'EMERGENCY_OVERRIDE' })}>
      Emergency Override
    </button>
    
  );
};

export default EmergencyOverrideButton;
