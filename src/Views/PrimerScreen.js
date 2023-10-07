import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PrimerScreen = () => {
  return (
    <View>
      <Text style={styles.label}>PrimerScreen</Text>
    </View>
  );
};

export default PrimerScreen;

const styles = StyleSheet.create({
  label: {
    color: '#222',
    fontSize: 24,
  },
});
