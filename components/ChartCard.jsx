/* eslint-disable prettier/prettier */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DATA} from './my-data';
import {LineChart} from 'react-native-chart-kit';
import {COLORS} from '../constants/Colors';
import Icon from '@react-native-vector-icons/ionicons';

function ChartCard() {
  const chartConfig = {
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '1',
      stroke: '#ffa726',
    },
  };
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.subcont}>
        <Icon name="expand" size={24} color="#000" />
      </TouchableOpacity>
      <LineChart
        data={DATA}
        width={385}
        height={250}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    padding: 10,
    borderRadius: 20,
  },
  subcont: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 20,
    color: COLORS.BACKGROUND_DARK,
  },
});

export default ChartCard;
