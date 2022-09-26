import { StyleSheet, Text, View ,TouchableOpacity,Image} from 'react-native'
import React from 'react'

const AudioListitem = ( {
title,
img,artist,
sendAudioPress
})=>{


  return (
    <View>
    <TouchableOpacity onPress={sendAudioPress} style={styles.ListBox}>
        {img ? <Image source={{ uri: img }} key={img} style={{
            width:50,
            height:50,
            marginRight:20}}/> : null}
        <View style={{justifyContent: 'center',}}>
            <Text style={styles.ListTitle} key={title} >{title}</Text>
            <Text style={styles.ListAt} key={artist} >{artist}</Text>
        </View>
    </TouchableOpacity>
</View>
  )
}

export default AudioListitem

const styles = StyleSheet.create({
    ListBox: {
        flexDirection: 'row',
        marginTop: 10
    },
    ListTitle: {
        fontSize:18,
        margin:2,
        color:'#707070',
    },
    ListAt:{
        fontSize:13,
        color: '#909090',
        margin:2
    },
})