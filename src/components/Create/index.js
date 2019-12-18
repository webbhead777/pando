import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Footer () {
  return (
    <View style={styles.container}>
      <Text>CREATE NEW</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 100
  },
})