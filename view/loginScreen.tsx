import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ViewComponent } from 'react-native';
import Buttom from '../components/Buttom';
import InputField from '../components/InputField';
import firebase from '../api/firebase';

export const LoginScreen = ({ navigation }: {navigation: any}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await firebase.auth().sigInWithEmailAndPassword(email, password);
            Alert.alert('Login exitoso', 'Has iniciado sesion correctamente');
        } catch (error) {
            Alert.alert('Error de login', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Iniciar sesion
            </Text>
            <InputField
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <InputField 
                placeholder="Contrasena"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Buttom title="Entrar" onPress={handleLogin}/>
            <Text style={styles.link} onPress={() => navigation.navigate('RegisterScreen')}>
                No tienes una cuenta? <Text style={styles.linkBold}>Registrate</Text>
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
