import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Video from 'react-native-video';

export default class VideoPLay extends Component {
    render(){
        return(
            <View>
                <Video source={{uri: "background"}}   // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                    }}                                      // Store reference
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onEnd={this.onEnd}                      // Callback when playback finishes
                    onError={this.videoError}               // Callback when video cannot be loaded
                    style={styles.backgroundVideo} />
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

});