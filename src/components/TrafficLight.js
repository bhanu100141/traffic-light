import React, { useContext, useEffect, useCallback } from 'react';
import { TrafficLightContext } from '../context/TrafficLightContext';
import CountdownTimer from './CountdownTimer';
import PedestrianButton from './PedestrianButton';
import EmergencyOverrideButton from './EmergencyOverrideButton';

const TrafficLight = () => {
  const { state, dispatch } = useContext(TrafficLightContext);

  // Define handleLightChange function
  const handleLightChange = useCallback(() => {
    if (state.emergencyOverride) {
      dispatch({ type: 'STOP_EMERGENCY' });
    } else if (state.pedestrianRequested) {
      dispatch({ type: 'CHANGE_LIGHT', payload: { light: 'red', timer: 5 } });
      dispatch({ type: 'RESET_PEDESTRIAN' });
    } else {
      switch (state.currentLight) {
        case 'green':
          dispatch({
            type: 'CHANGE_LIGHT',
            payload: { light: 'yellow', timer: 3 },
          });
          break;
        case 'yellow':
          dispatch({
            type: 'CHANGE_LIGHT',
            payload: { light: 'red', timer: 7 },
          });
          break;
        case 'red':
          dispatch({
            type: 'CHANGE_LIGHT',
            payload: { light: 'green', timer: 10 },
          });
          break;
        default:
          break;
      }
    }
  }, [state.currentLight, state.emergencyOverride, state.pedestrianRequested, dispatch]);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (state.timer > 0) {
        dispatch({
          type: 'CHANGE_LIGHT',
          payload: { light: state.currentLight, timer: state.timer - 1 },
        });
      } else {
        handleLightChange();
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [state.timer, state.currentLight, dispatch, handleLightChange]); // Added state.currentLight here

  return (
    <div className="traffic-light-container">
      <h1 className="Heading">Traffic Light</h1>
      <div className="lights-background">
        <div
          className={`light ${state.currentLight === 'green' ? 'active' : ''}`}
          style={{ backgroundColor: 'green' }}
        />
        <div
          className={`light ${state.currentLight === 'yellow' ? 'active' : ''}`}
          style={{ backgroundColor: 'yellow' }}
        />
        <div
          className={`light ${state.currentLight === 'red' ? 'active' : ''}`}
          style={{ backgroundColor: 'red' }}
        />
      </div>
      <CountdownTimer timer={state.timer} />
      <PedestrianButton />
      <EmergencyOverrideButton />
      <p className="Alert">SAFETY FIRST!</p>
    </div>
  );
};

export default TrafficLight;
