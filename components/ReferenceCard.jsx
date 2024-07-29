/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/Colors';

export default function ReferenceCard() {
  return (
    <View style={styles.referenceContainer}>
      <View style={styles.cont1}>
        <Text style={styles.referenceTitle}>Reference</Text>
        <Text style={styles.referenceTitle}>Time: 6:30AM</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.cont2}>
        <Text style={styles.referenceTitle}>At Time</Text>
        <Text style={styles.referenceTitle}>Time: 10:30AM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  referenceContainer: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    padding: 10,
    marginTop: 130,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: COLORS.BACKGROUND_DARK,
    width: '95%',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cont1: {
    flex: 1,
    alignItems: 'center',
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: COLORS.BACKGROUND_DARK,
  },
  cont2: {
    flex: 1,
    alignItems: 'center',
  },
  referenceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
});
