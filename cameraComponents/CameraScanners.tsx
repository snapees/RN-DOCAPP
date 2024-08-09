/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Camera,
  CameraRuntimeError,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useAppStateListener} from './useAppStateListener';
import {RNHoleView} from 'react-native-hole-view';
// import {ICameraScannerProps} from './types';
import {getWindowHeight, getWindowWidth, isIos} from './helpers';
import CollapsibleCard from '../components/CollapsibleCard';
// import {patientData} from '../Screen/patientData';

export const CameraScanner = ({setIsCameraShown, onReadCode, patientData}) => {
  // console.log(patient);
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const [isCameraInitialized, setIsCameraInitialized] = useState(isIos);
  const [isActive, setIsActive] = useState(isIos);
  const [flash, setFlash] = useState<'on' | 'off'>(isIos ? 'off' : 'on');
  const {appState} = useAppStateListener();
  const [codeScanned, setCodeScanned] = useState('');

  // console.log(patientData);
  const patient = patientData;
  // console.log(patient);

  useEffect(() => {
    if (codeScanned) {
      onReadCode(codeScanned);
    }
  }, [codeScanned, onReadCode]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isCameraInitialized) {
      timeout = setTimeout(() => {
        setIsActive(true);
        setFlash('off');
      }, 1000);
    }
    setIsActive(false);
    return () => {
      clearTimeout(timeout);
    };
  }, [isCameraInitialized]);

  const onInitialized = () => {
    setIsCameraInitialized(true);
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'upc-a'],
    onCodeScanned: codes => {
      if (codes.length > 0) {
        if (codes[0].value) {
          setIsActive(false);
          setTimeout(() => {
            setCodeScanned(codes[0]?.value);
          }, 500);
        }
      }
      return;
    },
  });

  const onCrossClick = () => {
    setIsCameraShown(false);
  };

  const onError = (error: CameraRuntimeError) => {
    Alert.alert('Error!', error.message);
  };

  if (device == null) {
    Alert.alert('Error!', 'Camera could not be started');
  }

  if (isFocused && device) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Modal presentationStyle="fullScreen" animationType="slide">
          <View style={[styles.cameraControls, {backgroundColor: undefined}]} />
          <View style={{zIndex: 1000}}>
            <CollapsibleCard
              imageUrl={patient?.imageUrl}
              caseId={patient?.caseId}
              name={patient?.name}
              surgery={patient?.surgery}
              duration={patient?.duration}
              children={undefined}
            />
          </View>
          <Camera
            torch={flash}
            onInitialized={onInitialized}
            ref={camera}
            onError={onError}
            photo={false}
            style={{
              // width: 100,
              // height: 300,
              ...styles.fullScreenCamera,
              flex: 1,
              // height: getWindowHeight() * 0.8,
              // marginTop: getWindowHeight() * 0.1,
              position: 'absolute',

              top: getWindowHeight() * 0.28,
              // left: getWindowWidth() * 0.1,
              // width: getWindowWidth() * 0.8,
              height: getWindowHeight() * 0.6,
            }}
            device={device}
            codeScanner={codeScanner}
            isActive={
              isActive &&
              isFocused &&
              appState === 'active' &&
              isCameraInitialized
            }
          />
          <RNHoleView
            holes={[
              {
                x: getWindowWidth() * 0.1,
                y: getWindowHeight() * 0.35,
                width: getWindowWidth() * 0.8,
                height: getWindowHeight() * 0.4,
                borderRadius: 10,
              },
            ]}
            style={[
              styles.rnholeView,
              styles.fullScreenCamera,
              // {marginTop: 50},
            ]}
          />
          <TouchableOpacity style={styles.crossButton} onPress={onCrossClick}>
            <Text style={styles.crossButtonText}>X</Text>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  camera: {
    width: '100%',
    height: 200,
  },
  fullScreenCamera: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: 100,
  },
  rnholeView: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cameraControls: {
    height: '10%',
    top: 15,
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    zIndex: 1000,
  },
  icon: {
    height: 45,
    width: 45,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossButton: {
    position: 'absolute',
    bottom: 20,
    left: '45%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 10,
    paddingLeft: 20,
    width: 50,
    height: 50,
    borderRadius: 99,
    zIndex: 1001,
  },
  crossButtonText: {
    fontSize: 20,
    color: 'red',
  },
});
