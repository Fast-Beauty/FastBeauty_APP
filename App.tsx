import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "./view/loginScreen";
import { RegisterScreen } from "./view/registerScreen";
import { Appointments } from './view/appointmentsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';

import { HomeScreen } from './view/homeScreen';


//holaaa
export type RootStackParamList = {
  LoginScreen: undefined;
  RegistroScreen: undefined;
  Perfil: { correo_usuario: string };
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (

    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }} initialRouteName='LoginScreen'>
          <Stack.Screen
            name='LoginScreen'
            component={LoginScreen}
          />
          <Stack.Screen
            name='RegisterScreen'
            component={RegisterScreen}
          />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="appointmenstScreen" component={Appointments}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>


  )
}

// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center'
//   },

// });

export default App