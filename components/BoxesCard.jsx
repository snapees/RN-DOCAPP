/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/Colors';

export default function BoxesCard() {
  return (
    <View style={styles.boxesContainer}>
      <View style={styles.box}>
        <Text style={styles.boxText}>98</Text>
        <Text style={styles.boxLabel}>Temperature</Text>
      </View>
      <View style={[styles.box, {borderColor: COLORS.SUCCESS_DARK}]}>
        <Text style={styles.boxText}>2.5</Text>
        <Text style={[styles.boxLabel, {marginLeft: 30}]}>Skin</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>25</Text>
        <Text style={[styles.boxLabel, {marginLeft: 15}]}>Redness</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxesContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 10,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderWidth: 5,
    borderRadius: 99,
    borderColor: COLORS.SUCCESS,
  },
  boxText: {
    margin: 25,
    marginLeft: 30,
    fontSize: 25,
    color: COLORS.TEXT_DARK,
    marginHorizontal: 10,
  },
  boxLabel: {
    fontSize: 16,
    color: COLORS.TEXT_DARK,
    marginTop: 15,
  },
});
