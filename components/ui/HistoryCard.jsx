import { StyleSheet, Text, View, Image } from 'react-native'
import icons from '@/constants/icons'
import React from 'react'

const HistoryCard = ({historyName}) => {
  return (
    <View style={styles.main}>
      <Text style={{fontSize: 20,color: 'white',fontWeight: 'bold'}}>{historyName}</Text>
      <Image source={icons.CloseIcon} style={{width: 25,height: 25}}/>
    </View>
  )
}

export default HistoryCard

const styles = StyleSheet.create({
    main:{
        padding: 15,
        width: '100%',
        display: 'flex',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#1D1B14",
        justifyContent: 'space-between',
    }
})