import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Linking,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DocIDContext from '../Context/DocIDContext';

const ProfileScreen = ({navigation}) => {
  const {docID} = useContext(DocIDContext);
  const [userData, setUserData] = useState(null);
  const [isSecurityModalVisible, setSecurityModalVisible] = useState(false);
  const [isNotificationsModalVisible, setNotificationsModalVisible] =
    useState(false);
  const [isPrivacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [isTermsAndPolicyModalVisible, setTermsAndPolicyModalVisible] =
    useState(false);
  const [isLogoutConfirmationVisible, setLogoutConfirmationVisible] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection('cartilla')
          .doc(docID)
          .get();

        if (documentSnapshot.exists) {
          const data = documentSnapshot.data();
          setUserData(data.ModuloFiliacion?.DatosAfiliacion?.[0]);
        }
      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    if (docID) {
      fetchData();
    }
  }, [docID]);

  const handleNotificationsClick = () => {
    setNotificationsModalVisible(true);
  };

  const handleReportIssue = () => {
    const email = 'alvaropineda606@gmail.com';
    const subject = encodeURIComponent('Reporte de Problema en CartiBaby');
    const body = encodeURIComponent(
      'Describe aquí el problema que deseas reportar...',
    );

    const url = `mailto:${email}?subject=${subject}&body=${body}`;

    Linking.openURL(url).catch(err =>
      console.error('Error al abrir el enlace de correo:', err),
    );
  };
  const handleLogoutConfirmation = () => {
    setLogoutConfirmationVisible(false);
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/icons/iconProfile.png')}
          style={styles.profilePic}
        />
        <Text style={styles.name}>
          {userData
            ? `${userData.Nombres} ${userData.Apellidos}`
            : 'Nombre Apellido'}
        </Text>
      </View>
      <View style={styles.sectionsContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <View style={styles.optionBlock}>
            <OptionItem
              icon={require('../assets/icons/material-symbols_privacy-tip-outline.png')}
              text="Seguridad"
              onPress={() => setSecurityModalVisible(true)}
            />
            <OptionItem
              icon={require('../assets/icons/iconamoon_notification.png')}
              text="Notificaciones"
              onPress={handleNotificationsClick}
            />
            <OptionItem
              icon={require('../assets/icons/ic_outline-lock.png')}
              text="Privacidad"
              onPress={() => setPrivacyModalVisible(true)}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Soporte</Text>
        <View style={styles.optionBlock}>
          <OptionItem
            icon={require('../assets/icons/ic_sharp-outlined-flag.png')}
            text="Reportar Problema"
            onPress={handleReportIssue}
          />
          <OptionItem
            icon={require('../assets/icons/tabler_circle-letter-i.png')}
            text="Terminos Y Politicas"
            onPress={() => setTermsAndPolicyModalVisible(true)}
          />
          <OptionItem
            icon={require('../assets/icons/mdi_logout.png')}
            text="Cerrar Sesión"
            onPress={() => setLogoutConfirmationVisible(true)}
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isSecurityModalVisible}
        onRequestClose={() => setSecurityModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Seguridad de Tus Datos</Text>
            <Text style={styles.modalText}>
              Tus datos están seguros con nosotros. Utilizamos Firebase, una
              plataforma líder en seguridad y confiabilidad:
            </Text>
            <Text style={styles.modalText}>
              - Encriptación robusta en tránsito y en reposo.
            </Text>
            <Text style={styles.modalText}>
              - Autenticación segura y gestión de identidades.
            </Text>
            <Text style={styles.modalText}>
              - Reglas de seguridad estrictas y personalizadas.
            </Text>
            <Text style={styles.modalText}>
              - Cumplimiento de normativas de privacidad.
            </Text>
            <Text style={styles.modalText}>
              Tu privacidad y seguridad son nuestra prioridad.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSecurityModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isNotificationsModalVisible}
        onRequestClose={() => setNotificationsModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Notificaciones de CartLife</Text>
            <Text style={styles.modalText}>
              En CartLife, te mantenemos informada sobre tus próximas citas.
              Recibirás notificaciones para recordarte de tus compromisos
              futuros, asegurando que estés siempre al tanto y preparada.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setNotificationsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPrivacyModalVisible}
        onRequestClose={() => setPrivacyModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              Privacidad y Seguridad de Datos
            </Text>
            <Text style={styles.modalText}>
              En CartLife, la privacidad y seguridad de tus datos es nuestra
              principal preocupación. Utilizamos cifrado de extremo a extremo
              para proteger tu información:
            </Text>
            <Text style={styles.modalText}>
              - Tus datos personales y de salud están encriptados en todo
              momento.
            </Text>
            <Text style={styles.modalText}>
              - Solo tú y los profesionales autorizados tienen acceso a tus
              datos.
            </Text>
            <Text style={styles.modalText}>
              - El cifrado de extremo a extremo garantiza que tu información sea
              privada y segura, incluso durante la transmisión.
            </Text>
            <Text style={styles.modalText}>
              Confía en nosotros para mantener tu información segura y
              protegida, siempre respetando tu privacidad.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPrivacyModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isTermsAndPolicyModalVisible}
        onRequestClose={() => setTermsAndPolicyModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              Términos y Políticas de Privacidad
            </Text>
            <Text style={styles.modalText}>
              Bienvenido a CartBaby. Antes de continuar, es importante que leas
              y comprendas nuestros términos y políticas de privacidad.
            </Text>
            <Text style={styles.modalText}>
              1. Privacidad de Datos:Tu privacidad es importante para nosotros.
              Todos los datos que recopilamos se utilizan exclusivamente para
              mejorar tu experiencia en la aplicación y nunca se comparten con
              terceros sin tu consentimiento.
            </Text>
            <Text style={styles.modalText}>
              2. Seguridad: Utilizamos medidas de seguridad avanzadas para
              proteger tus datos. Esto incluye el cifrado de extremo a extremo y
              la autenticación segura.
            </Text>
            <Text style={styles.modalText}>
              3. Uso de Datos: Recolectamos información limitada, como tu nombre
              y dirección de correo electrónico, para brindarte nuestros
              servicios. Nunca compartiremos esta información con otros usuarios
              sin tu permiso.
            </Text>
            <Text style={styles.modalText}>
              4. Notificaciones: Podemos enviarte notificaciones sobre tu cuenta
              y actualizaciones de la aplicación. Puedes optar por no recibirlas
              en la configuración.
            </Text>
            <Text style={styles.modalText}>
              Al utilizar CartBaby, aceptas nuestros términos y políticas de
              privacidad. Si tienes alguna pregunta o inquietud, no dudes en
              ponerte en contacto con nosotros en [alvaropineda606@gmail.com].
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setTermsAndPolicyModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLogoutConfirmationVisible}
        onRequestClose={() => setLogoutConfirmationVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>¿Cerrar Sesión?</Text>
            <Text style={styles.modalText}>
              ¿Estás seguro de que deseas cerrar tu sesión?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setLogoutConfirmationVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleLogoutConfirmation}>
                <Text style={styles.confirmButtonText}>Sí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// Componente para los elementos de opción con icono y texto
const OptionItem = ({icon, text, onPress}) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.optionText}>{text}</Text>
  </TouchableOpacity>
);
const iconSize = 24;
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginRight: 10,
  },
  name: {
    color: '#222',
    fontSize: 23,
    fontFamily: 'Outfit-Bold',
  },
  section: {
    marginVertical: 20,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: '#222',
    paddingBottom: 8,
    fontFamily: 'Outfit-Bold',
  },
  optionBlock: {
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    color: '#222',
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'Outfit-Bold',
  },
  icon: {
    width: iconSize,
    height: iconSize,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  buttonText: {
    color: '#222',
    fontSize: 18,
  },
  buttonLast: {
    borderBottomWidth: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    color: '#222',
  },
  modalText: {
    textAlign: 'justify',
    marginBottom: 10,
    fontFamily: 'Outfit-Bold',
    color: '#222',
  },
  closeButton: {
    backgroundColor: '#EB7C9C',
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center', // Centra los elementos horizontalmente
    alignItems: 'center', // Centra los elementos verticalmente
    marginTop: 20, // Espacio adicional desde la parte superior
  },
  cancelButton: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
  },
  cancelButtonText: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: '#333', // Color de texto para el botón de Cancelar
  },
  confirmButton: {
    backgroundColor: '#EB7C9C', // Color secundario de tu paleta
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20, // Aumenta el padding horizontal si es necesario
    alignItems: 'center', // Centra horizontalmente el contenido del botón
    justifyContent: 'center',
    width: 70, // Ajusta el ancho del botón "Sí" según tu preferencia
    marginHorizontal: 10,
  },
  confirmButtonText: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: 'white',
  },
  sectionsContainer: {
    marginTop: 35,
  },
});
