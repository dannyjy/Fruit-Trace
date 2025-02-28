import axois from 'axios';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image,  } from 'react-native'


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
            <Text style={style.description}>Blueberries are a widely distributed and widespread group of perennial flowering plants with blue or purple berries. They are classified in the section Cyanococcus with the genus Vaccinium.[1] Commercial blueberries—both wild (lowbush) and cultivated (highbush)—are all native to North America. The highbush varieties were introduced into Europe during the 1930s.</Text>
        </View>
    </View>
  )
}

export default Card


const style = StyleSheet.create({
    cardMain: {
        height:300,
        textOverflow:'ellipsis',
        marginTop: 30,
        borderRadius: 20,
        overflow:'scroll',
        backgroundColor: "black",
        borderColor:'white',
        borderWidth:1,
        overflow:"hidden"
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
        color: '#777',
        fontSize: 13,
        paddingVertical: 20,
        overflow:"hidden"
    },
    titlefontSize:{
        color:'white',
        borderWidth:1,
        borderColor:'white',
        padding:5,
        borderRadius:15,
        width:90,
        textAlign:'center',
        fontWeight:'700'
    }
})