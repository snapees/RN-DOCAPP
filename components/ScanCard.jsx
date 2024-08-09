/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  BackHandler,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import CustomSwitch from './CustomSwitch';
import {COLORS} from '../constants/Colors';
import {usePermissions} from '../cameraComponents/usePErmissions';
import {EPermissionTypes} from '../cameraComponents/constants';
import {RESULTS} from 'react-native-permissions';
import {getShadowProps, goToSettings} from '../cameraComponents/helpers';
import {CameraScanner} from '../cameraComponents/CameraScanners';
import {useNavigation} from '@react-navigation/native';

export default function ScanCard({patient}) {
  // console.log(patient);
  const [isExpanded, setIsExpanded] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [SwitchOn, setSwitchOn] = useState(false);

  const {askPermissions} = usePermissions(EPermissionTypes.CAMERA);
  const [cameraShown, setCameraShown] = useState(false);
  const [qrText, setQrText] = useState('');

  const navigation = useNavigation();

  const handleExpansion1 = () => {
    setIsExpanded(!isExpanded);
  };
  const handleExpansion2 = () => {
    setExpanded(!expanded);
  };
  const handleSwitchChange = value => {
    setIsSwitchOn(value);
  };
  const handleSwitchChange2 = value => {
    setSwitchOn(value);
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

  const handleReadCode = value => {
    console.log(value);
    // setQrText(value);
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      // setQrText(`Device ID: ${patient?.deviceId}`);
      const newDeviceId = value;
      patient.deviceId = newDeviceId; // Update the patient object with the new device ID
      setQrText(`${newDeviceId}`);
    } else {
      setQrText(value);
    }
    setCameraShown(false);
  };

  const handleOpenLink = () => {
    const url = qrText.trim();
    console.log(url);
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      const newUrl = `http://${url}`;
      Linking.openURL(newUrl).catch(err =>
        console.error('An error occurred', err),
      );
    } else {
      Linking.openURL(url).catch(err =>
        console.error('An error occurred', err),
      );
    }
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.text, {marginTop: 5, marginRight: 60}]}>
                  Device ID:
                </Text>
                <Text style={[styles.text, {marginTop: 5, marginLeft: 0}]}>
                  {patient?.deviceId}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[styles.text, {marginTop: 5, marginRight: 60}]}>
                  Status:
                </Text>
                <CustomSwitch
                  value={isSwitchOn}
                  onValueChange={handleSwitchChange}
                />
              </View>
              {isSwitchOn ? (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <Image
                    source={require('../assets/images/image.png')}
                    style={[
                      styles.image12,
                      {
                        width: 120,
                        height: 60,
                        marginTop: 20,
                      },
                    ]}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      takePermissions();
                      // navigation.navigate('Camera', {patient: patient});
                    }}
                    activeOpacity={0.5}
                    style={{
                      // ...styles.itemContainer,
                      marginLeft: 5,
                      alignSelf: 'flex-end',
                    }}>
                    <Icon name="qr-code" size={30} color="black" />
                  </TouchableOpacity>
                  {cameraShown && (
                    <CameraScanner
                      setIsCameraShown={setCameraShown}
                      onReadCode={handleReadCode}
                      patientData={patient}
                    />
                  )}
                  {/* {qrText !== '' && (
                    <TouchableOpacity
                      onPress={handleOpenLink}
                      style={[
                        styles.qrTextContainer,
                        {
                          position: 'absolute',
                          bottom: 0,
                          alignSelf: 'center',
                          left: 0,
                          right: 0,
                          padding: 20,
                          backgroundColor: '#f0f0f0',
                          borderRadius: 10,
                          marginVertical: 20,
                        },
                      ]}>
                      <View>
                        <Text style={styles.qrText}>{qrText}</Text>
                      </View>
                    </TouchableOpacity>
                  )} */}
                </View>
              ) : (
                <View style={{height: 80}} />
              )}
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.text, {marginTop: 5, marginRight: 60}]}>
                  Device ID:
                </Text>
                <Text style={[styles.text, {marginTop: 5}]}>
                  {patient?.deviceId}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.text, {marginTop: 5, marginRight: 60}]}>
                  Status:
                </Text>
                <CustomSwitch
                  value={SwitchOn}
                  onValueChange={handleSwitchChange2}
                />
              </View>
              {SwitchOn ? (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <Image
                    source={require('../assets/images/image.png')}
                    style={[
                      styles.image12,
                      {
                        width: 120,
                        height: 60,
                        marginTop: 20,
                      },
                    ]}
                  />
                  <TouchableOpacity
                    style={{
                      marginLeft: 5,
                      alignSelf: 'flex-end',
                    }}>
                    <Icon name="qr-code" size={30} color="black" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{height: 80}} /> // Add a View with a fixed height
              )}
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
          </View>
          <View style={styles.expandedContent}>
            <Image
              source={require('../assets/images/image.png')}
              style={[styles.image3]}
            />
            <TouchableOpacity style={{marginRight: -10, alignSelf: 'flex-end'}}>
              <Icon name="camera-sharp" size={40} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Fourt container */}
        <View style={[styles.container, {marginLeft: 10, height: 200}]}>
          {/* Add content here */}
          <View style={styles.headerContainer}>
            <Text style={styles.text}>Reference Unit Image</Text>
          </View>
          <Text
            style={[
              styles.text,
              {alignSelf: 'center', textAlignVertical: 'center', marginTop: 50},
            ]}>
            Upload Reference Unit Image
          </Text>
          <View style={styles.expandedContent}>
            <TouchableOpacity
              style={{marginRight: -10, alignSelf: 'flex-end', marginTop: 33}}>
              <Icon name="camera-sharp" size={40} color="black" />
            </TouchableOpacity>
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
    height: 130,
  },
  collapsedContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image12: {
    width: '75%',
    height: '35%',
    borderRadius: 5,
    opacity: 0.5,
  },
  image3: {
    width: '75%',
    height: '80%',
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  // container1: {
  //   flex: 1,
  //   paddingHorizontal: 24,
  //   backgroundColor: 'white',
  // },
  itemContainer: {
    width: '100%',
    height: 70,
    backgroundColor: 'white',
    marginTop: 30,
    justifyContent: 'center',
    ...getShadowProps(),
    paddingLeft: 20,
  },
  itemText: {
    fontSize: 17,
    color: 'black',
  },
  qrTextContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 20,
  },
  qrText: {
    fontSize: 18,
    color: '#333',
  },
});
