import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Appointments() {
    const width = Dimensions.get('window').width;
    const images = [
        'https://cdn.pixabay.com/photo/2024/05/06/14/23/ai-generated-8743405_640.png',
        'https://cdn.pixabay.com/photo/2023/03/14/05/01/ai-generated-7851469_1280.jpg',
        'https://cdn.pixabay.com/photo/2023/01/19/15/32/squirrel-7729415_1280.jpg',
        'https://cdn.pixabay.com/photo/2022/12/12/12/58/dog-7651002_1280.jpg'
    ];
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView>
                <Text>Dentro de la vista citas</Text>

                <Carousel
                    loop={true}
                    width={width}
                    height={width / 2}
                    autoPlay={false}
                    autoPlayInterval={3000}
                    data={images}
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => console.log('current index:', index)}
                    renderItem={({ index }) => (
                        <View style={styles.carouselItem}>
                            <Image
                                source={{ uri: images[index] }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </View>
                    )}
                />

                <Carousel
                    loop={true}
                    width={width}
                    height={width / 2}
                    autoPlay={false}
                    autoPlayInterval={3000}
                    data={images}
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => console.log('current index:', index)}
                    renderItem={({ index }) => (
                        <View style={styles.carouselItem}>
                            <Image
                                source={{ uri: images[index] }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </View>
                    )}
                />

                <Calendar
                    onDayPress={date => {
                        console.log('selected day', date);
                    }}
                />
                <Calendar
                    onDayPress={date => {
                        console.log('selected day', date);
                    }}
                />
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
    }
});
