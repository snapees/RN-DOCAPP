/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import CustomSwitch from './CustomSwitch';
import {COLORS} from '../constants/Colors';

export default function ScanCard({patient}) {
  // console.log(patient);
  const [isExpanded, setIsExpanded] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const handleExpansion1 = () => {
    setIsExpanded(!isExpanded);
  };
  const handleExpansion2 = () => {
    setExpanded(!expanded);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        {/* First container */}
        <View style={[styles.container, {marginLeft: 0}]}>
          {/* Add content here */}
          <View style={styles.headerContainer}>
            <Text style={styles.text}>Sensor Patch</Text>
            <TouchableOpacity onPress={handleExpansion1} style={styles.header}>
              {isExpanded ? (
                <Icon name="chevron-up" size={20} color="black" />
              ) : (
                <Icon name="chevron-down" size={20} color="black" />
              )}
            </TouchableOpacity>
          </View>
          {isExpanded ? (
            <View style={styles.expandedContent}>
              <Text style={[styles.text, {marginTop: 5}]}>
                Device ID: {patient?.deviceId}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[styles.text, {marginTop: 5}]}>Status:</Text>
                <CustomSwitch />
              </View>
            </View>
          ) : (
            <View style={styles.collapsedContent}>
              <Text style={[styles.text, {marginTop: 5}]}>
                Device ID: {patient?.deviceId}
              </Text>
            </View>
          )}
        </View>

        {/* Second container */}
        <View style={[styles.container, {marginLeft: 10}]}>
          {/* Add content here */}
          <View style={styles.headerContainer}>
            <Text style={styles.text}>Reference Unit</Text>
            <TouchableOpacity onPress={handleExpansion2} style={styles.header}>
              {expanded ? (
                <Icon name="chevron-up" size={20} color="black" />
              ) : (
                <Icon name="chevron-down" size={20} color="black" />
              )}
            </TouchableOpacity>
          </View>
          {expanded ? (
            <View style={styles.expandedContent}>
              <Text style={[styles.text, {marginTop: 5}]}>
                Device ID: {patient?.deviceId}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.text, {marginTop: 5}]}>Status:</Text>
                <CustomSwitch />
              </View>
            </View>
          ) : (
            <View style={styles.collapsedContent}>
              <Text style={[styles.text, {marginTop: 5}]}>
                Device ID: {patient?.deviceId}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.subContainer}>
        {/* Third container */}
        <View style={[styles.container, {marginLeft: 0, height: 200}]}>
          {/* Add content here */}
          <View style={styles.headerContainer}>
            <Text style={styles.text}>Sensor Patch Image</Text>
            {/* <TouchableOpacity onPress={handleExpansion} style={styles.header}>
                {isExpanded ? (
                  <Icon name="chevron-up" size={20} color="black" />
                ) : (
                  <Icon name="chevron-down" size={20} color="black" />
                )}
              </TouchableOpacity> */}
          </View>
        </View>

        {/* Fourt container */}
        <View style={[styles.container, {marginLeft: 10, height: 200}]}>
          {/* Add content here */}
          <View style={styles.headerContainer}>
            <Text style={styles.text}>Reference Unit Image</Text>
            {/* <TouchableOpacity onPress={handleExpansion} style={styles.header}>
                {isExpanded ? (
                  <Icon name="chevron-up" size={20} color="black" />
                ) : (
                  <Icon name="chevron-down" size={20} color="black" />
                )}
              </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  subContainer: {
    // padding: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    // height: 200,
  },
  text: {
    marginTop: -10,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.BACKGROUND_DARK,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    right: -10,
    top: -10,
  },
  expandedContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  collapsedContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
