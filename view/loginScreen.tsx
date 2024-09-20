import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, ViewComponent } from 'react-native';
import Logo from '@/components/Logo';
import logoImage from '../assets/images/fast.png';
import backgroundImage from '../assets/images/background.png';
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

        <View>
            <View style={styles.header}>
                <Logo
                    logoSource={logoImage}
                    text="Fast Beauty"
                    containerStyle={{ margin: 20 }}
                />
                <View style={styles.welcomeContainer}>
                    <Image source={backgroundImage} style={styles.backgroundImage} />
                    <Text style={styles.textbienvenido}>¡Bienvenido de vuelta!</Text>
                </View>
                <Text style={styles.textHeader}>
                    Si eres nuevo registrate ahora mismo
                </Text>
                <ButtonTwo title="Registarse" onPress={() => navigation.navigate('RegisterScreen')} />
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
                <Text onPress={() => navigation.navigate('RegisterScreen')} style={styles.linkBold} >Olvido su contraseña?</Text>
                <ButtonOne title="Iniciar Sesión" onPress={handleLogin} />
            </View>
        </View>

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
        marginLeft: 10,
        flex: 1,
    },
    textHeader: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    backgroundImage: {
        width: 230,
        height: 230,
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
