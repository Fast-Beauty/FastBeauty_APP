import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/ButtonOne';
import InputField from '../components/InputField';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';  // Importa el servicio de autenticación
import {initializeApp} from 'firebase/app';
import { firebaseConfig }from '../api/firebaseConfig';
export const RegisterScreen = ({ navigation }: {navigation : any}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleRegister =  () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('account created!')
        const user = userCredential.user;
        Alert.alert('Usuario creado con exito!')
        console.log(user)
      })
      .catch(error => {
        console.log(error)
        Alert.alert(error.message)
      })
  }

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

