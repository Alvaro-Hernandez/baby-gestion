import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const PartoAbortoDetails = ({route}) => {
  //Acceder al ID de la mujer embarazada
  const {docID} = route.params;

  //Modulo Parto o Aborto
  const [moduloPartoAborto, setModuloPartoAborto] = useState(null);

  // Obtener datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection('cartilla')
          .doc(docID)
          .get();

        if (documentSnapshot.exists) {
          setModuloPartoAborto(documentSnapshot.data().ModuloPartoAborto);
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
        <Text style={styles.headerText}>Dato General:</Text>
        <Text style={styles.contentText}>
          Parto: {moduloPartoAborto?.parto || 'No disponible'}
        </Text>

        {/* Parto */}
        <Text style={styles.headerText}>Parto:</Text>
        {moduloPartoAborto?.Parto.map((partoData, index) => (
          <View key={index} style={styles.marginMap}>
            <Text style={styles.contentText}>
              Referida: {partoData.referida || 'No disponible'}
            </Text>
            <Text style={styles.contentText}>
              Carnet: {partoData.carnet || 'No disponible'}
            </Text>
            <Text style={styles.contentText}>
              Consultas Prenatales Totales:
              {partoData.consultas_Prenatales_Totales || 'No disponible'}
            </Text>
            <Text style={styles.contentText}>
              Lugar de Parto: {partoData.lugar_Parto || 'No disponible'}
            </Text>
            <Text style={styles.contentText}>
              Edad Gestacional: {partoData.edad_Gestacional || 'No disponible'}
            </Text>
            <Text style={styles.contentText}>
              Hospitaliza en Embarazo:
              {partoData.Hospitalizado_En_Embarazo || 'No disponible'}
            </Text>
            <Text style={styles.contentText}>
              Corticloide:
              {partoData.corticloide_Antenatal || 'No disponible'}
            </Text>
            <Text style={styles.contentText}>
              Inicio:
              {partoData.inicio || 'No disponible'}
            </Text>
            <Text style={styles.contentText}>
              Presentacion de Situacion:
              {partoData.presentacion_Situacion || 'No disponible'}
            </Text>
            <Text style={styles.contentText}>
              Tamaño Fetal Acorde:
              {partoData.tamano_Fetal_Acorde || 'No disponible'}
            </Text>
            <Text style={styles.contentText}>
              Acompañante:
              {partoData.acompanante || 'No disponible'}
            </Text>
          </View>
        ))}

        {/* Rotura de Membrana */}
        <Text style={styles.headerText}>Rotura de Membrana:</Text>
        {moduloPartoAborto?.RoturaMembrana.map((roturaData, index) => (
          <View key={index} style={styles.marginMap}>
            <Text style={styles.contentText}>
              Rotura de Membrana Anteparto:{' '}
              {roturaData.rotura_Membrana_AnteParto ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Fecha: {roturaData.fecha || 'No disponible'}
            </Text>
            <Text style={styles.contentText}>
              Menor de 37 Semanas: {roturaData.menor_37_Semanas}
            </Text>
            <Text style={styles.contentText}>
              Mayor de 18 Semanas: {roturaData.mayor_18_Semanas}
            </Text>
            <Text style={styles.contentText}>
              Temperatura Mayor a 38 Grados:{' '}
              {roturaData.temperatura_Mayor_a_38_Grado}
            </Text>
            <Text style={styles.contentText}>
              TARV: {roturaData.tarv || 'No indicado'}
            </Text>
          </View>
        ))}

        {/* PruebasTDP */}
        <Text style={styles.headerText}>Pruebas TDP:</Text>
        {moduloPartoAborto?.PruebasTDP.map((prueba, index) => (
          <View key={index} style={styles.marginMap}>
            {prueba.sifilis && (
              <Text style={styles.contentText}>Prueba: Sífilis</Text>
            )}
            {prueba.vih && <Text style={styles.contentText}>Prueba: VIH</Text>}
            <Text style={styles.contentText}>
              Negativo: {prueba.negativo ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Positivo: {prueba.positivo ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              No realizado (NR): {prueba.nr ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              No concluyente (NC): {prueba.nc ? 'Sí' : 'No'}
            </Text>
          </View>
        ))}

        {/* Nacimiento */}
        <Text style={styles.headerText}>Nacimiento:</Text>
        {moduloPartoAborto?.Nacimiento.map((nacimiento, index) => (
          <View key={index} style={styles.marginMap}>
            <Text style={styles.contentText}>
              Vivo: {nacimiento.Vivo || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Muerto: {nacimiento.Muerto || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Ante Parto: {nacimiento.AnteParto || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Parto: {nacimiento.Parto || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Ignora Momento: {nacimiento.IgnoraMomento || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Fecha: {nacimiento.Fecha || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Intra Hosp: {nacimiento.Intra_Hosp || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Extra Hosp: {nacimiento.Extra_Hosp || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Múltiple: {nacimiento.Multiple || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Terminación: {nacimiento.Terminacion || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Posición Parto: {nacimiento.Posicion_Parto || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Episiotomía: {nacimiento.Epiciotomia || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Desgarro: {nacimiento.Desgarro || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Ligadura De Cordón:{' '}
              {nacimiento.Ligadura_De_Cordon || 'No informado'}
            </Text>
          </View>
        ))}

        {/* Cumplimiento del MATEPE */}
        <Text style={styles.headerText}>Cumplimiento del MATEPE:</Text>
        {moduloPartoAborto?.Cumplimiento_Del_MATEPE.map(
          (cumplimiento, index) => (
            <View key={index} style={styles.marginMap}>
              <Text style={styles.contentText}>
                Oxitosina PrealumBR:{' '}
                {cumplimiento.Oxitosina_PrealumBR ? 'Sí' : 'No'}
              </Text>
              <Text style={styles.contentText}>
                Pinzamiento de Cordón:{' '}
                {cumplimiento.Pinzamiendo_de_Cordon ? 'Sí' : 'No'}
              </Text>
              <Text style={styles.contentText}>
                Tracción De Cordón:{' '}
                {cumplimiento.Traccion_De_Cordon ? 'Sí' : 'No'}
              </Text>
              <Text style={styles.contentText}>
                Masaje Uterino: {cumplimiento.Masaje_uterino ? 'Sí' : 'No'}
              </Text>
            </View>
          ),
        )}

        {/* Medicación */}
        <Text style={styles.headerText}>Medicación Recibida:</Text>
        {moduloPartoAborto?.MedicacionRecibida.map((medicacion, index) => (
          <View key={index} style={styles.marginMap}>
            <Text style={styles.contentText}>
              Ocitócicos TDP: {medicacion.ocitocicos_TDP ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Antibiótico: {medicacion.antibiotico ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Analgesia: {medicacion.anagelsia ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Anestesia Local: {medicacion.anest_Local ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Anestesia Regional: {medicacion.anest_Region ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Anestesia General: {medicacion.anest_Gral ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Transfusión: {medicacion.transf ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Preeclampsia (Preclam): {medicacion.Preclam ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Eclampsia: {medicacion.eclam ? 'Sí' : 'No'}
            </Text>
          </View>
        ))}

        {/* Detalles del Partograma */}
        <Text style={styles.headerText}>Detalles del Partograma:</Text>
        {moduloPartoAborto?.DetallesPartoGrama.map((detalle, index) => (
          <View key={index} style={styles.marginMap}>
            <Text style={styles.contentText}>
              Fecha: {detalle.Fecha || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Posición de la Madre:{' '}
              {detalle.PosicionDelaMadre || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              PA: {detalle.PA || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Pulso: {detalle.Pulso || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Control 10: {detalle.Control_10 || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Dilatación: {detalle.Dilatacion || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Altura Presente: {detalle.AlturaPresente || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Variedad de Posición: {detalle.VariedadPosic || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Meconio: {detalle.Meconio || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              FCF Dips: {detalle.FCF_Dips || 'No informado'}
            </Text>
          </View>
        ))}

        {/* Enfermedades */}
        <Text style={styles.headerText}>Enfermedades:</Text>
        {moduloPartoAborto?.EnfermedadesData.map((enfermedad, index) => (
          <View key={index} style={styles.marginMap}>
            <Text style={styles.contentText}>
              HTA Previa: {enfermedad.HTAPrevia ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              HTA Inducida en Embarazo:{' '}
              {enfermedad.HTAInducidaEmbarazo ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Preeclampsia: {enfermedad.PreeDampsia ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Eclampsia: {enfermedad.Eclampsia ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Cardiopatía: {enfermedad.CardioPatia ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Nefropatía: {enfermedad.Nefropatia ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Diabetes: {enfermedad.Diabetes ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Infección Ovular: {enfermedad.InfecOvular ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Infección Urinaria: {enfermedad.InfeUrinaria ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Amenaza de Parto Pretermino:{' '}
              {enfermedad.AmenazaPartoPreter ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              RCIU (Restricción del crecimiento intrauterino):{' '}
              {enfermedad.RCIU ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Rotura Prematura de Membranas:{' '}
              {enfermedad.RoturaPremDeMembranas ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Anemia: {enfermedad.Anemia ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Otra Condición Grave:{' '}
              {enfermedad.OtraCondicionGrave ? 'Sí' : 'No'}
            </Text>
          </View>
        ))}

        {/* Hemorragias */}
        <Text style={styles.headerText}>Hemorragias:</Text>
        {moduloPartoAborto?.Hemorragias.map((hemorragia, index) => (
          <View key={index} style={styles.marginMap}>
            <Text style={styles.contentText}>
              Primer Trimestre: {hemorragia.PrimerTrimestre ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Segundo Trimestre: {hemorragia.SegundoTrimestre ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Tercer Trimestre: {hemorragia.TercerTrimestre ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Posparto: {hemorragia.PosParto ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Infección Puerperal: {hemorragia.InfeccionPuerperal ? 'Sí' : 'No'}
            </Text>
          </View>
        ))}

        {/* Recomendaciones */}
        <Text style={styles.headerTextRecomendation}>Recomendaciones:</Text>
        {moduloPartoAborto?.RecomendacionesThirdModule.map(
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
        )}
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

export default PartoAbortoDetails;
