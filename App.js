import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/Navigation/AppNavigation';

function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
