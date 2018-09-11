import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import Video from 'react-native-video';

export default class VideoPLay extends Component {
    constructor(){
        super()
        this.state = {
            playing:true
        }
    }   
    onLoad(params) {
        console.log("onload "+JSON.stringify(params))

        // this.setState({ songDuration: params.duration });
      }
    
    //called in onProgress to set time.
    
    setTime(params) {
        console.log("onprogress "+JSON.stringify(params))
        // if (!this.state.sliding) {
        //   this.setState({ currentTime: params.currentTime });
        // }
    }
    render(){
        return(
               <Video
                    source={{uri: 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'}}
                    style={styles.backgroundVideo}
                    paused={!this.state.playing}
                    onLoad={this.onLoad.bind(this)}                                                   
                    onProgress={this.setTime.bind(this)}
                />
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
  });