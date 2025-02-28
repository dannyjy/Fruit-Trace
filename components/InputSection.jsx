import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import React from 'react'

const InputData = () => {
  return (
    <View style={styles.main}>
      <Link href="/Results">
        <Text style={{fontSize: 15}}>Results</Text>
      </Link>
    </View>
  )
}

export default InputData

const styles = StyleSheet.create({
  main: {
    margin: 10,
    backgroundColor: "#1D1B14",
    borderRadius: 15,
    height: 710,
  }
})