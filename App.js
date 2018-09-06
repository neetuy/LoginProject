/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */



import React, {Component} from 'react'

import { Provider } from 'react-redux'
import { createStore } from 'redux';
import reducer from './src/reducer'
import RouterPage from './src/utils/routes';

var store = createStore(reducer)

export default class App extends Component{
  render(){
    return(
      <Provider store={store}>
        <RouterPage/>
      </Provider>
    )
  }
}




