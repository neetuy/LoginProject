/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View,Alert,StyleSheet,Button} from 'react-native';
import VideoPLay from './src/VideoPlay'
export default class App extends Component{

  render() {
    return (
      
      <View style={{justifyContent:'center',marginTop:50}} >
        <View style={{alignSelf:'center'}}>
          <VideoPLay/>
        </View>
      </View>
    );
  }
}

