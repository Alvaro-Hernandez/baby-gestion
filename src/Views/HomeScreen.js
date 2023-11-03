import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.label}>Hola Mundo</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  label: {
    color: '#222',
    fontSize: 24,
  },
});
