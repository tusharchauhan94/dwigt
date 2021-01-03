import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';

import AntDesign from 'react-native-vector-icons/AntDesign';

const DateInput = ({titleValue, iconType, ...rest}) => {
  return (
    <TouchableOpacity  {...rest}>
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={25} color="#666" />
      </View>
        <Text style={styles.buttonText}>{titleValue}</Text>
    </View>
    </TouchableOpacity>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '98%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    padding: 10,
    //flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
