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
    const [serviceImage, setServiceImage] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [employeesImages, setEmployeesImages] = useState([]);
    const [serviceMerged, setServiceMerged] = useState([]);
    const [employeesMerged, setEmployeesMerged] = useState([]);

    useEffect(() => {

        const fetchService = async () => {
            try {
                const response = await fetch('http://localhost:8080/services/index');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setServices(data.services);
            } catch (error) {
                console.error(error.message);
            }
        };

        const fetchServiceImage = async () => {
            try {
                const response = await fetch('http://localhost:8080/servicesimages/index');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setServiceImage(data.services_images);
            } catch (error) {
                console.error(error.message);
            }
        }

        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:8080/employees/index');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEmployees(data.employees);
            } catch (error) {
                console.error(error.message);
            }
        };

        const fetchEmployeesImages = async () => {
            try {
                const response = await fetch('http://localhost:8080/employeesimages/index');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEmployeesImages(data.employees_images);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchService();
        fetchServiceImage();
        fetchEmployees();
        fetchEmployeesImages();
    }, []);

    useEffect(() => {
        const fetchMerge = () => {
            const merged = servicios.map(servicio => {
                const filter = serviceImage.filter(serviceIm => serviceIm.services_id === servicio.id);
        
                return {
                    ...servicio,
                    imagen: `data:image/jpeg;base64,${filter[0].imagen}`
                }
            });
            setServiceMerged(merged);
        }
        fetchMerge();
    }, [serviceImage]);
    
    useEffect(() => {
        const fetchMerge = () => {
            const merged = employees.map(employee => {
                const filter = employeesImages.filter(employeeIm => employeeIm.Employees_id === employee.id);
                return {
                    ...employee,
                    imagen: `data:image/jpeg;base64,${filter[0].imagen}`
                }
            });
            setEmployeesMerged(merged);
        }
        fetchMerge();
    }, [employeesImages]);


    const width = Dimensions.get('window').width;

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
            const response = await fetch('http://localhost:8080/appointments/create', {
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
                        data={serviceMerged}
                        mode='parallax'
                        scrollAnimationDuration={1000}
                        onSnapToItem={(index) => console.log('current index:', index)}
                        renderItem={({ index }) => (
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => handleService(serviceMerged[index])}>
                                <Text style={{ fontSize: 22, textAlign: 'center' }}>{serviceMerged[index].name}</Text>
                                <View style={[styles.carouselItem]}>
                                    <Image
                                        source={{uri: serviceMerged[index].imagen}}
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
                        data={employeesMerged}
                        mode='parallax'
                        scrollAnimationDuration={1000}
                        onSnapToItem={(index) => console.log('current index:', index)}
                        renderItem={({ index }) => (
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => handleEmployee(employeesMerged[index])}>
                                <Text style={{ fontSize: 22, textAlign: 'center' }}>{employeesMerged[index].name}</Text>
                                <View style={styles.carouselItem}>
                                    <Image
                                        source={{uri: employeesMerged[index].imagen}}
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

