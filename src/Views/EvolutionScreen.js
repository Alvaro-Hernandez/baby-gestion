import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

const EvolutionScreen = () => {
  const [gestationalAge, setGestationalAge] = useState('');
  const [weight, setWeight] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Aquí implementarías la lógica para seleccionar la imagen
  const selectImageBasedOnParameters = age => {
    let image;
    if (age >= 8 && age <= 11) {
      // Asignar de manera aleatoria entre dos imágenes si la edad gestacional está entre 8 y 11 semanas
      const images = [
        require('../assets/fetos/8-11.png'),
        require('../assets/fetos/8-11_2.png'),
      ];
      // Seleccionar una imagen aleatoria de las dos opciones
      image = images[Math.floor(Math.random() * images.length)];
    } else if (age >= 12 && age <= 17) {
      const images = [
        require('../assets/fetos/12-17.png'),
        require('../assets/fetos/12-17_2.png'),
      ];
      // Seleccionar una imagen aleatoria de las dos opciones
      image = images[Math.floor(Math.random() * images.length)];
    } else if (age >= 18 && age <= 24) {
      const images = [
        require('../assets/fetos/18-24.png'),
        require('../assets/fetos/18-24_2.png'),
      ];

      // Seleccionar una imagen aleatoria de las dos opciones
      image = images[Math.floor(Math.random() * images.length)];
    } else if (age >= 25 && age <= 30) {
      const images = [
        require('../assets/fetos/25-30.png'),
        require('../assets/fetos/25-30_2.png'),
      ];

      // Seleccionar una imagen aleatoria de las dos opciones
      image = images[Math.floor(Math.random() * images.length)];
    } else if (age >= 31 && age <= 35) {
      const images = [
        require('../assets/fetos/31-35.png'),
        require('../assets/fetos/31-35_2.png'),
      ];

      // Seleccionar una imagen aleatoria de las dos opciones
      image = images[Math.floor(Math.random() * images.length)];
    } else if (age >= 36 && age <= 42) {
      const images = [
        require('../assets/fetos/36-42.png'),
        require('../assets/fetos/36-42_2.png'),
      ];

      // Seleccionar una imagen aleatoria de las dos opciones
      image = images[Math.floor(Math.random() * images.length)];
    } else if (age >= 43 && age <= 48) {
      const images = [
        require('../assets/fetos/43-48.png'),
        require('../assets/fetos/43-48_2.png'),
      ];

      // Seleccionar una imagen aleatoria de las dos opciones
      image = images[Math.floor(Math.random() * images.length)];
    }
    return image;
  };

  const handleGenerate = () => {
    const image = selectImageBasedOnParameters(parseInt(gestationalAge, 10));
    setSelectedImage(image);
    setShowResults(true);
  };

  const handleBackToForm = () => {
    setShowResults(false);
    setGestationalAge('');
    setWeight('');
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      {!showResults ? (
        // Vista del formulario
        <View style={styles.formContainer}>
          <Text style={styles.screenTitle}>FetoIA</Text>
          <Text style={styles.screenTitle}>
            Ingresa los siguientes paramentos
          </Text>
          <Text style={styles.label}>Edad Gestacional (Semanas)</Text>
          <TextInput
            style={styles.input}
            value={gestationalAge}
            onChangeText={text => setGestationalAge(text)}
            placeholder="Ingrese su edad gestacional"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Peso (g)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={text => setWeight(text)}
            placeholder="Ingrese su peso(g)"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={handleGenerate}>
            <Text style={styles.buttonText}>Generar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Vista de resultados
        <View style={styles.resultsContainer}>
          <Text style={styles.screenTitle}>Aquí lo tienes!!</Text>
          <Text style={styles.screenTitle}>
            Edad Gestacional: {gestationalAge}
          </Text>
          <Text style={styles.screenTitle}>Peso(g): {weight}</Text>
          <Text style={styles.subtitle}>¡¡Así puede estar tu bebé!!</Text>
          {selectedImage && (
            <Image source={selectedImage} style={styles.image} />
          )}
          <TouchableOpacity style={styles.button} onPress={handleBackToForm}>
            <Text style={styles.buttonText}>Volver a Generar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default EvolutionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    marginTop: -80,
    width: '100%',
  },
  screenTitle: {
    fontSize: 24,
    fontFamily: 'Outfit-Bold',
    marginBottom: 32,
    color: '#484C52',
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Outfit-Medium',
    color: '#484C52',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
    color: '#484C52',
    borderWidth: 1,
    borderColor: '#FF4081',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#FF4081',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  buttonText: {
    fontSize: 30,
    fontFamily: 'Outfit-Bold',
    color: '#fff',
  },
  resultsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: -40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#484C52',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 18,
    color: '#484C52',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    color: '#484C52',
    marginBottom: 16,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'stretch',
    marginBottom: 16,
  },
});
