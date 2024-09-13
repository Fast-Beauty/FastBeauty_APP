import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/Buttom';
import InputField from '../components/InputField';
import firebase from '../api/firebase';

export const RegisterScreen = ({ navigation }: {navigation : any}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Registro exitoso', 'Te has registrado correctamente');
    } catch (error) {
      Alert.alert('Error de registro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <InputField
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <InputField
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Registrarse" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.navigate('LoginScreen')}>
        ¿Ya tienes una cuenta? <Text style={styles.linkBold}>Inicia Sesión</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#666',
  },
  linkBold: {
    fontWeight: 'bold',
    color: '#3498db',
  },
});

