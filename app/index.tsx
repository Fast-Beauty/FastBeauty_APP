import React from 'react';
import { SafeAreaView, StatusBar, Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import styleDetail from '../styles/styleHome';
import Icon from 'react-native-vector-icons/FontAwesome'; // Para los íconos

// Componentes de estilistas y servicios
interface Stylist {
  id: string;
  name: string;
  occupation: string;
  rating: number;
  image: any;
}

interface Service {
  id: string;
  name: string;
  image: any;
}

// Estilistas
const stylists: Stylist[] = [
  { id: '1', name: 'Miguel', occupation: 'Estilista', rating: 4.7, image: require('../assets/images/peluquero.jpg') },
  { id: '2', name: 'Isabella', occupation: 'Estilista', rating: 4.9, image: require('../assets/images/stylist-2.jpg') },
  { id: '3', name: 'Sara', occupation: 'Asesora de Imagen', rating: 4.7, image: require('../assets/images/stylist-3.jpg') },
];

// Servicios
const services: Service[] = [
  { id: '1', name: 'Hair', image: require('../assets/images/hair.png') },
  { id: '2', name: 'Body Spa', image: require('../assets/images/hot-stones.png') },
  { id: '3', name: 'Make Up', image: require('../assets/images/make-up.png') },
  { id: '4', name: 'Nail', image: require('../assets/images/beauty-salon.png') },
];

// Componente para la tarjeta de servicio
const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
  <TouchableOpacity style={styleDetail.serviceCard}>
    <Image source={service.image} style={styleDetail.serviceImage} />
    <Text style={styleDetail.serviceText}>{service.name}</Text>
  </TouchableOpacity>
);

// Componente para estilistas
const StylistCard: React.FC<{ stylist: Stylist }> = ({ stylist }) => (
  <View style={styleDetail.stylistCard}>
    <Image source={stylist.image} style={styleDetail.stylistImage} />
    <Text>{stylist.name}</Text>
    <Text>{stylist.occupation}</Text>
    
  </View>
);

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />

      {/* Header con ícono */}
      <View style={styleDetail.header}>
        <Text style={styleDetail.logoText}>Fast Beauty</Text>
        <Icon name="bell" size={24} color="white" />
      </View>

      {/* Imagen con borde curvo */}
      <View style={styleDetail.imageContainer}>
        <Image source={require('../assets/images/salon-de-belleza.jpeg')} style={styleDetail.styleImage} />
      </View>

      {/* Texto principal */}
      <Text style={styleDetail.mainText}>FastBeauty es más que belleza; es una experiencia que celebra tu autenticidad.</Text>

      {/* Servicios */}
      <View style={styleDetail.servicesContainer}>
        <Text style={styleDetail.title}>Favoritos</Text>
        <FlatList
          data={services}
          renderItem={({ item }) => <ServiceCard service={item} />}
          keyExtractor={item => item.id}
          horizontal
        />
      </View>

      {/* Especialistas */}
      <View style={styleDetail.specialistsContainer}>
        <Text style={styleDetail.title}>Especialista en Belleza</Text>
        <FlatList
          data={stylists}
          renderItem={({ item }) => <StylistCard stylist={item} />}
          keyExtractor={item => item.id}
          horizontal
        />
      </View>

      {/* Barra de navegación inferior */}
      <View style={styleDetail.bottomNav}>
        <Icon name="home" size={24} color="black" />
        <Icon name="shopping-bag" size={24} color="black" />
        <Icon name="user" size={24} color="black" />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
