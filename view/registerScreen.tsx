import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import Button from '../components/ButtonOne';
import Logo from '@/components/Logo';
import logoImage from '../assets/images/fast.png';
import bacRegister from '../assets/images/bacregister.png';
import InputField from '../components/InputField';
import ButtonOne from '../components/ButtonOne';
import ButtonTwo from '../components/ButtonTwo';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';  // Importa el servicio de autenticación
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../api/firebaseConfig';
export const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleRegister = () => {
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
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Logo
          logoSource={logoImage}
          text="Fast Beauty"
          containerStyle={{ margin: 20 }}
        />
        <View style={styles.welcomeContainer}>
          <Image source={bacRegister} style={styles.backgroundImage} />
          <Text style={styles.textbienvenido}>Tu espacio personal te espera</Text>
        </View>
        <Text style={styles.textHeader}>
          Si ya tienes una cuneta, inicia Sesión
        </Text>
        <ButtonTwo title="Iniciar Sesión" onPress={() => navigation.navigate('LoginScreen')} />
      </View>
      <View style={styles.body}>
        <Text style={styles.textbody} >Email</Text>
        <InputField
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={styles.textbody}>Contraseña</Text>
        <InputField
          placeholder="Contrasena"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <ButtonOne title="Registrarse" onPress={handleRegister} />
      </View>
    </ScrollView>
    // <View style={styles.container}>
    //   <Text style={styles.title}>Registro</Text>
    //   <InputField
    //     placeholder="Correo Electrónico"
    //     value={email}
    //     onChangeText={setEmail}
    //     keyboardType="email-address"
    //   />
    //   <InputField
    //     placeholder="Contraseña"
    //     value={password}
    //     onChangeText={setPassword}
    //     secureTextEntry
    //   />
    //   <Button title="Registrarse" onPress={handleRegister} />
    //   <Text style={styles.link} onPress={() => navigation.navigate('LoginScreen')}>
    //     ¿Ya tienes una cuenta? <Text style={styles.linkBold}>Inicia Sesión</Text>
    //   </Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    backgroundColor: '#050A24',

  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginBottom: 20,
  },
  textbienvenido: {
    color: '#ffc0cb',
    fontSize: 25,
    marginLeft: 30,
    flex: 1,
  },
  textHeader: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  backgroundImage: {
    width: 210,
    height: 210,
  },
  body: {
    justifyContent: 'center', // Centra verticalmente
    padding: 20, // Espaciado alrededor del contenido
    backgroundColor: '#f0f4f7',
  },
  textbody: {
    margin: 5,
    fontSize: 20,
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
    color: '#ffc0cb',
    fontSize: 16,
  },
});

