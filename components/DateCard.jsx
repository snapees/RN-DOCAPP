/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/Colors';

export default function DateCard() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.dateContainer}>
      <Text style={styles.txt}>Today, {formattedDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    marginTop: 10,
    marginLeft: 15,
  },
  txt: {
    fontSize: 16,
    color: COLORS.TEXT_DARK,
  },
});
