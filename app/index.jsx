import { Text, View, Image, StyleSheet } from "react-native";
import history from '@/assets/images/history-svgrepo-com.png';
import InputSection from "@/components/InputSection";
import { Link } from "expo-router";


export default function Index() {
  return (
    <View style={{flex: 1,backgroundColor: '#0E0D0A'}}>
      <View style={style.second}>
        <Text style={style.AppName}>FruitTrace</Text>
        <Link href="/historyPage">
          <Image source={history} style={style.historyIcon}/>
        </Link>
      </View>
      <InputSection/>
    </View>
  );
}



const style = StyleSheet.create({
  second: {
    padding: 10,
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardStyle:{
    padding: 15,
    flexDirection: 'row',
    paddingHorizontal: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // backgroundColor: '#F5F5DC',
    backgroundColor: '#F3E5AB',
    justifyContent:'space-between'
  },
  historyIcon:{
    width: 50,
    height: 50
  },
  AppName:{
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  sectionView:{
    padding: 15,
    borderRadius: 40,
    backgroundColor: "#ddd",
  },
  textStyle:{
    paddingTop: 18,
    fontSize: 25,
    fontWeight: 'bold'
  }
})