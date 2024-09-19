import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ViewComponent } from 'react-native';
import Logo from '@/components/Logo';
import logoImage from '../assets/images/fast.png';
import InputField from '../components/InputField';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';  // Importa el servicio de autenticación
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../api/firebaseConfig';
import ButtonOne from '../components/ButtonOne';
import ButtonTwo from '../components/ButtonTwo';

export const LoginScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            // Alert.alert('Login exitoso', 'Has iniciado sesion correctamente');
            // navigation.navigate('HomeScreen');
            .then((userCredential) => {
                console.log('signed in!')
                const user = userCredential.user;
                console.log(user)
                Alert.alert('Login exitoso')
                navigation.navigate('HomeScreen')
            })
            .catch(error => {
                console.log(error)
                Alert.alert(error.message)
            })
    };

    return (
        
        <View style={styles.container}>
            <View style={styles.header}>
            <Logo 
                logoSource={logoImage} 
                text="Fast Beauty" 
                textStyle={{ fontSize: 20, color: 'blue' }} 
                // containerStyle={{ margin: 20 }} 
            />
            </View>
            <Text>
                Si eres nuevo registrate ahora mismo 
            </Text>
            <ButtonTwo title="Registarse" onPress={() => navigation.navigate('RegisterScreen')} />
            <Text >Email</Text>
            <InputField
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <Text >Contrasena</Text>
            <InputField
                placeholder="Contrasena"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Text onPress={() => navigation.navigate('RegisterScreen')} style={styles.linkBold} >Olvido su contrasena?</Text>
            <ButtonOne title="Iniciar Sesion" onPress={handleLogin} />
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
        color: '#ffc0cb',
    },
});
