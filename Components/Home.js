import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Animated, Dimensions, Image, ScrollView, View,Text, Button, TouchableOpacity,ImageBackground,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationEvents } from 'react-navigation';
import SignUp from './SignUp';
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-swiper';
import homeImage from '../assets/homeImage.png';
import homeImage2 from '../assets/homeImage2.png';
import Menu from './Menu';
import Back from '../assets/back.png';
import Spotify from '../assets/spotify.png'
// Post's....


export default function Home() {

    const navigation = useNavigation();
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const edges = useSafeAreaInsets();

    return (
        <Swiper showButttons={true} 
        dot = { 
            <View style={{backgroundColor:'white',width: 8,height:8,borderRadius:5,opacity:0.6,margin:5,marginBottom:150}}></View>
        }
            activeDot = {
                <View style={{backgroundColor:'white',width: 8,height:8,borderRadius:5,margin:5,marginBottom:150}}></View>
            }>
           
            <View style={{flex:1,justifyContent: 'center',}}>
            
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
                        <View style={{flex:1,justifyContent: 'center',paddingBottom:100,marginTop:100}}>
                            <Image source={homeImage} style={{width: 300, height: 295}}></Image>
                            <Text  style={
                            { color: '#FFFFFF',fontSize:16,textAlign: 'center',lineHeight:40,fontWeight: '500',marginBottom:30,marginTop:50}
                            }>フェイスミュージックはあなたの{"\n"}
                                表情に合う音楽を選定するアプです。{"\n"}
                                気分に合わせた音楽を聴いて盛り上がろう！</Text>
                        </View>
                    </ImageBackground>
            </View>
            
            <View style={{flex:1,
            justifyContent: 'center',
            }}> 
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
                        <View style={{flex:1,justifyContent: 'center',paddingBottom:100,alignItems: 'center',marginTop:100}}>
                            <Image source={homeImage2} style={{width: 300, height: 270}}></Image>
                                <Text  style={
                                { color: '#FFFFFF',fontSize:16,textAlign: 'center',lineHeight:40,fontWeight: '500',marginBottom:30,marginTop:50}
                                }>やり方は簡単！表情を撮影するだけ！{"\n"}
                                あなたの表情にあった音楽を選定します。{"\n"}
                                新たな音楽との出逢いがあるかも知れません。</Text>
                                {/* <Button title="はじめる" onPress={()=> navigation.navigate("SignUp")}></Button> */}
                                <TouchableOpacity style={{
                                position: 'absolute',
                                bottom: 100,
                                backgroundColor: 'white',
                                width:150,
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding:10,
                                borderRadius:6,
                                shadowOffset:{width: 1 ,height:1},
                                zIndex:999,
                                shadowOpacity:0.2,
                                shadowColor: "#000",
                                marginTop:60}} onPress={()=> navigation.navigate("Menu")}>
                                    <Text style={{fontSize:18,color: '#FF7CDB',fontWeight: 'bold'}}>はじめる</Text>
                                </TouchableOpacity>
                        </View>
                    </ImageBackground>
            </View>
        </Swiper>
    );
}
const styles = StyleSheet.create({
    spotify: {
        width:100,
        height:30,
        marginTop:70
    },
})