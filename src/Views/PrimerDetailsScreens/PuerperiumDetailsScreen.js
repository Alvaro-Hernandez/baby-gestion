import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const PuerperioDetails = ({route}) => {
  //Acceder al ID de la mujer embarazada
  const {docID} = route.params;

  //Modulo Puerperio
  const [moduloPuerperio, setModuloPuerperio] = useState(null);

  // Prueba, de imprimir el ID de la mujer embarazada cuando el documento se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection('cartilla')
          .doc(docID)
          .get();

        if (documentSnapshot.exists) {
          setModuloPuerperio(documentSnapshot.data().ModuloPuerperio);
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
        {/* Datos del Recien Nacido */}
        <Text style={styles.headerText}>Datos del Recién Nacido:</Text>
        {moduloPuerperio?.RecienNacido.map((rn, index) => (
          <View key={`recienNacido-${index}`} style={styles.marginMap}>
            <Text style={styles.contentText}>
              Sexo: {rn.sexo || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Peso al Nacer: {rn.pesoAlNacer || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Perímetro Cefálico (cm): {rn.p_Cefalico_cm || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Longitud (cm): {rn.longitud_cm || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Edad Gestacional: {rn.edad_Gestacional || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Semanas Gestacionales: {rn.semanas_Gestacional || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Días Gestacionales: {rn.dias_Gestacional || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Diagnóstico por: {rn.Diagnosticada_Por || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Peso para la Edad Gestacional: {rn.peso_EG || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Vitamina K: {rn.vitamina_K || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Profilaxis Ocular: {rn.propfilasis_ocular || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Apego Precoz: {rn.apego_precoz || 'No informado'}
            </Text>
          </View>
        ))}

        {/* Mapeo para Reanimacion */}
        <Text style={styles.headerText}>Procedimientos de Reanimación:</Text>
        {moduloPuerperio?.Reanimacion.map((reanimacion, index) => (
          <View key={`reanimacion-${index}`} style={styles.marginMap}>
            <Text style={styles.contentText}>
              Estimulación: {reanimacion.estimulacion ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Aspiración: {reanimacion.aspiracion ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Máscara: {reanimacion.mascara ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Oxígeno: {reanimacion.oxigeno ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Masaje Cardíaco: {reanimacion.masaje ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Intubación (tubo): {reanimacion.tubo ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Otros procedimientos: {reanimacion.otros ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Fallece en el lugar de parto:{' '}
              {reanimacion.fallece_lugar_De_Parto ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Madre: {reanimacion.madre ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              RN: {reanimacion.RN ? 'Sí' : 'No'}
            </Text>
          </View>
        ))}

        {/* Mapeo para Atendio */}
        <Text style={styles.headerText}>Atención del Parto y Neonato:</Text>
        {moduloPuerperio?.Atendio.map((atencion, index) => (
          <View key={`atendio-${index}`} style={styles.marginMap}>
            <Text style={styles.headerText}>
              {atencion.parto || atencion.neonato}
            </Text>
            <Text style={styles.contentText}>
              Atendido por Médico: {atencion.medico ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Atendido por Obstétrico: {atencion.obstretico ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Atendido por Pediatría: {atencion.pediatria ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Atendido por Enfermero/a: {atencion.enfermero ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Atendido por Auxiliar: {atencion.auxiliar ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Atendido por Estudiante: {atencion.estudiante ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Atendido por Personal Empírico: {atencion.empir ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Atendido por Otros: {atencion.otro ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Nombre del atendiente: {atencion.nombre || 'No informado'}
            </Text>
          </View>
        ))}

        {/* Cuidados Esenciales */}
        <Text style={styles.headerText}>
          Cuidados Esenciales del Recién Nacido:
        </Text>
        {moduloPuerperio?.CuidadosEsenciales.map((cuidado, index) => (
          <View key={`cuidado-${index}`} style={styles.marginMap}>
            <Text style={styles.headerText}>
              {cuidado.apego_Precoz ||
                cuidado.lactancia_materna_1_Hora ||
                cuidado.cura_Umbilical ||
                cuidado.profilaxis_Oftalmica ||
                cuidado.Vitamina_K}
            </Text>
            <Text style={styles.contentText}>
              No: {cuidado.no ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Sí: {cuidado.si ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              No Consta (NC): {cuidado.nc ? 'Sí' : 'No'}
            </Text>
          </View>
        ))}

        {/* Referido */}
        <Text style={styles.headerText}>
          Información de Referencia del Recién Nacido:
        </Text>
        {moduloPuerperio?.Referido.map((referido, index) => (
          <View key={`referido-${index}`} style={styles.marginMap}>
            <Text style={styles.contentText}>
              Alojamiento Conjunto: {referido.aloj_Conjun ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Neonatólogo: {referido.neonatologo ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Otros Hospitales: {referido.otros_hosp ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Anomalías Congénitas:{' '}
              {referido.anomalias_Congenitas || 'No especificado'}
            </Text>
          </View>
        ))}

        {/* Patologia */}
        <Text style={styles.headerText}>Patología en el Recién Nacido:</Text>
        {moduloPuerperio?.PatologiaRM.map((patologia, index) => (
          <View key={`patologia-${index}`} style={styles.marginMap}>
            <Text style={styles.contentText}>
              Ninguna: {patologia.ninguna ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Una o Más: {patologia.una_O_Mas ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              CIE-10 Uno: {patologia.CIE_10_Uno || 'No especificado'}
            </Text>
            <Text style={styles.contentText}>
              CIE-10 Dos: {patologia.CIE_10_Dos || 'No especificado'}
            </Text>
            <Text style={styles.contentText}>
              CIE-10 Tres: {patologia.CIE_10_Tres || 'No especificado'}
            </Text>
          </View>
        ))}

        {/* VIH */}
        <Text style={styles.headerText}>VIH en el Recién Nacido:</Text>
        {moduloPuerperio?.VIH_En_RN.map((vih, index) => (
          <View key={`vih-${index}`} style={styles.marginMap}>
            <Text style={styles.headerText}>{vih.expuesto || vih.tto}</Text>
            <Text style={styles.contentText}>No: {vih.no ? 'Sí' : 'No'}</Text>
            <Text style={styles.contentText}>Sí: {vih.si ? 'Sí' : 'No'}</Text>
            <Text style={styles.contentText}>S/D: {vih.sd ? 'Sí' : 'No'}</Text>
          </View>
        ))}

        {/* Tamizaje Neonatal */}
        <Text style={styles.headerText}>Resultados del Tamizaje Neonatal:</Text>
        {moduloPuerperio?.TamizajeNeonatal.map((tamizaje, index) => (
          <View key={`tamizaje-${index}`} style={styles.marginMap}>
            <Text style={styles.headerText}>{Object.keys(tamizaje)[0]}</Text>
            <Text style={styles.contentText}>
              Negativo: {tamizaje.negativo ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Positivo: {tamizaje.positivo ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              No se Hizo: {tamizaje.no_Se_Hizo ? 'Sí' : 'No'}
            </Text>
          </View>
        ))}

        {/* Egreso */}
        <Text style={styles.headerText}>
          Información de Egreso del Recién Nacido:
        </Text>
        {moduloPuerperio?.Egreso_RN.map((egreso, index) => (
          <View key={`egreso-${index}`} style={styles.marginMap}>
            <Text style={styles.contentText}>
              Vivo: {egreso.vivo ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Fallece: {egreso.fallece ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Fecha de Egreso: {egreso.fecha || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Hora de Egreso:{' '}
              {`${egreso.hora || 'HH'}:${egreso.minutos || 'MM'}`}
            </Text>
            <Text style={styles.contentText}>
              Fallece en el Lugar de Traslado:{' '}
              {egreso.fallece_Lugar_Traslado || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Edad al Egreso: {egreso.edad_Al_Egreso || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Menor de un Día: {egreso.menor_Un_Dia ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Lugar de Traslado: {egreso.lugar_De_Traslado || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Alimento al Alta: {egreso.alimento_Al_Alta || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Boca Arriba: {egreso.bocarriba ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              BCG: {egreso.BCG ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Inmunización Hepatitis B:{' '}
              {egreso.inmuno_Hepatitis_B || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Expulsión de Meconio en el Primer Día:{' '}
              {egreso.meconio_Uno_Dia ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Peso al Egreso: {egreso.peso_Al_Egreso || 'No informado'}
            </Text>
          </View>
        ))}

        {/* Puerperio Inmediato */}
        <Text style={styles.headerText}>Puerperio Inmediato:</Text>
        {moduloPuerperio?.PuerperioInmediato.map((puerperio, index) => (
          <View key={index} style={styles.marginMap}>
            <Text style={styles.contentText}>
              Hora: {puerperio.hora || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Minuto: {puerperio.minuto || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Temperatura (°C): {puerperio.temperatura_C || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Presión Arterial: {puerperio.PA || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Frecuencia Cardíaca: {puerperio.FC || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Involución Uterina:{' '}
              {puerperio.involucion_Uterina || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Loquios: {puerperio.loquios || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Responsable de la Salud:{' '}
              {puerperio.responsable_De_La_Salud || 'No informado'}
            </Text>
            <Text style={styles.contentText}>
              Iglobulina Anti D: {puerperio.iglobulina_Anti_D || 'No informado'}
            </Text>
          </View>
        ))}

        {/* Recomendaciones */}
        <Text style={styles.headerTextRecomendation}>Recomendaciones:</Text>
        {moduloPuerperio?.RecomendacionesFourthModule.map(
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
  headerTextRecomendation: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4081',
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
  marginMap: {
    marginBottom: 10,
  },
});

export default PuerperioDetails;
