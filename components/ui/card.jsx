import axois from 'axios';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image,  } from 'react-native'
import grapFruit from '@/assets/images/fruit/graps.jpg'

const Card = ({imageUrl,name,details}) => {
    // const [data,setData] = useState();
    
    // useEffect(() =>{
    //     const url = "https://www.fruityvice.com/api/fruit/random";
    //     const fetchData = async () => {
    //         try{
    //             const response = await axois.get(url);
    //             setData(response.data)
    //         }catch(err){
    //             alert(err);
    //         }
    //     }
    //     fetchData()
    // },[])

  return (
    <View style={style.cardMain}>
        <Image source={imageUrl} style={style.image}></Image>
        <View style={style.lowerSection}>
            <Text style={style.titlefontSize}>{name}</Text>
            <Text style={style.description}>{details}</Text>
        </View>
    </View>
  )
}

export default Card


const style = StyleSheet.create({
    cardMain: {
        marginTop: 10,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: "#200000",
    },
    image:{
        width: "100%",
        height: 130
    },
    lowerSection:{
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    description:{
        color: 'white',
        fontSize: 18,
        paddingVertical: 20
    },
    titlefontSize:{
        fontSize: 30,
        color: 'white',
    }
})