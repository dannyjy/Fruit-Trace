import { StyleSheet, Text, View, Image } from 'react-native'
import icons from '@/constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const CardResults = ({navigation}) => {


  return (
    <SafeAreaView style={{backgroundColor: '#0E0D0A',flex: 1 ,alignItems:'center' , justifyContent:'center'}}>
      <View style={{flex:1,flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}>
        <Image source={icons.Wrong} style={{width:100 , height:100,marginBlock:5}}/>
        <Text style={{color:'white' , fontSize:20 , textAlign:'center'}}>Not Edible , This Fruit is not safe for your health</Text>
      </View>
    </SafeAreaView>
  )
}

export default CardResults