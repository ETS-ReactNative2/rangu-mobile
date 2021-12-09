
import React from 'react';
import Routes from './src/routes';
import { Dimensions } from 'react-native';

global.pulling = true;
global.stopPullingToLeave = false;

export default function App() {
  //console.disableYellowBox = true;
  return (
    <Routes />
  );
};