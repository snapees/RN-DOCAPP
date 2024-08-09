/* eslint-disable react/no-unstable-nested-components */
import {Button, StatusBar} from 'react-native';
import React from 'react';
import Screen1 from './Screen/Screen1';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PatientDetails from './Screen/PatientDetails/PatientDetails';
import InactivePatientDetails from './Screen/PatientDetails/InactivePatientDetails';
import CompletedPatientDetails from './Screen/PatientDetails/CompletedPatientDetails';
import {COLORS} from './constants/Colors';
import ScanIcon from './Screen/ScanIcon';
import {CameraScanner} from './cameraComponents/CameraScanners';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.PRIMARY_LIGHT} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.PRIMARY_LIGHT,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
        initialRouteName="Home">
        <Stack.Group>
          <Stack.Screen
            name="Welcome"
            component={Screen1}
            options={{
              headerRight: () => (
                <Button
                  onPress={() => console.log('This is alert buttn')}
                  title="Info"
                  color="#000"
                />
              ),
            }}
          />
          <Stack.Screen
            name="PatientDetails"
            component={PatientDetails}
            options={{
              headerTitle: 'Active Patient Dashboard',
              headerStyle: {
                backgroundColor: COLORS.SUCCESS,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="InactivePatientDetails"
            component={InactivePatientDetails}
            options={{
              headerTitle: 'Activate New Cases',
              headerStyle: {
                backgroundColor: COLORS.ERROR_LIGHT,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="CompletedPatientDetails"
            component={CompletedPatientDetails}
            options={{
              headerTitle: 'Completed Patient Details',
              headerStyle: {
                backgroundColor: COLORS.PRIMARY,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen name="Camera" component={CameraScanner} />
        </Stack.Group>
        {/* <Text>Home Screen</Text> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
