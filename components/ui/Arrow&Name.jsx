import { Text, View, Image } from 'react-native'
import backHome from '@/assets/images/back-svgrepo-com (1).png'
import React from 'react'
import { Link } from 'expo-router'

const ArrowName = ({name}) => {
  return (
    <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingVertical: 20}}>
        <Link href="/" style={{paddingBottom: 10}}>
            <Image source={backHome} style={{ width: 40,height: 40}}/>
        </Link>
        <Text style={{fontSize: 20, fontWeight: 'bold',color: 'white'}}>{name}</Text>
    </View>
  )
}

export default ArrowName