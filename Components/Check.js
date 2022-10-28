import { useNavigation, useRoute} from '@react-navigation/native';
import React, { Component,useState,useCallback } from 'react'
import { Text ,View,Image, Button, TouchableOpacity,StyleSheet,Dimensions,ScrollView, ImageBackground, FlatList, Alert} from 'react-native'
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import Back from '../assets/back.png';
import {happy,sad} from '../songData'
import sadp from '../assets/sad.png'
import happyp from '../assets/happy.png'
import AudioListitem from './AudioListitem'


export default function Menu () {

    const navigation = useNavigation();
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;


    const route = useRoute();

    const FaceDetector = ()=>{
        if(route.params.face == 'happyFace'){
            return happy
        }
        else{
            return sad
        }
    }

    const sendPlayList =(item)=>{
        const SelectIndex = FaceDetector().findIndex(function(i){
            return i.title == item.title
          })
          console.log(SelectIndex);
        navigation.navigate('NewPlayer',{SelectIndex,AudioList :FaceDetector()})
    }

    
    function img(){
        if(route.params.face == 'sadFace'){
            
            return (
            <View style={{position: 'absolute',top:140}}>

                <Image source={sadp} style={styles.faceIconSad}></Image>
                
            </View>
            )
        }
        else{
            
            return (
                
            <View style={{position: 'absolute',top:100}}>
                <Image source={happyp} style={styles.faceIconHappy}></Image>
                <Image source={happyp} style={styles.faceIconHappy2}></Image>
            </View>
            )
        }
    }


    return (
        <View
        style= {{flex:1}}>

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
            <ImageBackground
            source={Back} 
            style={{flex:1,alignItems: 'center'}}>

            <TouchableOpacity  
            style={{width:90,height:20,position:'absolute',top:80,left:20}} 
            onPress={()=>{navigation.navigate("Menu")}}>
                <Text style={{color:'white'}}>ホームへ戻る</Text>
            </TouchableOpacity>
            
            {route.params.image ? <Image source={{ uri: route.params.image }} style={{width:161,height:161,borderRadius:400,marginTop:150}}/> : null}
            {img()}
                <Text style={styles.decoration}>あなたの表情のカテゴリー :{route.params.face}</Text>
                <View style={styles.box}>
                    <Text style={{
                        marginTop:30,
                        marginBottom:20,
                        fontSize:18,
                        color:'#707070',}}>あなたに合う曲</Text>
                        <FlatList
                        data={FaceDetector()}
                        renderItem={({item})=>(
                            <AudioListitem
                            title={item.title}
                            artist={item.artist}
                            img={item.imageSource}
                            sendAudioPress={()=> sendPlayList(item)}
                            
                            />
                          
                        )}
                        keyExtractor={(_,i) => i.toString()}
                        
                        />      
                    {/* <TouchableOpacity style={styles.rollTouch}>
                        <Text style={styles.rollText}>診断をやり直す</Text>
                        <Image source={Rollback} style={styles.rollback}></Image>
                    </TouchableOpacity> */}
                </View>
            </ImageBackground>
        </View>
    )
}   
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
   
    box:{
        width: width,
        height: height,
        backgroundColor: 'white',
        paddingTop:10,
        borderTopStartRadius:30,
        borderTopEndRadius:30,
        paddingLeft:30
    },
    faceImage:{
        flex:0.6,
        borderRadius:400,
        marginTop:120
    },
    decoration:{
        margin: 20,
        marginTop:16,
        color:'white',
        fontSize:16,
        fontWeight:'bold',
    },
    faceIconSad:{
        width:35,
        height:50,
        position: 'absolute',
        left:50,
        top:30
    },
    faceIconHappy:{
        width:60,
        height:55,
        position: 'absolute',
        left:30,
        top:30
    },
    faceIconHappy2:{
        width:60,
        height:55,
        position: 'absolute',
        top:160,
        right:30

    },
    image: {
        width:173,
        height:173,
        backgroundColor:'gray',
        margin:20
    },
    artist:{
        margin:5
    },
    touch:{
        width:170,
        height:40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'relative',
        margin:10
    },
    arrow:{
        width:13,
        height:16,
        position: 'absolute',
        right: 30
    },
    touchText:{
        color: 'white',
        fontSize:13,
        fontWeight:'500'
    },
    rollTouch:{
        width:170,
        height:40,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'white',
        borderColor:'#EF6DF4',
        borderWidth:2,
        borderRadius:22,
        paddingLeft:20,
        left:70,
        top:100
    },
    rollback:{
        width:22,
        height:22,
        position: 'absolute',
        right: 25
    }
    ,rollText:{
        color: '#EF6DF4',
        fontWeight:'400'
    }
})