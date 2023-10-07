import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const FetusIAScreen = () => {
  return (
    <View>
      <Text style={styles.label}>FetusIAScreen</Text>
    </View>
  );
};

export default FetusIAScreen;

const styles = StyleSheet.create({
  label: {
    color: '#222',
    fontSize: 24,
  },
});
