import React from 'react'
import { StyleSheet, 
	TouchableOpacity,
	 View, 
	 Image, 
	 Text ,
	 Animated,
	 Easing,
	 PanResponder,
	 
	} from 'react-native'
import { Ionicons ,Entypo, MaterialIcons } from '@expo/vector-icons'
import { Audio } from 'expo-av'
import sleep from './sleep';
import Slider from '@react-native-community/slider';
import {happy,sad} from '../songData'
import { useNavigation, useRoute} from '@react-navigation/native';



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


const TRACK_SIZE = 4;
const THUMB_SIZE = 20;

export default class Musicjs extends React.Component {
	
	constructor(props) {
		super(props);
	
	this.state = {
		soundObj:null,
		isPlaying: true,
		playbackInstance: null,
		currentIndex: 0,
		volume: 1.0,
		isBuffering: true, // miliseconds; value interpolated by animation.
		duration: null,
		currentPosition: null,
		timePersent:null,
	}
	// setInterval(()=>{
	// 	this.formatDateTime()//One second, auto refresh
	// },700)

	}
	

	async componentDidMount() {

		
	
		
			this.loadAudio()
	}

	calculateSeedBar = () =>{
		const {duration,playbackPosition} = this.state
		if(playbackPosition !== null && duration !== null){
			return playbackPosition / duration
		}
		return 0 
	}

	renderCurrentTime = () =>{

		return convertTime(this.state.playbackPosition / 1000)
		
	}

	async loadAudio() {
		const { currentIndex, isPlaying, volume,duration } = this.state

		try {
			const playbackInstance = new Audio.Sound()
			const source = {
				uri: happy[currentIndex].uri
			}

			const status = {
				shouldPlay: isPlaying,
				volume: volume,
			}
			
			playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
			const data = await playbackInstance.loadAsync(source, status, false)
			
			this.setState({
				playbackInstance,
				soundObj : data
			})
			
		} catch (e) {
			console.log(e)
		}
		
	}

	 moveAudio = async ( value) => {
		const { soundObj, isPlaying, playbackInstance } = this.state;
	    
		try {
		  const data = await playbackInstance.setPositionAsync(Math.floor(soundObj.durationMillis * value))
		  this.setState( {
			playbackPosition: data.positionMillis,
			soundObj: data
		  });
		 
		 console.log(soundObj.playbackPosition);
		 console.log(data);
		 console.log(value);
		  await playbackInstance.playAsync()
		} catch (error) {
		  console.log('error inside onSlidingComplete callback', error);
		}
	  };

	onPlaybackStatusUpdate = status => {
		
		this.setState({
			isBuffering: status.isLoaded,
			soundObj : status
		})
		if(status.isPlaying || status.isLoaded) {
		this.setState({ 
			duration: status.durationMillis,
			playbackPosition: status.positionMillis,
			soundObj : status
	})}
console.log(this.state.playbackPosition);
	}


	handlePlayPause = async () => {
		const { isPlaying, playbackInstance ,playbackPosition} = this.state
		isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()
		this.setState({
			isPlaying: !isPlaying
		})
		console.log(!isPlaying );
	}

	handlePreviousTrack = async () => {
		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			this.setState({
				currentIndex : (currentIndex === 0 ? happy.length -1 : currentIndex-1)
			});
			this.loadAudio()
		}
		
	}

	handleNextTrack = async () => {
		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			this.setState({
				currentIndex: (currentIndex+1 > happy.length - 1 ? 0 : currentIndex+1)
			});
			this.loadAudio()
		}
	}


	renderFileInfo() {
		const { playbackInstance, currentIndex ,duration,} = this.state
		const img =  happy[currentIndex].imageSource
	
		return playbackInstance ? (
			<View style={styles.trackInfo}>
				{img ? <Image
					style={styles.albumCover}
					source={{uri: img  }}
				/> : null}
				<Text style={[styles.trackInfoText, styles.largeText]}>
					{happy[currentIndex].title}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{happy[currentIndex].author}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{happy[currentIndex].source}
				</Text>
			</View>
		) : null
	}

	render() {
		return (
			<View style={styles.container}>
				{this.renderFileInfo()}
				<Text>{convertTime(this.state.duration / 1000)}</Text>
				<Text>{this.state.currentPosition ? this.state.currentPosition : this.renderCurrentTime() }</Text>
				{/* <DigitalTimeString time={this.state.duration} />
				<DigitalTimeString time={this.state.playbackPosition} /> */}
				

				<Slider
				style={{width: 200,height: 40}}
				minimumValue={0}
				maximumValue={1}
				value={this.calculateSeedBar()}
				onValueChange ={value =>{
					const {currentPosition} = this.state
					const dd = convertTime(value * this.state.duration / 1000)
					this.setState({
						currentPosition :  dd
					})
					console.log(dd);
				}}
				onSlidingStart = {
					async ()=>{
						if(!this.state.isPlaying) return

						try{
							await this.pause(this.state.playbackInstance)
						}
						catch(e){}
					}
				}
				onSlidingComplete = {async (value) =>
					await this.moveAudio(value)
					
				}
				/>

				<View style={styles.controls}>
	
					<TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
						<Ionicons name='play-skip-back-outline' size={48} color='#444' />
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
						{this.state.isPlaying ? (
							<Ionicons name='ios-pause' size={48} color='#444' />
						) : (
							<Ionicons name='ios-play-circle' size={48} color='#444' />
						)}
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
						<Ionicons name='play-skip-forward-outline' size={48} color='#444' />
					</TouchableOpacity>
				</View>
				
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	albumCover: {
		width: 250,
		height: 250
	},
	trackInfo: {
		padding: 40,
		backgroundColor: '#fff'
	},

	trackInfoText: {
		textAlign: 'center',
		flexWrap: 'wrap',
		color: '#550088'
	},
	largeText: {
		fontSize: 22
	},
	smallText: {
		fontSize: 16
	},
	control: {
		margin: 20
	},
	controls: {
		flexDirection:'row',
		alignItems: 'center'
	}
})
