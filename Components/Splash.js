import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Animated, Dimensions, Image, Text, View,ImageBackground ,StyleSheet} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-navigation';
import LottieView from 'lottie-react-native'
// Logo....
import Logo from '../assets/home.png';
import Home from './Home';
import Back from '../assets/back.png';
import Spotify from '../assets/spotify.png'

const BGColor = "#FCB934"
const height = Dimensions.get('window').height;

export default function Splash(){

    const navigation = useNavigation();

    return (
        <SafeAreaView style= {{flex:1}}>
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
            <ImageBackground source={Back} style={{flex:1,alignItems: 'center',marginTop:100}}>
                <Image source={Logo} style={styles.logo}></Image>
                <LottieView
                 source={require('../assets/line.json') } 
                 style={{width:80}} 
                 autoPlay 
                 loop={false}
                 onAnimationFinish={()=>navigation.navigate('Home')}
                 />
            </ImageBackground>
        </SafeAreaView>
    )
}
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    spotify: {
        width:100,
        height:30,
        marginTop:70
    },
    logo:{
        width:80,
        height:80,
        marginTop: 230
    }
})