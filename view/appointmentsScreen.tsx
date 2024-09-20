import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { service } from '../api/service.js';

export const Appointments = ({ navigation }) => {

    const [selectedTime, setSelectedTime] = useState(null);

    const times = ['7:00', '8:30', '10:00', '11:30', '14:00', '15:30', '17:00', '18:30', '20:00'];

    const handlePress = (time) => {
        setSelectedTime(time);
    };

    const [servicios, setServices] = useState([]);
    const [employees, setEmployees] = useState([]);

    const fetchService = async () => {
        try {
            const response = await fetch('https://apiappfastbeauty-default-rtdb.firebaseio.com/services.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error(error.message);
        }
    };
    const fetchEmployees = async () => {
        try {
            const response = await fetch('https://apiappfastbeauty-default-rtdb.firebaseio.com/employees.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error(error.message);
        }
    };


    const width = Dimensions.get('window').width;

    const imagesService = {
        "service-cejas": require('../assets/images/services/service-cejas.jpg'),
        "service-corte": require('../assets/images/services/service-corte.jpg'),
        "service-depilacion": require('../assets/images/services/service-depilacion.jpg'),
        "service-manicure": require('../assets/images/services/service-manicure.jpg'),
        "service-maquillaje": require('../assets/images/services/service-maquillaje.jpg'),
        "service-masaje": require('../assets/images/services/service-masaje.jpg'),
        "service-tinturado": require('../assets/images/services/service-tinturado.jpg'),
    };
    const imagesEmployees = {
        "estilista-1": require('../assets/images/employees/estilista-1.jpg'),
        "estilista-2": require('../assets/images/employees/estilista-2.jpg'),
        "estilista-3": require('../assets/images/employees/estilista-3.jpg'),
        "estilista-4": require('../assets/images/employees/estilista-4.jpg'),
        "estilista-5": require('../assets/images/employees/estilista-5.jpg'),
    };
    // const servicios = [
    //     { url: require('../assets/images/services/service-cejas.jpg'), id: 1, name: 'Cejas' },
    //     { url: require('../assets/images/services/service-corte.jpg'), id: 2, name: 'Corte' },
    //     { url: require('../assets/images/services/service-depilacion.jpg'), id: 3, name: 'Depilación' },
    //     { url: require('../assets/images/services/service-manicure.jpg'), id: 4, name: 'Manicure' },
    //     { url: require('../assets/images/services/service-maquillaje.jpg'), id: 5, name: 'Maquillaje' },
    //     { url: require('../assets/images/services/service-masaje.jpg'), id: 6, name: 'Masaje' },
    //     { url: require('../assets/images/services/service-tinturado.jpg'), id: 7, name: 'Tinturado' },
    // ];
    // const employees = [
    //     { url: require('../assets/images/employees/estilista-1.jpg'), id: 1, name: 'Estilista 1' },
    //     { url: require('../assets/images/employees/estilista-2.jpg'), id: 2, name: 'Estilista 2' },
    //     { url: require('../assets/images/employees/estilista-3.jpg'), id: 3, name: 'Estilista 3' },
    //     { url: require('../assets/images/employees/estilista-4.jpg'), id: 4, name: 'Estilista 4' },
    //     { url: require('../assets/images/employees/estilista-5.jpg'), id: 5, name: 'Estilista 5' },
    // ];

    const insets = useSafeAreaInsets();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');

    const cita = {
        status: "Espera",
        date: `${selectedDate}`,
        hora: `${selectedTime}`,
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

    const handleSend = async (cita) => {
        if(!Object.values(cita).every(cita => cita != '')) {
            Alert.alert('Debe seleccionar todas las opciones');
            return;
        }
        try {
            const response = await fetch('https://apiappfastbeauty-default-rtdb.firebaseio.com/appointments.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cita),
            });

            if (!response.ok) {
                throw new Error('Error al crear la cita');
            }

            const data = await response.json();
            Alert.alert('Cita creada exitosamente');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchService();
        fetchEmployees();
    }, []);


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
                        data={servicios}
                        mode='parallax'
                        scrollAnimationDuration={1000}
                        onSnapToItem={(index) => console.log('current index:', index)}
                        renderItem={({ index }) => (
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => handleService(servicios[index])}>
                                <Text style={{ fontSize: 22, textAlign: 'center' }}>{servicios[index].name}</Text>
                                <View style={[styles.carouselItem]}>
                                    <Image
                                        source={imagesService[servicios[index].url]}
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
                        height={width * 1.5}
                        autoPlay={false}
                        autoPlayInterval={3000}
                        data={employees}
                        mode='parallax'
                        scrollAnimationDuration={1000}
                        onSnapToItem={(index) => console.log('current index:', index)}
                        renderItem={({ index }) => (
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => handleEmployee(employees[index])}>
                                <Text style={{ fontSize: 22, textAlign: 'center' }}>{employees[index].name}</Text>
                                <View style={styles.carouselItem}>
                                    <Image
                                        source={imagesEmployees[employees[index].url]}
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

                <View style={{ alignItems: 'center' }}>
                    <Calendar
                        onDayPress={(day) => setSelectedDate(day.dateString)}
                        markedDates={{
                            [selectedDate]: { selected: true, selectedColor: '#2B2235' },
                        }}
                    />
                </View>

                <Text style={styles.subtitle}>Selecciona la hora</Text>
                <View style={[styles.container3, { width: '95%', alignSelf: 'center' }]}>
                    {times.map((time, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handlePress(time)}
                            style={[
                                styles.timeButton,
                                selectedTime === time && styles.selectedTimeButton
                            ]}
                        >
                            <Text style={selectedTime === time ? styles.selectedTimeText : styles.timeText}>
                                {time}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ alignItems: 'center', marginVertical: 30 }}>
                    <TouchableOpacity style={styles.button} onPress={() => handleSend(cita)}>
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
        marginTop: 20,
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
    container3: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        padding: 20,
    },
    timeButton: {
        backgroundColor: '#d1d1d1',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        margin: 10,
    },
    selectedTimeButton: {
        backgroundColor: '#2C233D',
    },
    timeText: {
        color: '#000',
    },
    selectedTimeText: {
        color: '#FFF',
    },
});

