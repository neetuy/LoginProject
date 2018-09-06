import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Fields from '../components/Fields'
import ProfilePage from '../components/ProfilePage'

export default class RouterPage extends Component {

  render() {
    return (
      <Routes/>
    )
  }
}

  const Routes =  createStackNavigator(
  {
    Home:Fields,
    Profile:ProfilePage
  }
);

