import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DatosFiliacionDetails = ({route}) => {
  //Acceder al ID de la mujer embarazada
  const {docID} = route.params;

  //Prueba, de imprimir el ID de la mujer embarazada cuando el documento se monta
  useEffect(() => {
    console.log('ID de la Mujer Embarazada: ', docID);
  }, [docID]);

  return (
    <View>
      <Text style={styles.label}>Contenido de DatosFiliacionDetails</Text>
    </View>
  );
};

export default DatosFiliacionDetails;

const styles = StyleSheet.create({
  label: {
    color: '#222',
    fontSize: 24,
  },
});
