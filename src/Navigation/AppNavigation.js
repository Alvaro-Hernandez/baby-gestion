import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import HomeScreen from '../Views/HomeScreen';
import TipScreen from '../Views/TipScreen';
import PrimerScreen from '../Views/PrimerScreen';
import FetusIAScreen from '../Views/FetusIAScreen';
import ProfileScreen from '../Views/ProfileScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Tips" component={TipScreen} />
      <Tab.Screen name="Cartilla" component={PrimerScreen} />
      <Tab.Screen name="FetoIA" component={FetusIAScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const tabScreenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconSource;
    let iconSize = size;

    if (route.name === 'Inicio') {
      iconSource = focused
        ? require('../assets/icons/homeSelected.png')
        : require('../assets/icons/home.png');
    } else if (route.name === 'Tips') {
      iconSource = focused
        ? require('../assets/icons/tipsSelected.png')
        : require('../assets/icons/tips.png');
    } else if (route.name === 'Cartilla') {
      iconSource = focused
        ? require('../assets/icons/primerSelected.png')
        : require('../assets/icons/primer.png');
    } else if (route.name === 'FetoIA') {
      iconSource = focused
        ? require('../assets/icons/fetusIASelected.png')
        : require('../assets/icons/fetusIA.png');
    } else if (route.name === 'Perfil') {
      iconSource = focused
        ? require('../assets/icons/profileSelected.png')
        : require('../assets/icons/profile.png');
    }

    return (
      <Image
        source={iconSource}
        style={{width: iconSize, height: iconSize, tintColor: color}}
      />
    );
  },
  headerStyle: {
    backgroundColor: '#EB7C9C',
  },
  headerTintColor: '#fff',
  tabBarActiveTintColor: '#EB7C9C',
  tabBarInactiveTintColor: '#484C52',
  tabBarLabelStyle: {
    fontSize: 12,
  },
  tabBarStyle: {
    display: 'flex',
    backgroundColor: '#fff',
  },
});

export default AppNavigator;
