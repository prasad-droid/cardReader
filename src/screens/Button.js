import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Button = ({text, icon, onPress, style}) => {
  return (
    <TouchableOpacity style={style ? style : styles.btn} onPress={onPress}>
      <Icon name={icon} size={20} color="white" />
      <Text style={[{color: 'white', marginLeft: 5},style]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    margin: 5,
  },
});
