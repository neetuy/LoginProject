import React, {Component} from 'react'
import {TextInput,View,Text,TouchableOpacity,Button,AsyncStorage} from 'react-native'
import { connect } from 'react-redux';
import {increase, decrease} from  '../action.js'

 class Fields extends Component {
    static navigationOptions = {
        title: 'Home',
      };

    constructor(props){
        super(props)
        this.state = {
            value:0,
            isStoreLoading: false,
        }
    }

    increaseNum(){
        console.log("increse")
        this.setState({value:this.state.value+1}, ()=>{
        this.props.increaseValue(this.state.value)
        AsyncStorage.setItem("value",this.props.value)
        })
        console.log("value increased to"+this.state.value)
    }

    decreaseNum(){
        console.log("decrease")
        this.setState({value:this.state.value-1},()=>{
            this.props.decreaseValue(this.state.value)
            AsyncStorage.setItem("value",this.props.value)
        })
    }

     
    render(){
        return(
        <View style={{justifyContent:'center',alignContent:'center',margin:100}}>
            <TouchableOpacity
                onPress={this.increaseNum.bind(this)}
            >
            <Text>increase</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={this.decreaseNum.bind(this)}
            >
            <Text>decrease</Text>
            </TouchableOpacity>
            <Text>{this.state.value}</Text>
            <Text>{this.props.value}</Text>
            {/* <Button
                onPress={()=>this.props.navigation.navigate('Profile')}
                title="Next"
                color="#841584"
            /> */}
        </View>
        )
    }
}

function mapStateToProps(state){
    return{
        value:state.value
    }
}

function mapDispatchToProps(dispatch){
    return{
        increaseValue: (value)=>dispatch(increase(value)),
        decreaseValue: (value)=>dispatch(decrease(value)),
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Fields)