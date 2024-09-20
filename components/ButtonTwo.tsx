import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonTwo = ({ title, onPress, color = '#050A24' }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 80,
    marginLeft: 80,
    marginTop: 10,
    marginBottom:20,
    borderWidth: 2,
    borderColor: '#ffc0cb',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ButtonTwo;
