import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Crear el componente HomeScreen
export const HomeScreen = ({ navigation }: {navigation : any}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Inicio</Text>
      <Button
        title="Ir a la pantalla de detalles"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

// Crear el componente DetailsScreen
const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Detalles</Text>
    </View>
  );
};

// Crear el stack navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Estilos para las pantallas
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default App;
