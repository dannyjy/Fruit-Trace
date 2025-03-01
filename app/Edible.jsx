import { View, Text , Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import React from 'react'

const Edible = ({navigation , route}) => {
  const {img} = route.params;
  console.log(img)
  return (
    <SafeAreaView style={{backgroundColor: '#0E0D0A',flex: 1 ,alignItems:'center' , justifyContent:'center'}}>
      <Image source={img} style={{width:30,height:30}}/>
        <View style={{flex:1,flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}>
            <Image source={icons.Right} style={{width:90 , height:90, marginBottom:10}}/>
            <Text style={{color:'white' , fontSize:20}}>Edible , It's Safe</Text>
        </View>
    </SafeAreaView>
  )
}

export default Edible