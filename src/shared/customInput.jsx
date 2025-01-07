import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from './icon';
import { themestyles } from '../theme';

const CustomInput = ({ placeholder, value, onChangeText , isDarkMode }) => {
    const theme = themestyles(isDarkMode);
  return (
    <View style={[styles.inputContainer , theme.container , theme.text]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
      />
      {value ? (
        <TouchableOpacity style={styles.clearButton} onPress={() => onChangeText('')}>
          <Icon iconType="close" size={20} color="#aaa" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row', // Align the text input and icon horizontally
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },
  input: {
    flex: 1, // Take up the remaining space
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    borderRadius: 10,
  },
  clearButton: {
    padding: 10, // Add padding to make it easier to tap
  },
});

export default CustomInput;
