import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {service} from '../api/service.js';

export default function Appointments() {
    const width = Dimensions.get('window').width;
    const data = [
        { url: 'https://cdn.pixabay.com/photo/2024/05/06/14/23/ai-generated-8743405_640.png', id: 1 },
        { url: 'https://cdn.pixabay.com/photo/2023/03/14/05/01/ai-generated-7851469_1280.jpg', id: 2 },
        { url: 'https://cdn.pixabay.com/photo/2023/01/19/15/32/squirrel-7729415_1280.jpg', id: 3 },
        { url: 'https://cdn.pixabay.com/photo/2022/12/12/12/58/dog-7651002_1280.jpg', id: 4 }
    ];
    const [services, setServices] = useState([]);
    const insets = useSafeAreaInsets();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await service();  // Llamar a la API
            setServices(data);  // Guardar los datos en el estado
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();  // Llamar a la función fetchData cuando el componente se monte
      }, []);

    const cita = {
        status: "Espera",
        date: `${selectedDate}`,
        hora: "",
        clients_id: 2,
        employees_id: `${selectedEmployee}`,
        services_id: `${selectedService}`
    }

    const handleService = (index) => {
        setSelectedService(index.id);
        console.log(index.id);
    } 
    const handleEmployee = (index) => {
        setSelectedEmployee(index.id);
        console.log(index.id);
    } 

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView>
                <Text style={styles.title}>Agenda tu cita</Text>
                <Text style={styles.subtitle}>Elige en servicio</Text>
                <Text></Text>
                <View style={{ marginBottom: 70 }}>
                    <Carousel
                        loop={true}
                        width={width}
                        height={width / 2}
                        autoPlay={false}
                        autoPlayInterval={3000}
                        data={data}
                        scrollAnimationDuration={1000}
                        onSnapToItem={(index) => console.log('current index:', index)}
                        renderItem={({ index }) => (
                            <TouchableOpacity style={{flex: 1}} onPress={() => handleService(data[index])}>
                                <Text>{data[index].id}</Text>
                                <View style={[styles.carouselItem]}>
                                    <Image
                                        source={{ uri: data[index].url }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                <Text style={styles.subtitle}>Elige tu estilista preferido</Text>
                <View style={{ marginBottom: 70 }}>
                    <Carousel
                        loop={true}
                        width={width}
                        height={width / 2}
                        autoPlay={false}
                        autoPlayInterval={3000}
                        data={data}
                        scrollAnimationDuration={1000}
                        onSnapToItem={(index) => console.log('current index:', index)}
                        renderItem={({ index }) => (
                            <TouchableOpacity style={{flex: 1}} onPress={() => handleEmployee(data[index])}>
                                <Text>{data[index].id}</Text>
                                <View style={styles.carouselItem}>
                                    <Image
                                        source={{ uri: data[index].url }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                <Text style={styles.subtitle}>Selecciona la fecha</Text>
                <View style={styles.container2}>
                    {/* Estado Disponible */}
                    <View style={styles.statusContainer}>
                        <View style={styles.availableCircle} />
                        <Text style={styles.statusText}>Disponible</Text>
                    </View>

                    {/* Estado No Disponible */}
                    <View style={styles.statusContainer}>
                        <View style={styles.unavailableCircle} />
                        <Text style={styles.statusText}>No disponible</Text>
                    </View>
                </View>
                {/* <Calendar
                    onDayPress={date => {
                        console.log('selected day', date);
                    }}
                    markedDates={{
                        [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                    }}
                /> */}

                <View style={{ alignItems: 'center' }}>
                    <Calendar
                        onDayPress={(day) => setSelectedDate(day.dateString)} // Se activa cuando se presiona una fecha
                        markedDates={{
                            [selectedDate]: { selected: true, selectedColor: '#2B2235' }, // Marca la fecha seleccionada
                        }}
                    />
                    <Text>Fecha seleccionada: {selectedDate}</Text>
                </View>

                <View style={{ alignItems: 'center', marginVertical: 30 }}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        console.log(cita);
                    }}>
                        <Text style={styles.buttonText}>AGENDAR</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    carouselItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'semibold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#2B2235',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#2B2235',
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    availableCircle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 5,
    },
    unavailableCircle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#FFC0CB',
        marginRight: 5,
    },
    statusText: {
        fontSize: 16,
        color: 'black',
    },
    button: {
        backgroundColor: '#FFC0CB',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%'
    },
    buttonText: {
        color: '#28292B',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

