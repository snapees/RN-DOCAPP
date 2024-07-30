/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Switch} from 'react-native';
import React from 'react';

export default function CustomSwitch({value, onValueChange}) {
  return (
    <View style={styles.container}>
      <View style={[styles.switchContainer, value ? styles.on : styles.off]}>
        <Text style={[styles.switchText]}>{value ? 'ON' : 'OFF'}</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={value ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={onValueChange}
          value={value}
          style={styles.switch}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    //padding: 10,
    width: 75,
    justifyContent: 'space-between',
  },
  switchText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  on: {
    backgroundColor: '#81b0ff',
  },
  off: {
    backgroundColor: '#767577',
  },
  switch: {
    marginLeft: 0,
  },
});
