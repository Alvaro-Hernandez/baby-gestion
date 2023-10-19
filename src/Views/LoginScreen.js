import React, {useState} from 'react';
import {View, StyleSheet, Alert, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [credencial, setCredencial] = useState('');
  const navigation = useNavigation();

  const verificarCredencial = async () => {
    try {
      const docRef = firestore().collection('cartilla').doc(credencial);
      const doc = await docRef.get();

      if (doc.exists) {
        // Si el documento existe, navega hacia la parte principal de tu aplicación
        navigation.navigate('MainApp');
        Alert.alert('Éxito', 'Acceso permitido');
      } else {
        Alert.alert('Error', 'Credencial perinatal no encontrada');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al verificar la credencial');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.centerText}>Ingrese su credencial perinatal</Text>
      <View style={styles.loginBox}>
        <Input
          placeholder="ID Perinatal"
          onChangeText={setCredencial}
          value={credencial}
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          inputContainerStyle={styles.inputInnerContainer}
        />
        <Button
          title="Buscar"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitleStyle}
          onPress={verificarCredencial}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  centerText: {
    color: '#484C52',
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Outfit-Bold',
  },
  loginBox: {
    padding: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#484C52',
    marginBottom: 20,
  },
  inputStyle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
  },
  inputInnerContainer: {
    borderBottomWidth: 0,
  },
  buttonStyle: {
    backgroundColor: '#FF4081',
    borderRadius: 10,
    height: 50,
  },
  buttonTitleStyle: {
    fontSize: 24,
    fontFamily: 'Outfit-Bold',
  },
});
export default LoginScreen;
