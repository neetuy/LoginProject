import React, { Component } from 'react';
import { View, Text,StyleSheet,ProgressBarAndroid } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class VideoPLay extends Component {
    constructor(){
        super()
        this.state = {
            playing:true,
            seekableDuration:0,
            playableDuration:0,
            currentTime:0,
            progressTime:0
        }
    }   
    onLoad(params) {
        console.log("onload "+JSON.stringify(params))

        // this.setState({ songDuration: params.duration });
      }
    
    //called in onProgress to set time.
    
    setTime(params) {
        console.log("onprogress "+JSON.stringify(params))
        console.log("progressTime "+this.state.progressTime)
        var progressTime =this.state.currentTime/this.state.seekableDuration
        this.setState({
            seekableDuration:params.seekableDuration,
            playableDuration:params.playableDuration,
            currentTime:params.currentTime,
            progressTime:progressTime
        },
        // setTimeout(() => {
        //     let progress = 0;
        //     this.setState({ indeterminate: false });
        //     setInterval(() => {
        //       progress += Math.random() / 5;
        //       if (progress > 1) {
        //         progress = 1;
        //       }
        //       this.setState({ progress });
        //     }, 500);
        //   }, 1500)
    )
    }
    videoPlay(play){
        console.log("play "+play)
        this.setState({playing:!play})
    }
    render(){
        console.log("progress time "+this.state.progressTime)
        return(
            <View style={{flex:1}}>
                <View style={{flex:1, justifyContent:"center"}}>
                <Video
                    source={{uri: 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'}}
                    style={styles.backgroundVideo}
                    paused={!this.state.playing}
                    onLoad={this.onLoad.bind(this)}                                                   
                    onProgress={this.setTime.bind(this)}
                />
                
                    <Icon name={this.state.playing==true ? "pause" : "play-arrow"} 
                        onPress={this.videoPlay.bind(this,this.state.playing)} 
                        size={38} 
                        color="#000" style={styles.iconPosition}
                    />
                </View>
                    <View>
                        <Text>seekableDuration {this.state.seekableDuration}</Text>
                        <Text>playableDuration  {this.state.playableDuration}</Text> 
                        <Text>currentTime  {this.state.currentTime}</Text> 
                    </View>
                <ProgressBarAndroid 
                styleAttr = "Horizontal" 
                progress={this.state.progressTime}
                animating ={true}
                style={{margin:20}}
                indeterminate = { false } 
                /> 

            </View>

        )
    }
}
var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    iconView:{
        justifyContent:"center"
    },
    iconPosition:{
       alignSelf:'center'
    }
   
  });