import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

const PuerperioDetails = ({route}) => {
  //Acceder al ID de la mujer embarazada
  const {docID} = route.params;

  // Prueba, de imprimir el ID de la mujer embarazada cuando el documento se monta
  useEffect(() => {
    console.log('ID de la Mujer Embarazada: ', docID);
  }, [docID]);

  return (
    <View>
      <Text>Contenido de Puerperio</Text>
    </View>
  );
};

export default PuerperioDetails;
