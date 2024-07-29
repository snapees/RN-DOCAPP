/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Switch} from 'react-native';
import React, {useState} from 'react';

export default function CustomSwitch() {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.switchContainer, isEnabled ? styles.on : styles.off]}>
        <Text style={[styles.switchText]}>{isEnabled ? 'ON' : 'OFF'}</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
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
