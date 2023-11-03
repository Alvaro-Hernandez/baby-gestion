import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DocIDContext from '../Context/DocIDContext';
import imageDatosAfiliacion from '../assets/images/atencion-medica.png';
import imageGestacionActual from '../assets/images/embarazada.png';
import imagePartoAborto from '../assets/images/ultrasonido.png';
import imagePuerperio from '../assets/images/cadera.png';

const PrimerScreen = () => {
  const navigation = useNavigation();
  const {docID} = useContext(DocIDContext);

  console.log(docID);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headingText}>Tu seguimiento perinatal está aquí</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('DatosFiliacionDetails', {docID})}>
        <Image source={imageDatosAfiliacion} style={styles.cardImage} />
        <Text style={styles.cardText}>Datos de Filiación y Antecedentes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('GestacionActualDetails', {docID})}>
        <Image source={imageGestacionActual} style={styles.cardImage} />
        <Text style={styles.cardText}>Gestación actual</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('PartoAbortoDetails', {docID})}>
        <Image source={imagePartoAborto} style={styles.cardImage} />
        <Text style={styles.cardText}>Parto o Aborto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('PuerperioDetails', {docID})}>
        <Image source={imagePuerperio} style={styles.cardImage} />
        <Text style={styles.cardText}>Puerperio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  headingText: {
    fontSize: 26,
    fontFamily: 'Outfit-Bold',
    marginBottom: 20,
    color: '#222',
  },
  card: {
    width: 300,
    height: 370,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  cardImage: {
    width: 180,
    height: 180,
    marginBottom: 10,
  },
  cardText: {
    marginTop: 30,
    fontSize: 25,
    fontFamily: 'Outfit-Medium',
    color: '#222',
  },
});

export default PrimerScreen;
