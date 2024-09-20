import { StyleSheet } from 'react-native';

const styleDetail = {
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#4A4A4A',
        marginTop: 30,
    },
    logoText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    imageContainer: {
        overflow: 'hidden',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    styleImage: {
        width: '100%',
        height: 200,
    },
    mainText: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 16,
        color: '#4A4A4A',
    },
    servicesContainer: {
        paddingHorizontal: 20,
    },
    serviceCard: {
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#f8f8f8',
    },
    serviceImage: {
        width: 50,
        height: 50,
    },
    serviceText: {
        marginTop: 10,
        fontSize: 14,
    },
    specialistsContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    stylistCard: {
        marginRight: 15,
        alignItems: 'center',
    },
    stylistImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#e0e0e0',
        marginTop:10,
    },
    calendario: {
        marginLeft: 50,
        marginRight:50,
    }
};

export default styleDetail;