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
  constructor(props){
    super(props);
    this.state = {
      isStoreLoading: false,
      store: store
    }
  }

  componentWillMount() {
    var self = this;
    AsyncStorage.getItem('value').then((value)=>{
      if(value && value.length){
        let initialStore = JSON.parse(value)
        self.setState({store: createStore(reducers, initialStore)});
      }else{
        self.setState({store: store});
      }
      self.setState({isStoreLoading: false});
    }).catch((error)=>{
      self.setState({store: store});
      self.setState({isStoreLoading: false});
    })
  }
  
  render(){
    if(this.state.isStoreLoading){
      return <Text>Loading Store ...</Text>
    }else{
      return (
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      )
    }
  }

}




