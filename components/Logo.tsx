import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';


const Logo = ({ logoSource, text, textStyle, containerStyle }) => {
    const [fontsLoaded] = useFonts({
        Arima: require("../assets/fonts/Arima-Bold.ttf"),
    })
    if (!fontsLoaded) {
        // Puedes mostrar un componente de carga mientras se carga la fuente
        return <AppLoading />;
      }
    return (
        <View style={[styles.container, containerStyle]}>
            <Image source={logoSource} style={styles.logo} />
            <Text style={[styles.text, textStyle]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Alinea los elementos en una fila
        alignItems: 'center', // Centra verticalmente el logo y el texto
    },
    logo: {
        width: 50, // Ajusta el tamaño del logo
        height: 50,
        marginRight: 10, // Espacio entre el logo y el texto
    },
    text: {
        fontSize: 30, // Tamaño del texto
        fontFamily: "Arima",
        color: '#ffc0cb',
    },
});

export default Logo;
