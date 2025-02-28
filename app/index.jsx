import { Text, View, Image, StyleSheet, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import apple from "@/assets/images/fruit/apple.jpg";
import Card from '../components/ui/card'
import images from '@/constants/images';
import icons from "@/constants/icons";
import { Link } from "expo-router";
import { fruitData } from '../components/data';
import { name } from './../node_modules/eslint/lib/rules/utils/ast-utils';

const Index = () => {
  return (
    <SafeAreaView style={{width:'100%' , height:'100%' , backgroundColor:'black',paddingHorizontal: 15,paddingTop: 15}}>
      <View>
        <View style={style.second}>
          <Link href={'/history'} style={{color:'white' , backgroundColor:'white' , borderWidth:1,borderColor:'white',borderStyle:'solid' , borderRadius:20,padding:10}}>
            <Image source={icons.history} style={{width:30,height:30 , borderRadius:10}}/>
          </Link>
          <Image source={icons.logo} style={{width:50,height:50 }}/>
        </View>
        <View>
          <Text style={{color:'white' , fontSize:25 , fontWeight:'bold' , marginVertical:20}}>Welcome to Fruit Trace <Image source={icons.Hi} style={{width:30 , height:30}}/></Text>
          <Text style={{color:'gray' , fontSize:13}}>Eat What You Know And Stay Safe{'  '}:);</Text>
        </View>
        <View style={{marginVertical:20,flexDirection:'row' , alignItems:'center' , gap:20}}>
          <Link href={'/camera'} style={{color:'white' , backgroundColor:'white' , borderWidth:1,borderColor:'white',borderStyle:'solid' , borderRadius:20,padding:10}}><Image source={icons.camera} style={{width:30,height:30}}/></Link>
          <Link href={'/upload'} style={{color:'white' , backgroundColor:'white' , borderWidth:1,borderColor:'white',borderStyle:'solid' , borderRadius:20,padding:10}}><Image source={icons.upload} style={{width:30,height:30}}/></Link>
        </View>
      </View>
      <ScrollView style={{flex:1}}>
        <Text style={{fontSize:20 , color:'white' , fontWeight:'bold' , paddingHorizontal:5}}>Know More About Fruits{'  '}<Image source={icons.apple} style={{width:30,height:30, }}/></Text>
        {CardsArray}
      </ScrollView>
    </SafeAreaView>
  );
}


const CardsArray = fruitData.map((item) =>(
  <Card
    key={item.id}
    imageUrl={item.image}
    name={item.name}
    details={item.description}
  />
))

export default Index;


const style = StyleSheet.create({
  second: {
    padding: 10,
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyIcon:{
    width: 40,
    height: 40
  },
  AppName:{
    fontSize: 25,
  },
  sectionView:{
    height: '100%',
    padding: 15,
    borderRadius: 40,
    backgroundColor: "#ddd",
  },
})