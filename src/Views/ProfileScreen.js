import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ProfileScreen = () => {
  return (
    <View>
      <Text style={styles.label}>Hola Mundo</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  label: {
    color: '#222',
    fontSize: 24,
  },
});
