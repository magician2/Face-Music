import  React,{ useEffect, useRef, useState} from 'react';
import { Text, View, StyleSheet, Button ,Image,Dimensions,ImageBackground} from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation, useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons ,Entypo, MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Back from '../assets/back.png';




const convertTime = value => {
  
  var secondTime = parseInt(value);// 秒
  var minuteTime = 0;// 分
  var hourTime = 0;// 小时
  if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
      //获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      //获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60);
      //如果分钟大于60，将分钟转换成小时
      if(minuteTime > 60) {
          //获取小时，获取分钟除以60，得到整数小时
          hourTime = parseInt(minuteTime / 60);
          //获取小时后取佘的分，获取分钟除以60取佘的分
          minuteTime = parseInt(minuteTime % 60);
      }
  }

  var time =  '00 : ' + parseInt(secondTime);
  if(parseInt(secondTime) < 10){
    time = '00 : ' + '0' + parseInt(secondTime)
  }


  if(minuteTime > 0 && secondTime < 10) {
    time = "0" + parseInt(minuteTime) + " : 0" + parseInt(secondTime);
  }
  else if(minuteTime > 0){
    time = "0" + parseInt(minuteTime) + " : " + parseInt(secondTime);
  }
  if(hourTime > 0) {
    time = "" + parseInt(hourTime) + ":" + parseInt(secondTime);
  }
  return time;

        }
      
    



export default function NewPlayer() {

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const navigation = useNavigation()
const route = useRoute()
const SelectIndex = route.params.SelectIndex
const AudioList  = route.params.AudioList



const [currentIndex,setcurrentIndex] = useState(SelectIndex)
const [isPlaying,setisPlaying] = useState(true)
const [soundObj,setsoundObj] = useState(null)
const [playbackInstance,setPlaybackInstance] = useState(null)
const [volume,setVolume] = useState(1.0)
const [isBuffering,setIsBuffering] = useState(null)
const [duration,setDuration] = useState(null)
const [currentPosition,setCurrentPosition] = useState(null)
const [playbackPosition,setPlaybackPosition] = useState(null)

const sound = useRef(new Audio.Sound())
const currentRef = useRef(currentIndex)

currentRef.current = currentIndex



useEffect(() => {
  return loadAudio()
  
},[currentIndex])





  // const playSound = async () => {

  //   const status = {
  //     shouldPlay: isPlaying,
  //     value: currentIndex
  //    }
  //   const { sound: playbackObject } = await Audio.Sound.createAsync({uri:SelectAudio[currentIndex].uri},status);
  //    sound.current = playbackObject
     
  //   setsoundObj(status)
  // };
  const demo = ()=>{

       return AudioList[currentRef.current]

    }
  



  const  loadAudio= async () => {

		try {
			const playbackobj = await sound.current
      console.log('currentIndex',currentIndex);
			const source = {
				uri: demo().uri
			}
      console.log('uri:',demo().uri);
			const status = {
				shouldPlay: isPlaying,
				volume: volume,
			}
      
			playbackobj.setOnPlaybackStatusUpdate((status) => {onPlaybackStatusUpdate(status)});
      
			const data = await playbackobj.loadAsync(source, status, true)

      console.log(data);
      setPlaybackInstance()
      setsoundObj(playbackobj)
      setIsBuffering(data.isBuffering)
      console.log('Load RefC: ',currentRef.current);
      console.log('play Success');
      setPlaybackInstance(playbackobj)


		} catch (e) {
			console.log(e)
		}
		
	}

const onPlaybackStatusUpdate = (status) => {
  setIsBuffering(status.isLoaded)
  setsoundObj(status)
  if(status.isPlaying ) {
    setDuration(status.durationMillis)
    setPlaybackPosition(status.positionMillis)
    setsoundObj(status)
  }
}
console.log(playbackPosition,duration);
	const 	calculateSeedBar = () =>{

		if(playbackPosition !== null && duration !== null){
			return playbackPosition / duration
		}
		return 0 
	}

	const renderCurrentTime = () =>{
    
		return convertTime(playbackPosition / 1000)
		
	}

  const moveAudio =  ( value) => {
		try {
		  const data =  sound.current.setPositionAsync(Math.floor(duration * value))
    setPlaybackPosition(soundObj.positionMillis);
		setsoundObj(data)
		sound.current.playAsync()
    setisPlaying(!isPlaying)
		} catch (error) {
		console.log('error inside onSlidingComplete callback', error);
		}
	};


	const handlePlayPause =  () => {

    if(isBuffering == true){
    
		isPlaying ?  sound.current.pauseAsync() :  sound.current.playAsync()
		setisPlaying(!isPlaying)
	}
   }

 	const handlePreviousTrack= ()=> {

		if (sound.current !== null)  {
      sound.current.unloadAsync()
      setcurrentIndex(currentIndex === 0 ? AudioList.length -1 : currentIndex-1)
     console.log('back');
     loadAudio()

		}
		
	}

  const handleNextTrack = async () => {
		if (currentIndex == 0 || isBuffering == true) {
      sound.current.unloadAsync()
      
			console.log('next');
      setcurrentIndex(currentIndex+1 > AudioList.length - 1 ? 0 : currentIndex+1 )
      loadAudio()
      console.log('Next  : ',currentIndex);
		}
	}


const img = demo().imageSource




return (
  <View
  style= {{flex:1,}}>

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


    <View style={styles.container}>

    <View key="{item}" style={styles.playerBox}>
            {img ? <Image source={{uri: img}} style={styles.playerImage}/> : null}
            <Text style={styles.playerTitle}>{demo().title}</Text>
            <Text style={styles.playerArtist}>{demo().artist}</Text>
        </View>




      <View style={styles.seekBar}>
          
            <Slider
            style={{width: '90%',height: 20}}
            minimumValue={0}
            maximumValue={1}
            value={calculateSeedBar()}
            // onValueChange ={value =>{
            //   const dd = convertTime(value * duration / 1000)
            //   setCurrentPosition(dd)
            // }}
            onSlidingStart = {
              async ()=>{
                if(!isPlaying) return

                try{
                  await handlePlayPause()
                }
                catch(e){'error with onslidingStart',e}
              }
            }
            onSlidingComplete = {async (value) =>
              await moveAudio(value)
            }

            />
          <View style={{flexDirection:'row',justifyContent: 'space-between',width:'90%',marginTop:10}}>
          <Text>{convertTime(playbackPosition/1000)}</Text>

            <Text>{convertTime(duration/1000)}</Text>
          </View>
      </View>



      <View style={styles.controls}>
      <TouchableOpacity style={styles.control} onPress={()=>handlePreviousTrack()}>
      <AntDesign name="stepbackward" size={40} color="gray" />
            </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={()=>handlePlayPause()}>
              {isPlaying ? (
                <Ionicons name='ios-pause' size={60} color='gray' />
              ) : (
                <Ionicons name='ios-play-circle' size={60} color='gray' />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.control} onPress={()=>handleNextTrack()}>
            <AntDesign name="stepforward" size={40} color="gray" />
            </TouchableOpacity>
      </View>



    </View>
    </ImageBackground>
    </View>
)
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const styles = StyleSheet.create({
container: {
  width: width,
  height: height,
  backgroundColor: 'white',
  marginTop:150,
  paddingTop:40,
  borderTopStartRadius:30,
  borderTopEndRadius:30
},
playerBox:{
  width:'100%',
  height:400,
 alignItems: 'center',
},
playerImage:{
  width:300, 
  height:300,
  marginBottom:20
},
playerTitle:{
  fontSize:30,
  margin:10
},
control:{
  margin:20
},
controls:{
  flexDirection: 'row',
  justifyContent: 'center',
  width:width,
},
seekBar:{
  alignItems: 'center',
  width:'100%',
}
})