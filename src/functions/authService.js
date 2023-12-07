import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export const verificarCredencial = async (credencial, navigation, setDocID) => {
  try {
    const docRef = firestore().collection('cartilla').doc(credencial);
    const doc = await docRef.get();

    if (doc.exists) {
      setDocID(credencial);
      navigation.navigate('MainApp');
      Alert.alert('Éxito', 'Acceso permitido');
    } else {
      Alert.alert('Error', 'Credencial perinatal no encontrada');
    }
  } catch (error) {
    Alert.alert('Error', 'Hubo un error al verificar la credencial');
  }
};
