/* eslint-disable prettier/prettier */
import {View} from 'react-native';
import React from 'react';
import CollapsibleCard from '../../components/CollapsibleCard';
import ScanCard from '../../components/ScanCard';

export default function InactivePatientDetails({route}) {
  const {patient} = route.params;

  return (
    <View>
      <CollapsibleCard
        imageUrl={patient?.imageUrl}
        caseId={patient?.caseId}
        name={patient?.name}
        surgery={patient?.surgery}
        duration={patient?.duration}
      />

      {/* Scan Related Component */}
      <ScanCard patient={patient} />
    </View>
  );
}
