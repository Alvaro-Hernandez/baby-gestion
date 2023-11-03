import React, {useState} from 'react';
import DocIDContext from '../Context/DocIDContext';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Image} from 'react-native';

// Importaciones de las vistas
import SplashScreen from '../Views/SplashScreen';
import LoginScreen from '../Views/LoginScreen';
import HomeScreen from '../Views/HomeScreen';
import TipScreen from '../Views/TipScreen';
import PrimerScreen from '../Views/PrimerScreen';
import EvolutionScreen from '../Views/EvolutionScreen';
import ProfileScreen from '../Views/ProfileScreen';
import MembershipDataDetailsScreen from '../Views/PrimerDetailsScreens/MembershipDataDetailsScreen';
import CurrentGestationDetailsScreen from '../Views/PrimerDetailsScreens/CurrentGestationDetailsScreen';
import ChildbirthAbortionDetailsScreen from '../Views/PrimerDetailsScreens/ChildbirthAbortionDetailsScreen';
import PuerperiumDetailsScreen from '../Views/PrimerDetailsScreens/PuerperiumDetailsScreen';

// Creación de navegadores
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const PrimerStack = createStackNavigator();

// Navegador para el stack de Cartilla
const PrimerStackNavigator = () => {
  return (
    <PrimerStack.Navigator initialRouteName="CartillaDetails">
      <PrimerStack.Screen
        name="Detalles de Cartilla"
        component={PrimerScreen}
      />
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
      <Tab.Screen name="Evolucion" component={EvolutionScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Navegador raíz que incluye el inicio de sesión y el flujo principal
const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="Splash">
      <RootStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
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

const RootNavigatorWithContext = () => {
  const [docID, setDocID] = useState(null);

  return (
    <DocIDContext.Provider value={{docID, setDocID}}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </DocIDContext.Provider>
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
    } else if (route.name === 'Evolucion') {
      iconSource = focused
        ? require('../assets/icons/evolutionSeleccionado.png')
        : require('../assets/icons/evolution.png');
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

// Exportando RootNavigatorWithContext como predeterminado, ya que es el punto de entrada principal.
export default RootNavigatorWithContext;
