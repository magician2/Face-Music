import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image,Dimensions ,Button} from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType } from 'expo-camera';
import { useNavigation,useRoute } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import cameraBtn from '../assets/camera.png';
import cameraType from '../assets/cameraType.png';
import LottieView from 'lottie-react-native';
import * as FaceDetector from 'expo-face-detector';


const kao = [];
export default function CameraPage() {
  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [camera,setCamera] = useState(null);
  const [faceData, setFaceData] = React.useState([]);


  useEffect(() => {
    (async () => {
     const cameraStatus = await Camera.requestCameraPermissionsAsync();
      
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
        const data = await camera.takePictureAsync();
        setImage(data.uri);
      } 
    
  };

  function getFaceDataView() {
    if (faceData.length === 0) {
      return (
        <View style={styles.faces}>
          <Text style={styles.faceDesc}>No faces :(</Text>
        </View>
      );
    } else {
      return faceData.map((face, index) => {
        const eyesShut = face.rightEyeOpenProbability < 0.4 && face.leftEyeOpenProbability < 0.4;
        const winking = !eyesShut && (face.rightEyeOpenProbability < 0.4 || face.leftEyeOpenProbability < 0.4);
        const smiling = face.smilingProbability > 0.7;
        const sad = face.smilingProbability < 0.3;
          if(smiling === true){
            kao.shift()
            kao.push('happyFace')
            
            return <Text style={{color: 'white' ,fontSize:30}}>Happy</Text>

          }
          else{
            kao.shift()
            kao.push('sadFace')

            return  <Text style={{color: 'white' ,fontSize:30}}>Sad</Text>
          }
      });
    }
  }

  const handleFacesDetected = ({ faces }) => {
    setFaceData(faces);


    console.log(faces);
    //Face x,y and decoration

  }



//Send face data
const Check = ()=>{
  navigation.navigate('Check', {
    image : image,
    face: kao[0]
  })
}


  return (


    <View style={styles.container}>
            <TouchableOpacity 
            style={{width:60,height:20,position:'absolute',top:60,left:20,color:'#818181'}} 
            onPress={()=>{navigation.navigate("Menu")}}>
              <Text>閉じる</Text>
            </TouchableOpacity>
      {!image ? (
                <Camera ref={ref => setCamera(ref)}
                type = {type}
                style={styles.fixedRatio}
                ratio={'1:1'}
                onFacesDetected={handleFacesDetected}
              faceDetectorSettings={{
                mode: FaceDetector.FaceDetectorMode.fast,
                detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                runClassifications: FaceDetector.FaceDetectorClassifications.none,
                minDetectionInterval: 100,
                tracking: true
              }}>
              {getFaceDataView()}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}
          >
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      
      )}
        {image ? (
            <LottieView
                source={require('../assets/loading.json') } 
                style={styles.loading} 
                autoPlay 
                loop={false}
                onAnimationFinish={Check}
                speed={1}
                />
        ) : (
          <View 
            style={styles.takeReady}>
              <TouchableOpacity 
                  onPress={takePicture} style={styles.takeBtn}>
                <LinearGradient
                          start={{x: 0.7, y: 1}} 
                          end={{x: 1, y: 0.5}}
                          colors={['#A167FF', '#FF7CDB']}
                          style={{
                            width:75,
                            height:75,
                            borderRadius:38
                          }}
                            />

                    <Image 
                    source={cameraBtn} style={{position: 'absolute',top:20}} >
                    </Image>
                  </TouchableOpacity>
            <TouchableOpacity 
              style={styles.front} onPress={() => {
                setType(
                  type === CameraType.front ? CameraType.back : CameraType.front
                );
              }}>
              <Image 
              source={cameraType}></Image>
            </TouchableOpacity>
            {/* <Button
              title=""
              icon="retweet"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            /> */}
          </View>
          // <Button title="Take a picture" onPress={takePicture} icon="camera" />
        )}
    </View>
  );
}
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  faces: {
    
    alignItems: 'center',
  },
  faceDesc: {
    fontSize:40,
    color:'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  fixedRatio:{
    flex: 0.7,
  },
  controls:{
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  takeReady: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position:'relative',
    top:55
  },
  takeBtn:{
                  alignItems: 'center',
                  width:75,
                  height:75

  },
  front:{
    position: 'absolute',
    right:30
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    flex: 0.7
  },
  loading:{
    width:200,
    position: 'absolute',
    top:120,
    left:30
  }
});