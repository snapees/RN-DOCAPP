/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CollapsibleCard from '../../components/CollapsibleCard';
import ScanCard from '../../components/ScanCard';
import {COLORS} from '../../constants/Colors';

export default function InactivePatientDetails({route}) {
  const {patient} = route.params;

  return (
    <View style={styles.container}>
      <CollapsibleCard
        imageUrl={patient?.imageUrl}
        caseId={patient?.caseId}
        name={patient?.name}
        surgery={patient?.surgery}
        duration={patient?.duration}
      />

      {/* Scan Related Component */}
      <ScanCard patient={patient} />

      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Sync Device</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: undefined,
    right: undefined,
    width: '40%',
    padding: 16,
    margin: 20,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
