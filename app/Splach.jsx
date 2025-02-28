import { StyleSheet, Text, View , Image} from 'react-native'
import icons from '@/constants/icons'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Splach = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={icons.logo} style={{width:100, height:100}}/>
    </SafeAreaView>
  )
}

export default Splach

const styles = StyleSheet.create({
    container : {
        flex:1,
        height:'100%',
        alignContent:'center',
        alignItems:'center',
        backgroundColor:'black'
    }
})