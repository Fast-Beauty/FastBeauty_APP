import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


const Logo = ({ logoSource, text, textStyle, containerStyle }) => {
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
        width: 40, // Ajusta el tamaño del logo
        height: 40,
        marginRight: 10, // Espacio entre el logo y el texto
    },
    text: {
        fontSize: 18, // Tamaño del texto
        color: 'black', // Color del texto
    },
});

export default Logo;
