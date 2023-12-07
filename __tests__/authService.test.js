import {verificarCredencial} from '../src/functions/authService';
import {Alert} from 'react-native';

// Mock de Alert
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

// Setup para los mocks de Firestore
const mockGet = jest.fn();

jest.mock('@react-native-firebase/firestore', () => {
  return () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: mockGet,
      })),
    })),
  });
});

// Mock para setDocID
const setDocIDMock = jest.fn();

// Mock para navigation
const navigationMock = {
  navigate: jest.fn(),
};

describe('Auth Service Tests', () => {
  beforeEach(() => {
    // Limpia las implementaciones y llamadas de los mocks antes de cada test
    jest.clearAllMocks();
  });

  describe('verificarCredencial - Credencial Existente', () => {
    it('navega hacia MainApp si la credencial existe y establece DocID', async () => {
      const mockDocSnapshot = {exists: true};
      const mockGetPromise = Promise.resolve(mockDocSnapshot);
      const firestore = require('@react-native-firebase/firestore');
      firestore().collection().doc().get.mockReturnValue(mockGetPromise);

      await verificarCredencial(
        'credencial_valida',
        navigationMock,
        setDocIDMock,
      );

      expect(setDocIDMock).toHaveBeenCalledWith('credencial_valida');
      expect(navigationMock.navigate).toHaveBeenCalledWith('MainApp');
      expect(Alert.alert).toHaveBeenCalledWith('Éxito', 'Acceso permitido');
    });
  });

  describe('verificarCredencial - Credencial Inexistente', () => {
    it('muestra una alerta si la credencial no existe', async () => {
      mockGet.mockResolvedValue({exists: false});

      await verificarCredencial('credencial_inexistente', navigationMock);

      expect(navigationMock.navigate).not.toHaveBeenCalledWith('MainApp');
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Credencial perinatal no encontrada',
      );
    });
  });

  describe('verificarCredencial - Error al Verificar', () => {
    it('muestra una alerta si hay un error al verificar la credencial', async () => {
      mockGet.mockRejectedValue(new Error('Error de Firestore'));

      await verificarCredencial('credencial_erronea', navigationMock);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Hubo un error al verificar la credencial',
      );
    });
  });
});
