/* eslint-disable prettier/prettier */
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/Colors';

const patientData = [
  {
    caseId: '1597841',
    name: 'John Doe',
    surgery: 'Knee Arthroscopy',
    duration: '3 Days',
    imageUrl:
      'https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_1280.png',
    deviceId: 'ABC123',
    status: 'active',
  },
  {
    caseId: '2345678',
    name: 'Jane Doe',
    surgery: 'Hip Replacement',
    duration: '5 Days',
    imageUrl: 'https://via.placeholder.com/100',
    deviceId: 'AB12',
    status: 'inactive',
  },
  {
    caseId: '1',
    name: '',
    surgery: '',
    duration: '',
    imageUrl: 'https://via.placeholder.com/100',
    deviceId: 'AD19',
    status: 'completed',
  },
  {
    caseId: '2',
    name: '',
    surgery: '',
    duration: '',
    imageUrl: 'https://via.placeholder.com/100',
    deviceId: 'AW948',
    status: 'completed',
  },
  // Add more patient data here...
];

export default function Screen1({navigation}) {
  const clickHandler = item => {
    console.log('Item Clicked', item);
    if (item.status === 'active') {
      ToastAndroid.show('Patient is Active', ToastAndroid.BOTTOM);
      navigation.navigate('PatientDetails', {patient: item});
    } else if (item.status === 'inactive') {
      ToastAndroid.show('Patient is Inactive', ToastAndroid.BOTTOM);
      navigation.navigate('InactivePatientDetails', {patient: item});
    } else if (item.status === 'completed') {
      ToastAndroid.show('Patient is Completed', ToastAndroid.BOTTOM);
      navigation.navigate('CompletedPatientDetails', {patient: item});
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={patientData}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => clickHandler(item)}>
            <View
              style={[
                styles.card,
                {
                  borderColor:
                    item.status === 'active'
                      ? COLORS.SUCCESS
                      : item.status === 'inactive'
                      ? COLORS.ERROR_LIGHT
                      : COLORS.PRIMARY,
                },
              ]}>
              <Image source={{uri: item.imageUrl}} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.details}>Case Id: {item.caseId}</Text>
                <Text style={styles.details}>Name: {item.name}</Text>
                <Text style={styles.details}>Surgery: {item.surgery}</Text>
                <Text style={styles.details}>Duration: {item.duration}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.caseId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  card: {
    marginBottom: 25,
    marginLeft: 10,
    backgroundColor: COLORS.BACKGROUND,
    padding: 30,
    borderWidth: 2,
    // borderColor: 'green',
    borderRadius: 10,
    shadowColor: '#000',
    elevation: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 10,
    marginRight: 20,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  details: {
    fontSize: 16,
    color: '#333',
  },
});
