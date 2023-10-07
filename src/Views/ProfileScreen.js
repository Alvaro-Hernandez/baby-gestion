import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProfileScreen = () => {
  return (
    <View>
      <Text style={styles.label}>ProfileScreen</Text>
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
