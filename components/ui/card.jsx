import { View, Text, StyleSheet, Image,  } from 'react-native'

const Card = ({imageUrl,name,details}) => {
    
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
        fontSize: 18,
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