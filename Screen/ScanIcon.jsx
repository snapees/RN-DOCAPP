/* eslint-disable prettier/prettier */
import {
  Alert,
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CollapsibleCard from '../components/CollapsibleCard';
import {CameraScanner} from '../cameraComponents/CameraScanners';
import {usePermissions} from '../cameraComponents/usePErmissions';
import {EPermissionTypes} from '../cameraComponents/constants';
import {RESULTS} from 'react-native-permissions';
import {goToSettings} from '../cameraComponents/helpers';
import {useNavigation} from '@react-navigation/native';
import Icon from '@react-native-vector-icons/ionicons';

export default function ScanIcon({route}) {
  const {patient} = route.params;
  const {askPermissions} = usePermissions(EPermissionTypes.CAMERA);
  const navigation = useNavigation();

  const [cameraShown, setCameraShown] = useState(false);

  const [qrText, setQrText] = useState('');

  // useEffect(() => {
  //   setTimeout(() => {
  //     takePermissions();
  //   }, 2000);
  // }, []);

  const takePermissions = async () => {
    askPermissions()
      .then(response => {
        //permission given for camera
        if (
          response.type === RESULTS.LIMITED ||
          response.type === RESULTS.GRANTED
        ) {
          setCameraShown(true);
        }
      })
      .catch(error => {
        if ('isError' in error && error.isError) {
          Alert.alert(
            error.errorMessage ||
              'Something went wrong while taking camera permission',
          );
        }
        if ('type' in error) {
          if (error.type === RESULTS.UNAVAILABLE) {
            Alert.alert('This feature is not supported on this device');
          } else if (
            error.type === RESULTS.BLOCKED ||
            error.type === RESULTS.DENIED
          ) {
            Alert.alert(
              'Permission Denied',
              'Please give permission from settings to continue using camera.',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'Go To Settings', onPress: () => goToSettings()},
              ],
            );
          }
        }
      });
  };

  function handleBackButtonClick() {
    if (cameraShown) {
      setCameraShown(false);
    }
    return false;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  });

  const handleReadCode = value => {
    console.log(value);
    setQrText(value);
    // if (!value.startsWith('http://') && !value.startsWith('https://')) {
    //   // setQrText(`Device ID: ${patient?.deviceId}`);
    //   const newDeviceId = value;
    //   patient.deviceId = newDeviceId; // Update the patient object with the new device ID
    //   setQrText(`${newDeviceId}`);
    // } else {
    //   setQrText(value);
    // }
    // Update the patient object with the new device ID
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      const newDeviceId = value;
      patient.deviceId = newDeviceId;
    }
    setCameraShown(false);
    navigation.goBack('ScanCard', {params: {deviceId: qrText}});
  };

  const handleQrCodePress = () => {
    takePermissions();
    setCameraShown(true);
  };

  return (
    <View>
      {/* <Text>ScanIcon Screen</Text> */}
      <CollapsibleCard
        imageUrl={patient?.imageUrl}
        caseId={patient?.caseId}
        name={patient?.name}
        surgery={patient?.surgery}
        duration={patient?.duration}
      />

      <View style={styles.mainContainer}>
        <View style={styles.sensorPatchContainer}>
          <Text>Sensor Patch</Text>
          {cameraShown && (
            <CameraScanner
              setIsCameraShown={setCameraShown}
              onReadCode={handleReadCode}
              // style={{flex: 1}}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              // takePermissions();
              handleQrCodePress();
            }}
            style={styles.qrCodeIconContainer}>
            <Icon name="qr-code-outline" size={30} color="black" />
            {/* {cameraShown && (
              <CameraScanner
                setIsCameraShown={setCameraShown}
                onReadCode={handleReadCode}
                style={{flex: 1}}
              />
            )} */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    display: 'flex',
    flex: 1,
    // overflow: 'hidden',
  },
  sensorPatchContainer: {
    padding: 10,
    marginLeft: 10,
    position: 'absolute',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    width: '100%',
    height: 400,
    // overflow: 'hidden',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  qrCodeIconContainer: {
    position: 'absolute',
    top: 500,
    left: 0,
    right: 0,
    backgroundColor: '#ddd',
    borderRadius: 99,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginLeft: '45%',
  },
});
