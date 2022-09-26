import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View,Dimensions, Image, TextInput, Touchable, TouchableOpacity} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Menu from './Menu';
import { LinearGradient } from 'expo-linear-gradient';


import home from '../assets/home.png';
export default function SignUp  (){
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const halfHeight = Dimensions.get('window').height / 2 - 50;
    const navigation = useNavigation();

    const [user,userName] = useState('');
    const [pass,passWord] = useState('');


    return (
        <SafeAreaView style={{height:height,flexDirection:'column',alignItems:'center'}}>

        <LinearGradient
                // Background Linear Gradient
                colors={['#A167FF', '#FF7CDB']}
                style={{position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height:height / 2 }}
            />

        <View style={{width: width,
            alignItems:'center',
            justifyContent: 'center',
            position:'absolute',
            top: height / 6
             }}>


            <Image source={home} style={{width:60 ,height:60}}></Image>


            <Text style={{fontSize: 20,fontWeight:'800'
            ,color:'white',letterSpacing:2}}>
                SIGN IN</Text>

        </View>


        <View style={{alignItems:'center',
        justifyContent: 'center'}}>


            <View
            style ={{backgroundColor: '#FFFFFF',
            width: width - 40,
            height:halfHeight+90,
            borderRadius:20,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: height / 4,
            zIndex:999,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 12,
            },
            shadowOpacity: 0.2,
            shadowRadius: 16.00,
            elevation: 24,
            }}>



                <TextInput style={styles.inputbox} placeholder='Name' onChangeText={(val)=> userName(val)}></TextInput>
                <TextInput style={styles.inputbox}  secureTextEntry={true} placeholder='Password' onChangeText={(val)=> passWord(val) }></TextInput>
                {/* <TouchableOpacity style={styles.Signbtn} onPress={()=> navigation.navigate("Menu")}> */}
                    
                    {/* <Text style={{letterSpacing:1,color:'white',fontWeight:'bold',fontSize:15}}>SIGN IN</Text> */}
                {/* </TouchableOpacity> */}
                

                                <TouchableOpacity onPress={() => navigation.navigate("Menu")} style={styles.Signbtn}>
                <LinearGradient start={[0, 0.5]}
                                end={[1, 0.5]}
                                colors={['#A167FF', '#FF7CDB']}
                                style={{borderRadius: 5}}>
                    <Text style={styles.visit}>Login</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>

        </View>

    </SafeAreaView> 
    )
   
  }
  const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    inputbox: {
        width: width - 90,
        height: 45,
        borderWidth:1,
        borderColor: '#D1D1D1',
        borderRadius: 20,
        padding:10,
        margin:15
    }
    ,Signbtn: {
        width: width - 90,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 100,
    }
})