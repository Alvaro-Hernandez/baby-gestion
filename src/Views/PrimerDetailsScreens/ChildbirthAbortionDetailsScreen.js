import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const PartoAbortoDetails = ({route}) => {
  //Acceder al ID de la mujer embarazada
  const {docID} = route.params;
  //Moduelo Parto o Aborto
  const [moduloPartoAborto, setModuloPartoAborto] = useState(null);

  // Obtener datos
  useEffect(() => {
    const fetchData = async () => {
      const documentSnapshot = await firestore()
        .collection('cartilla')
        .doc(docID)
        .get();
    };
  }, [docID]);

  return (
    <View>
      <Text>Contenido de Parto o Aborto</Text>
    </View>
  );
};

export default PartoAbortoDetails;
