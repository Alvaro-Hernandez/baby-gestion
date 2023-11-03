module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-button|@react-native-community|@react-native)/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/path/to/ignore/'],
  testMatch: ['**/__tests__/**/*.test.js'],
};
