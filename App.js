import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/Navigation/AppNavigation';

function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;
