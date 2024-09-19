import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "./view/loginScreen";
import { RegisterScreen } from "./view/registerScreen";
import { ServiceScreen } from "./view/serviceScreen";
// import { service } from './api/service.js';
// import { serviceImage } from './api/serviceImage.js';
// import { branchOffice } from './api/branchOffice.js';
// import { branchImage } from './api/branchImage.js';



export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ServiceScreen: undefined;
  Perfil: { correo_usuario: string };
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }} initialRouteName='ServiceScreen'>

        <Stack.Screen
          name='LoginScreen'
          component={LoginScreen}
        />
        <Stack.Screen
          name='RegisterScreen'
          component={RegisterScreen}
        />

        <Stack.Screen
          name='ServiceScreen'
          component={ServiceScreen}
        />

      </Stack.Navigator>


    </NavigationContainer>
  )
}

export default App