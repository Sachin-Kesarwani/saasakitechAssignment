// styles.js
import { StyleSheet } from 'react-native';

export const lightTheme = {
  backgroundColor: '#fff',
  textColor: '#000',
};

export const darkTheme = {
  backgroundColor: '#333',
  textColor: '#fff',
};

export const themestyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? darkTheme.backgroundColor : lightTheme.backgroundColor,
    },
    text: {
      color: isDarkMode ? darkTheme.textColor : lightTheme.textColor,
    },
  });
