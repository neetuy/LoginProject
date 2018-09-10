import React, {Component} from 'react'
import {TextInput,View,Text,TouchableOpacity,Button,AsyncStorage} from 'react-native'
import { connect } from 'react-redux';
import {inputField} from  '../action.js'

 class Fields extends Component {
    static navigationOptions = {
        title: 'Home',
      };

    constructor(props){
        super(props)
        this.state = {
            name:this.props.name,
            age:this.props.age,
            isStoreLoading: false,
        }
    }

    inputField(){
        console.log("increse")
        this.setState({value:this.state.value+1}, ()=>{
            AsyncStorage.setItem('name',this.state.name)
            AsyncStorage.setItem('age',this.state.age)
            this.props.inputField(this.state.name,this.state.age)
        })
        console.log("value increased to"+this.props.name)
        console.log("value increased to"+this.props.age)

    }


     
    render(){
        return(
        <View style={{justifyContent:'center',alignContent:'center',margin:100}}>
            <TextInput
                onChangeText={(text)=>this.setState({name:text})}
                placeholder='name'
                value={this.state.name}
            />
            <TextInput
                onChangeText={(text)=>this.setState({age:text})}
                placeholder='age'
                value={this.state.age}
            />
            <Text>{this.state.name.name}</Text>
            <Text>{this.state.age.age}</Text>
            <Button
                onPress={()=>this.inputField()}
                title="Next"
                color="#841584"
            />
        </View>
        )
    }
}

function mapStateToProps(state){
    return{
        name:state.name,
        age:state.age,

    }
}

function mapDispatchToProps(dispatch){
    return{
        inputField: (name,age)=>dispatch(inputField(name,age)),
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Fields)