import { StyleSheet, Text, View, Image } from 'react-native'
import Apple from '@/assets/images/fruit/apple.jpg';
import Right from '@/assets/images/true.png'
import Wrong from '@/assets/images/wrong.png'
import ArrowName from '@/components/ui/Arrow&Name';

const CardResults = () => {

  const answer = false;

  const FruitAnswer = ({icon,text}) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center',gap: 10}}>
          <Image source={icon} style={{width: 30, height: 30}}/>
          <Text style={{fontSize: 25, fontWeight: 'bold', paddingVertical: 15,color: 'white'}}>{text}</Text>
        </View>
    )
  }
  const HealthStatus = !answer ? <FruitAnswer icon={Wrong} text="Not Edible"/> : <FruitAnswer icon={Right} text="Edible" /> ;

  return (
    <View style={{padding: 15,backgroundColor: '#0E0D0A',flex: 1}}>
      <ArrowName name="Results"/>
      {HealthStatus}
      <Image source={Apple} style={{borderRadius: 15,width: '100%',height: 250}}/>
      <View style={{paddingVertical: 20}}>
        <Text style={{fontSize: 30, fontWeight: 'bold', paddingBottom: 10,color: 'white'}}>Apple</Text>
        <Text style={{fontSize: 20,color: 'white'}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus officiis dolores vel dolorum distinctio qui molestiae animi eaque sapiente autem nihil, earum saepe laudantium accusamus natus. Saepe aliquam facilis accusantium?
        </Text>
      </View>
    </View>
  )
}

export default CardResults