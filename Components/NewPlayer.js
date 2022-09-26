import  React,{ useEffect, useRef, useState} from 'react';
import { Text, View, StyleSheet, Button ,Image,Dimensions,ImageBackground} from 'react-native';
import { Audio } from 'expo-av';
import { useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons ,Entypo, MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Back from '../assets/back.png';




const convertTime = minutes => {
  if (minutes) {
    const hrs = minutes / 60;
    const minute = hrs.toString().split('.')[0];
    const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
    const sec = Math.ceil((60 * percent) / 100);
    if (parseInt(minute) < 10 && sec < 10) {
      return `0${minute}:0${sec}`;
    }

    if (sec == 60) {
      return `${minute + 1}:00`;
    }

    if (parseInt(minute) < 10) {
      return `0${minute}:${sec}`;
    }

    if (sec < 10) {
      return `${minute}:0${sec}`;
    }

    return `${minute}:${sec}`;
  }
};






export default function NewPlayer() {

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const route = useRoute()
const SelectAudio = route.params.SelectAudio
const AudioList  = route.params.AudioList

//選択されたデータとsongDataと合わせる  (しかしそれだと本来songDataの中に入っていたデータと重ねるものがある)
const newData = SelectAudio.concat(AudioList)

//重なったデータをspliceで抽出する　ーーーそうすると中には選択されたデータが消える
newData.map((val,i)=>{
  if(val === SelectAudio[0]){
    newData.splice(i,2)
  }
})

//最後また抽出されたデータと　選択されたデータを合わせて新たなListとして利用する
const plus = SelectAudio.concat(newData)


const [currentIndex,setcurrentIndex] = useState(0)
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

			const source = {
				uri: demo().uri
			}
      console.log(demo().uri);
			const status = {
				shouldPlay: isPlaying,
				volume: volume,
			}
     
			playbackobj.setOnPlaybackStatusUpdate((status) => {onPlaybackStatusUpdate(status)});
      
			const data = await playbackobj.loadAsync(source, status, false)
      setPlaybackInstance()
      setsoundObj(data)
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
  <SafeAreaView
  style= {{flex:1,backgroundColor: 'white'}}>

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
    <TouchableOpacity style={{marginBottom:20,marginLeft:30,}}>
      <Text style={{fontSize: 15,color: '#727272',fontWeight: 'bold'}}>閉じる</Text>
    </TouchableOpacity>
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
            onValueChange ={value =>{
              const dd = convertTime(value * duration / 1000)
              setCurrentPosition(dd)
            }}
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
            <Text>{convertTime(duration/1000)}</Text>
            <Text>{convertTime(playbackPosition/1000)}</Text>
          </View>
      </View>



      <View style={styles.controls}>
      <TouchableOpacity style={styles.control} onPress={()=>handlePreviousTrack()}>
                <Text>Back</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={()=>handlePlayPause()}>
              {isPlaying ? (
                <Ionicons name='ios-pause' size={60} color='#111' />
              ) : (
                <Ionicons name='ios-play-circle' size={60} color='#111' />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.control} onPress={()=>handleNextTrack()}>
                <Text>Next</Text>
            </TouchableOpacity>
      </View>



    </View>
    </ImageBackground>
    </SafeAreaView>
)
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const styles = StyleSheet.create({
container: {
  width: width,
  height: height,
  backgroundColor: 'white',
  marginTop:70,
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