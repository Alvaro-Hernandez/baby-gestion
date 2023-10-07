import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  async function loadData() {
    try {
      const pregnantWomen = await firestore().collection('usuarios').get();
      console.log(pregnantWomen.docs[0].data());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      <Text style={styles.label}>HomeScreen</Text>
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
