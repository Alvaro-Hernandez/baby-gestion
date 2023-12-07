import React, {useEffect, useState, useContext} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DocIDContext from '../Context/DocIDContext';

const HomeScreen = () => {
  const {docID} = useContext(DocIDContext);
  const [closestEvent, setClosestEvent] = useState(null);
  const [moduloFiliacion, setModuloFiliacion] = useState(null);

  const convertToDate = obj => {
    if (obj instanceof Date) {
      // Es un objeto Date, devuélvelo tal cual
      return obj;
    } else if (obj && typeof obj.seconds === 'number') {
      // Convierte el timestamp a un objeto Date
      return new Date(obj.seconds * 1000);
    } else {
      console.error('convertToDate: el objeto proporcionado no es válido.');
      return null;
    }
  };

  const adjustToTimeZone = date => {
    // Ajusta la fecha al UTC-6
    return new Date(date.getTime() - 6 * 60 * 60 * 1000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection('cartilla')
          .doc(docID)
          .get();

        if (documentSnapshot.exists) {
          const data = documentSnapshot.data();
          // Guardando los datos del modulo de Filiacion
          const moduloFiliacionData = data.ModuloFiliacion;
          setModuloFiliacion(moduloFiliacionData);
          const {Eventos} = documentSnapshot.data().ModuloGestacionActual;
          if (Eventos && Eventos.length > 0) {
            const sortedEvents = Eventos.sort(
              (a, b) => convertToDate(a.start) - convertToDate(b.start),
            );
            const nextEvent = sortedEvents.find(
              e => convertToDate(e.start) > new Date(),
            );

            if (nextEvent) {
              const adjustedStart = adjustToTimeZone(
                convertToDate(nextEvent.start),
              );
              setClosestEvent({...nextEvent, start: adjustedStart});
            } else {
              setClosestEvent(null);
            }
          }
        }
      } catch (error) {
        console.log('Hubo un error al traer los datos: ', error);
      }
    };

    fetchData();
  }, [docID]);

  const formatDate = date => {
    if (!(date instanceof Date) || isNaN(date)) {
      console.error('formatDate: la fecha proporcionada no es válida.');
      return 'Fecha no válida';
    }

    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    // Determinar AM o PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    // Convertir la hora a formato de 12 horas para AM/PM
    const adjustedHours = hours % 12 || 12;

    return `${day} de ${month} de ${year}, ${adjustedHours}:${minutes} ${ampm}`;
  };

  const getEventMessage = () => {
    if (closestEvent && closestEvent.start) {
      const eventDate = formatDate(closestEvent.start);
      return `${closestEvent.title} el ${eventDate}`;
    }
    return 'No tienes citas pendientes🥰';
  };

  return (
    <View style={styles.container}>
      {moduloFiliacion?.DatosAfiliacion?.map((item, index) => (
        <View key={index} style={styles.userNameContainer}>
          <Text style={styles.userNameText}>
            Hola, {item?.Nombres || 'UserName'}{' '}
            {item?.Apellidos || 'UserLastName'}
          </Text>
        </View>
      ))}
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={require('../assets/images/card.png')}
          style={styles.imageStyle}
          resizeMode="cover">
          <View style={styles.overlay}>
            <Text style={styles.reminderText}>Recordatorio</Text>
            <Text style={styles.eventTitle}>{getEventMessage()}</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.articlesContainer}>
        <Text style={styles.eventTitle}>Articulos de interés</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundContainer: {
    width: 345,
    height: 450,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -180,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  reminderText: {
    color: '#78CFFD',
    fontSize: 25,
    fontFamily: 'Outfit-Bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  userNameContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'transparent',
    padding: 16,
  },
  userNameText: {
    fontSize: 25,
    color: '#484C52',
    textAlign: 'left',
    fontFamily: 'Outfit-Bold',
  },
  eventDetails: {
    alignItems: 'flex-start',
  },
  eventTitle: {
    color: '#484C52',
    fontFamily: 'Outfit-Bold',
    fontSize: 25,
    marginBottom: 4,
  },
  eventDate: {
    color: '#787878',
    fontSize: 25,
    fontFamily: 'Outfit-Bold',
  },
  articlesContainer: {
    marginTop: 20,
    alignItems: 'left',
    textAlign: 'left',
    marginLeft: -150,
  },
});

export default HomeScreen;
