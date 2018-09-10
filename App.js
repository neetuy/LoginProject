/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */



import React, {Component} from 'react'
import {AsyncStorage,AppState,Text} from 'react-native'
import { Provider } from 'react-redux'
import {createStore} from 'redux';
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
    this.setState({isStoreLoading: true});
     AsyncStorage.multiGet(['name','age']).then((res)=>{
      if(res){
        let initialStore = {
          name:res[0][1],
          age:res[1][1]
        }
        this.setState({store: createStore(reducer, initialStore)});
      }else{
        this.setState({store: createStore(reducer, initialStore)});
      }
      this.setState({isStoreLoading: false});
    }).catch((error)=>{
      this.setState({store: store});
      this.setState({isStoreLoading: false});
    })
  }
  


  render(){
    console.log("store value "+JSON.stringify(this.state.store.getState()))
        if(this.state.isStoreLoading){
          return <Text>Loading Store ...</Text>
        }else{
          return (
            <Provider store={this.state.store}>
              <RouterPage />
            </Provider>
          )
        }
  }

}




