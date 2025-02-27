import { Text, View, Image, StyleSheet,FlatList } from "react-native";
import { Animated } from "react-native";
import Card from '../components/ui/card'
import menu from '@/assets/images/favicon.png'
import { fruitData } from "@/components/data";
import InputData from "@/components/InputData";

export default function Index() {
  return (
    <View>
      <View style={{paddingHorizontal: 15}} >
        <View style={style.second}>
          <Image source={menu} style={style.historyIcon}/>
          <Text style={style.AppName}>FruitTrace</Text>
        </View>
        <InputData/>
      </View>
      <View style={style.sectionView}>
        <View>
          <Text style={{paddingTop: 18,fontSize: 25}}>Just Uploaded</Text>
          <Card 
          imageUrl="assets/images/fruit/kewe.jpg" 
          name="Kewe" 
          details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quo saepe sint, cum iure sequi dolores labore eos esse quisquam cupiditate repellendus reiciendis deserunt temporibus incidunt praesentium adipisci laboriosam beatae."
          />
        </View>
        <Text style={{paddingTop: 18,fontSize: 25}}>Exiting Data</Text>
        <FlatList
          data={fruitData}
          renderItem={({item}) =>(
            <Card
            name={item.name}
            details={item.description}
            imageUrl={item.image}
            />
          )}
          keyExtractor={(item) => item.id}
          />
      </View>
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