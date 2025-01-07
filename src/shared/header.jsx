import React from 'react'
import { Text, View , StyleSheet } from 'react-native'

const Header = () => {
  return (
   <View style={styles.container}>
    <Text>Header of page</Text>
   </View>
  )
}

export default Header
const styles = StyleSheet.create({
  container: {
    backgroundColor:"red"
  },
});