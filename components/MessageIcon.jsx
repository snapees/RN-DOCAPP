/* eslint-disable prettier/prettier */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/ionicons';

export default function MessageIcon() {
  return (
    <View style={styles.outerBox}>
      <View style={styles.innerBox}>
        <Icon name="arrow-undo" size={24} color="#000" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  innerBox: {
    width: 50,
    height: 50,
    borderRadius: 99,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -40,
  },
});
