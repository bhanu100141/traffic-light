import React, { createContext, useReducer } from 'react';

const initialState = {
  currentLight: 'green',
  pedestrianRequested: false,
  emergencyOverride: false,
  timer: 10, // Initial time for green light
};

const TrafficLightContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_LIGHT':
      return { ...state, currentLight: action.payload.light, timer: action.payload.timer };
    case 'REQUEST_CROSSING':
      return { ...state, pedestrianRequested: true };
    case 'RESET_PEDESTRIAN':
      return { ...state, pedestrianRequested: false };
    case 'EMERGENCY_OVERRIDE':
      return { ...state, emergencyOverride: true, currentLight: 'green', timer: 5 };
    case 'STOP_EMERGENCY':
      return { ...state, emergencyOverride: false };
    default:
      return state;
  }
};

const TrafficLightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <TrafficLightContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficLightContext.Provider>
  );
};

export { TrafficLightContext, TrafficLightProvider };
