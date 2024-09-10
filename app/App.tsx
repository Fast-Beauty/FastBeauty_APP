import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { View, Text} from 'react-native'






const App = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{
    //     headerShown:false
    //   }} initialRouteName='LoginScreen'>
    //     <Stack.Screen 
    //       name='LoginScreen' 
    //       component={LoginScreen} 
    //     />
    //     <Stack.Screen 
    //       name='Perfil' 
    //       component={PerfilScreen} 
    //     />
    //     <Stack.Screen 
    //       name='RegistroScreen' 
    //       component={RegistroScreen} 
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>

    <View >
        <Text>Hola Mundo</Text>
    </View>
  )
}

export default App