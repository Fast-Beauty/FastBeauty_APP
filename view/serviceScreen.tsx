
import { View, Image, Text, Alert } from "react-native";
import React from "react";
import { service } from '../api/service';

const servicios = service();
console.log(servicios);
Alert.alert(servicios);

export const ServiceScreen = ({ navigation }: { navigation: any }) => {
    return (
        <View>
            {/* <Image
                source={require('../assets/images/services/keratina.jpg')}
                style={{
                    width: 100,
                    height: 100,
                }}
            />
            <Text onPress={() => navigation.navigate('RegisterScreen')}>Registrate</Text> */}
        </View>
    )
}

