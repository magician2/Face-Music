import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react'
import { Text ,View,Image, Button, TouchableOpacity,StyleSheet,Dimensions,ScrollView, ImageBackground} from 'react-native'
import { SafeAreaView } from 'react-navigation';
import helpIcon from '../assets/help.png';
import Camera from './Camera';
import { LinearGradient } from 'expo-linear-gradient';

import Back from '../assets/back.png';
import Png from '../assets/menuPng.png'
import tip from '../assets/tip.png'



export default function Menu (){

    const navigation = useNavigation();
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    return (
        <View style= {{flex:1}}>
             <LinearGradient
                start={{x: 0, y: 0.2}} end={{x: 0, y: 1}}
                // Background Linear Gradient
                colors={['#7979F2', '#FF76A1']}
                style={{position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height:height}}
            />
            <ImageBackground source={Back} style={{flex:1,alignItems: 'center'}}>
                <Text style={{marginTop:220,fontSize:24,fontWeight: 'bold',color: 'white',textAlign: 'center',marginBottom:40}}>今の気分に合わせて{"\n"}音楽を聞こう</Text>
                <Image source={Png} style={styles.Png}></Image>
                    <TouchableOpacity style={styles.start} onPress={()=> navigation.navigate("Camera")}>
                        <Text style={{color:'white',fontSize:20,margin:10}}>スタート</Text>
                        <Image source={tip}></Image>
                    </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}   
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    Png :{
        width:190,
        height:200,
    },
    start:{
        width:width * 0.8,
        height:73,
        backgroundColor:"#0E2D9360",
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 60,
        flexDirection: 'row',
    }
})