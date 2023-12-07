import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const GestacionActualDetails = ({route}) => {
  //Acceder al ID de la mujer embarazada
  const {docID} = route.params;
  //Modulo Gestacion actual
  const [moduloGestacionActual, setModuloGestacionActual] = useState(null);

  //Obtener datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection('cartilla')
          .doc(docID)
          .get();

        if (documentSnapshot.exists) {
          setModuloGestacionActual(
            documentSnapshot.data().ModuloGestacionActual,
          );
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
        {/* Datos Individuales */}
        <Text style={styles.headerText}>Peso Anterior:</Text>
        <Text style={styles.contentText}>
          {moduloGestacionActual?.pesoAnterior || 'No disponible'}
        </Text>
        <Text style={styles.headerText}>Talla:</Text>
        <Text style={styles.contentText}>
          {moduloGestacionActual?.talla || 'No disponible'}
        </Text>
        <Text style={styles.headerText}>
          Fecha de última menstruación (F.U.M.):
        </Text>
        <Text style={styles.contentText}>
          {moduloGestacionActual?.DateFUM || 'No disponible'}
        </Text>
        <Text style={styles.headerText}>Fecha probable de parto (F.P.P.):</Text>
        <Text style={styles.contentText}>
          {moduloGestacionActual?.DateFPP || 'No disponible'}
        </Text>

        {/* Datos de Trimestre  */}
        <Text style={styles.headerText}>Trimestres:</Text>
        {moduloGestacionActual?.trimestresData.map((trimestre, index) => (
          <View key={index} style={styles.marginMap}>
            <Text style={styles.headerText}>{trimestre.trimestre}</Text>
            <Text style={styles.contentText}>
              Fuma Pasado: {trimestre.fumaPas ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Fuma Actual: {trimestre.fumaAct ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Droga: {trimestre.droga ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Alcohol: {trimestre.alcohol ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Violencia: {trimestre.violencia ? 'Sí' : 'No'}
            </Text>
          </View>
        ))}

        {/* Antirubela */}
        <Text style={styles.headerText}>Antirubeola:</Text>
        {moduloGestacionActual?.Antirubeola.map((item, index) => (
          <View key={index} style={styles.marginMap}>
            <Text style={styles.contentText}>
              Previa: {item.previa ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              No Sabe: {item.noSabe ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Embarazo: {item.embarazo ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>No: {item.no ? 'Sí' : 'No'}</Text>
          </View>
        ))}

        {/* ExNormal */}
        <Text style={styles.headerText}>ExNormal:</Text>
        {moduloGestacionActual?.ExNormal.map((item, index) => (
          <View key={index} style={styles.marginMap}>
            <Text style={styles.contentText}>
              Odont: {item.Odont ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Mamas: {item.Mamas ? 'Sí' : 'No'}
            </Text>
          </View>
        ))}

        {/* Cervix */}
        <Text style={styles.headerText}>Cervix:</Text>
        {moduloGestacionActual?.Cervix.map((cervixData, index) => (
          <View key={index} style={styles.marginMap}>
            {cervixData.InspVisual && (
              <Text style={styles.contentText}>Tipo: InspVisual</Text>
            )}
            {cervixData.PAP && (
              <Text style={styles.contentText}>Tipo: PAP</Text>
            )}
            {cervixData.COLP && (
              <Text style={styles.contentText}>Tipo: COLP</Text>
            )}
            <Text style={styles.contentText}>
              Normal: {cervixData.normal ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Anormal: {cervixData.anormal ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              No se hizo: {cervixData.noSeHizo ? 'Sí' : 'No'}
            </Text>
          </View>
        ))}

        {/* Grupo A */}
        <Text style={styles.headerText}>Grupo A:</Text>
        {moduloGestacionActual?.GrupoA.map((item, index) => (
          <View key={index} style={styles.marginMap}>
            <Text style={styles.contentText}>RH: {item.RH}</Text>
            <Text style={styles.contentText}>
              Imunización: {item.imuniz ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Y-Globulina Anti-D: {item.yglobulina_anti_D || 'No disponible'}
            </Text>
          </View>
        ))}

        {/* Toxoplasnosis */}
        <Text style={styles.headerText}>Toxoplasnosis:</Text>
        {moduloGestacionActual?.Toxoplasnosis.map((toxo, index) => (
          <View key={index} style={styles.marginMap}>
            <Text style={styles.headerText}>
              {toxo.menor12Semanas_igG ||
                toxo.mayorigual_12Semanas_igG ||
                toxo.primera_consulta_igM}
            </Text>
            <Text style={styles.contentText}>
              Negativo: {toxo.negativo ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              Positivo: {toxo.positivo ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.contentText}>
              No se hizo: {toxo.noSehizo ? 'Sí' : 'No'}
            </Text>
          </View>
        ))}

        {/* Suplemento */}
        <Text style={styles.headerText}>Suplemento Inicial:</Text>
        {moduloGestacionActual?.SuplementoIncial.map(
          (suplementoItem, index) => (
            <View key={index} style={styles.marginMap}>
              <Text style={styles.contentText}>
                Hierro (Fe): {suplementoItem.fe ? 'Sí' : 'No'}
              </Text>
              <Text style={styles.contentText}>
                Folatos: {suplementoItem.folatos ? 'Sí' : 'No'}
              </Text>
              <Text style={styles.contentText}>
                Multivitaminas: {suplementoItem.multi_vitaminas ? 'Sí' : 'No'}
              </Text>
            </View>
          ),
        )}

        {/* Chagas */}
        <Text style={styles.headerText}>Chagas:</Text>
        {moduloGestacionActual?.Chagas &&
          moduloGestacionActual.Chagas.map((changasItem, index) => (
            <View key={index} style={styles.marginMap}>
              {Object.entries(changasItem).map(([key, value], idx) => (
                <Text key={idx} style={styles.contentText}>
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/_/g, ' ')}
                  : {value}
                </Text>
              ))}
            </View>
          ))}

        {/* Consejeria */}
        <Text style={styles.headerText}>Consejería:</Text>
        {moduloGestacionActual?.Consejeria &&
          moduloGestacionActual.Consejeria.map((consejeriaItem, index) => (
            <View key={index} style={styles.marginMap}>
              {Object.entries(consejeriaItem).map(([key, value], idx) => (
                <Text key={idx} style={styles.contentText}>
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/_/g, ' ')}
                  : {value ? 'Sí' : 'No'}
                </Text>
              ))}
            </View>
          ))}

        {/* VIH Primera Prueba */}
        <Text style={styles.headerText}>VIH Primera Prueba:</Text>
        {moduloGestacionActual?.VIHPrimeraPrueba &&
          moduloGestacionActual.VIHPrimeraPrueba.map((vihItem, index) => (
            <View key={index} style={styles.marginMap}>
              {Object.entries(vihItem).map(([key, value], idx) => {
                if (typeof value === 'boolean') {
                  return (
                    <Text key={idx} style={styles.contentText}>
                      {key.charAt(0).toUpperCase() +
                        key.slice(1).replace(/_/g, ' ')}
                      : {value ? 'Sí' : 'No'}
                    </Text>
                  );
                } else {
                  return (
                    <Text key={idx} style={styles.contentText}>
                      {key.charAt(0).toUpperCase() +
                        key.slice(1).replace(/_/g, ' ')}
                      : {value}
                    </Text>
                  );
                }
              })}
            </View>
          ))}

        {/* VIH Segunda Prueba */}
        <Text style={styles.headerText}>VIH Segunda Prueba:</Text>
        {moduloGestacionActual?.VIHSegundaPrueba &&
          moduloGestacionActual.VIHSegundaPrueba.map(
            (vihSegundaItem, index) => (
              <View key={index} style={styles.marginMap}>
                {Object.entries(vihSegundaItem).map(([key, value], idx) => {
                  if (typeof value === 'boolean') {
                    return (
                      <Text key={idx} style={styles.contentText}>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/_/g, ' ')}
                        : {value ? 'Sí' : 'No'}
                      </Text>
                    );
                  } else {
                    return (
                      <Text key={idx} style={styles.contentText}>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/_/g, ' ')}
                        : {value}
                      </Text>
                    );
                  }
                })}
              </View>
            ),
          )}

        {/* Sífilis Primera Prueba */}
        <Text style={styles.headerText}>Sífilis Primera Prueba:</Text>
        {moduloGestacionActual?.SifilisPrimeraPrueba &&
          moduloGestacionActual.SifilisPrimeraPrueba.map(
            (sifilisPrimeraItem, index) => (
              <View key={index} style={styles.marginMap}>
                {Object.entries(sifilisPrimeraItem).map(([key, value], idx) => {
                  if (typeof value === 'boolean') {
                    return (
                      <Text key={idx} style={styles.contentText}>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/_/g, ' ')}
                        : {value ? 'Sí' : 'No'}
                      </Text>
                    );
                  } else {
                    return (
                      <Text key={idx} style={styles.contentText}>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/_/g, ' ')}
                        : {value}
                      </Text>
                    );
                  }
                })}
              </View>
            ),
          )}

        {/* Sífilis Segunda Prueba */}
        <Text style={styles.headerText}>Sífilis Segunda Prueba:</Text>
        {moduloGestacionActual?.SifilisSegundaPrueba &&
          moduloGestacionActual.SifilisSegundaPrueba.map(
            (sifilisSegundaItem, index) => (
              <View key={index} style={styles.marginMap}>
                {Object.entries(sifilisSegundaItem).map(([key, value], idx) => {
                  if (typeof value === 'boolean') {
                    return (
                      <Text key={idx} style={styles.contentText}>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/_/g, ' ')}
                        : {value ? 'Sí' : 'No'}
                      </Text>
                    );
                  } else {
                    return (
                      <Text key={idx} style={styles.contentText}>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/_/g, ' ')}
                        : {value}
                      </Text>
                    );
                  }
                })}
              </View>
            ),
          )}

        {/* Atenciones Prenatales */}
        <Text style={styles.headerText}>Atenciones Prenatales:</Text>
        {moduloGestacionActual?.AtencionesPrenatales &&
          moduloGestacionActual.AtencionesPrenatales.map(
            (atencionItem, index) => (
              <View key={index} style={styles.marginMap}>
                {Object.entries(atencionItem).map(([key, value], idx) => {
                  if (typeof value === 'boolean') {
                    return (
                      <Text key={idx} style={styles.contentText}>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/_/g, ' ')}
                        : {value ? 'Sí' : 'No'}
                      </Text>
                    );
                  } else {
                    return (
                      <Text key={idx} style={styles.contentText}>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/_/g, ' ')}
                        : {value}
                      </Text>
                    );
                  }
                })}
              </View>
            ),
          )}

        {/* Recomendaciones */}
        <Text style={styles.headerTextRecomendation}>Recomendaciones:</Text>
        {moduloGestacionActual?.Recomendaciones.map((recomendacion, index) => (
          <View key={index} style={styles.marginMap}>
            <Text style={styles.contentText}>
              ID Médico: {recomendacion.Id_Medico || 'No proporcionado'}
            </Text>
            <Text style={styles.contentText}>
              Recomendación:
              {recomendacion.recomendaciones || 'No hay recomendaciones'}
            </Text>
          </View>
        ))}
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

export default GestacionActualDetails;
