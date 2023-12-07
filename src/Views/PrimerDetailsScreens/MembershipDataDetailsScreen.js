import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const DatosFiliacionDetails = ({route}) => {
  //Acceder al ID de la mujer embarazada
  const {docID} = route.params;

  // Modulo Filiacion
  const [moduloFiliacion, setModuloFiliacion] = useState(null);

  //Prueba, de imprimir el ID de la mujer embarazada cuando el documento se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection('cartilla')
          .doc(docID)
          .get();

        if (documentSnapshot.exists) {
          setModuloFiliacion(documentSnapshot.data().ModuloFiliacion);
        }
      } catch (error) {
        console.log('Hubo un error al traer los datos: ', error);
      }
    };

    fetchData();
  }, [docID]);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Datos Afiliacion</Text>
        <Text style={styles.headerText}>Antecedentes Familiares:</Text>
        {moduloFiliacion?.AntecedentesFamiliares.map((antecedente, index) => (
          <View key={index} style={styles.marginMap}>
            <Text style={styles.contentText}>
              TBC: {antecedente.TBC ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Diabetes: {antecedente.diabetes || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Hipertensión: {antecedente.hipertension ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Preeclampsia: {antecedente.preeclampsia ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Eclampsia: {antecedente.eclampsia ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Otra Condición Médica:{' '}
              {antecedente.otra_Condicion_Medica ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Anomalía Congénita: {antecedente.anomalia_Congenita ? 'Sí' : 'No'}
            </Text>
          </View>
        ))}

        {/* Antecedentes Personales */}
        <Text style={styles.headerText}>Antecedentes Personales:</Text>
        {moduloFiliacion?.AntecedentesPersonales.map((antecedente, index) => (
          <View key={index} style={styles.marginMap}>
            <Text style={styles.contentText}>
              TBC: {antecedente.TBC ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Diabetes: {antecedente.diabetes || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Hipertensión: {antecedente.hipertension ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Preeclampsia: {antecedente.preeclampsia ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Eclampsia: {antecedente.eclampsia ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Otra Condición Médica:{' '}
              {antecedente.otra_Condicion_Medica ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Anomalía Congénita: {antecedente.anomalia_Congenita ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Cardiopatía: {antecedente.Cardiopatia ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Infertilidad: {antecedente.infertibilidad ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Cirugía Genitourinaria:{' '}
              {antecedente.cirugia_genito_urinaria ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Nefropatía: {antecedente.nefropatia ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Violencia: {antecedente.violencia ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Enfermedad Inmunológica:{' '}
              {antecedente.enf_inmunologica ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              VIH Positivo: {antecedente.VIH_positivo ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Otros: {antecedente.otros || 'No informado'}
            </Text>
          </View>
        ))}

        {/* Recomendaciones */}
        {/* <Text style={styles.headerTextRecomendation}>Recomendaciones:</Text>
        {moduloFiliacion?.RecomendacionesFirstModule.map(
          (recomendacion, index) => (
            <View key={index} style={styles.marginMap}>
              <Text style={styles.contentText}>
                ID Médico: {recomendacion.Id_Medico || 'No proporcionado'}
              </Text>
              <Text style={styles.contentText}>
                Recomendación:
                {recomendacion.recomendaciones || 'No hay recomendaciones'}
              </Text>
            </View>
          ),
        )} */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F2C2C',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
  },
  contentText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#616161',
    marginLeft: 8,
  },
  headerTextRecomendation: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4081',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
  },
  marginMap: {
    marginBottom: 10,
  },
});

export default DatosFiliacionDetails;
