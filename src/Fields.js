import React, {Component} from 'react'
import {TextInput,View} from 'react-native'
import { connect } from 'react-redux';
import {nameFun, addressFun} from  './action.js'

 class Fields extends Component {
    constructor(){
        super()
        this.state = {
            name:'',
            addresss:''
        }
    }
    nameFun =()=>{
        this.setState({name})
        // this.props.dispatchName({name:this.state.name})
    }
    addressFun = ()=>{
        this.state.setState({address})
        // this.props.dispatchAddress({address:this.state.addresss})
    }
    render(){
        return 
        <View>
            <TextInput
             onChangeText ={(name)=>{this.setState({name})}}
             placeholder="start typing"
             value={this.state.name}
            />
            <TextInput
             onChangeText ={(address)=>{this.setState({address})}}
             placeholder="start typing"
             value={this.state.addresss}
            />
            <Text>{this.state.name}</Text>
            <Text>{this.state.text}</Text>

        </View>
    }
}

function mapStateToProps(state){
    console.log("state "+JSON.stringify(state))
    return{
        name:state.name,
        address:state.address
    }
    
}

function mapDispatchToProps(dispatch){
    return{
        dispatchName: ()=>dispatch(nameFun(name)),
        dispatchAddress:()=>dispatch(addressFun(address))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Fields)