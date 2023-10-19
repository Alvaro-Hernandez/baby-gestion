import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Image} from 'react-native';

// Importaciones de las vistas
import HomeScreen from '../Views/HomeScreen';
import TipScreen from '../Views/TipScreen';
import PrimerScreen from '../Views/PrimerScreen';
import FetusIAScreen from '../Views/FetusIAScreen';
import ProfileScreen from '../Views/ProfileScreen';
import LoginScreen from '../Views/LoginScreen'; // Asegúrate de importar tu pantalla de inicio de sesión.
import MembershipDataDetailsScreen from '../Views/PrimerDetailsScreens.js/MembershipDataDetailsScreen';
import CurrentGestationDetailsScreen from '../Views/PrimerDetailsScreens.js/CurrentGestationDetailsScreen';
import ChildbirthAbortionDetailsScreen from '../Views/PrimerDetailsScreens.js/ChildbirthAbortionDetailsScreen';
import PuerperiumDetailsScreen from '../Views/PrimerDetailsScreens.js/PuerperiumDetailsScreen';

// Creación de navegadores
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const PrimerStack = createStackNavigator();

// Navegador para el stack de Cartilla
const PrimerStackNavigator = () => {
  return (
    <PrimerStack.Navigator initialRouteName="CartillaDetails">
      <PrimerStack.Screen name="CartillaDetails" component={PrimerScreen} />
      <PrimerStack.Screen
        name="DatosFiliacionDetails"
        component={MembershipDataDetailsScreen}
      />
      <PrimerStack.Screen
        name="GestacionActualDetails"
        component={CurrentGestationDetailsScreen}
      />
      <PrimerStack.Screen
        name="PartoAbortoDetails"
        component={ChildbirthAbortionDetailsScreen}
      />
      <PrimerStack.Screen
        name="PuerperioDetails"
        component={PuerperiumDetailsScreen}
      />
    </PrimerStack.Navigator>
  );
};

// Navegador principal de Tabs
const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Tips" component={TipScreen} />
      <Tab.Screen name="Cartilla" component={PrimerStackNavigator} />
      <Tab.Screen name="FetoIA" component={FetusIAScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Navegador raíz que incluye el inicio de sesión y el flujo principal
const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="Login">
      <RootStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="MainApp"
        component={AppNavigator}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

// Opciones para el Tab.Navigator
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
    fontFamily: 'Outfit-Medium',
  },
  tabBarStyle: {
    display: 'flex',
    backgroundColor: '#fff',
  },
  headerShown: false,
});

export default RootNavigator; // Estás exportando RootNavigator como predeterminado, ya que es el punto de entrada principal ahora.
