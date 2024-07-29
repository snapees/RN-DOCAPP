/* eslint-disable prettier/prettier */

import {View} from 'react-native';
import React from 'react';
import CollapsibleCard from '../../components/CollapsibleCard';

import DateCard from '../../components/DateCard';
import BoxesCard from '../../components/BoxesCard';
import ReferenceCard from '../../components/ReferenceCard';
import ChartCard from '../../components/ChartCard';
import MessageIcon from '../../components/MessageIcon';

export default function PatientDetails({route}) {
  const {patient} = route.params;
  // const imageUrl = patient?.imageUrl;

  return (
    <View>
      {/* Collapsible Card */}
      <View>
        <CollapsibleCard
          imageUrl={patient?.imageUrl}
          caseId={patient?.caseId}
          name={patient?.name}
          surgery={patient?.surgery}
          duration={patient?.duration}
        />
      </View>

      {/* Show Date */}
      <DateCard />

      {/* Boxes  */}
      <BoxesCard />

      {/* Reference */}
      <ReferenceCard />

      {/* Chart Card */}
      <ChartCard />

      {/* meassage icon */}
      <MessageIcon />
    </View>
  );
}
