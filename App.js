/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */



import React, {Component} from 'react'

import LoginWithNum from './src/LoginWithNum'
// import { Provider } from 'react-redux'
// import Fields from './src/Fields'
// import { createStore } from 'redux';
// import reducer from './src/reducer'



export default class App extends Component{
  render(){
    return(
      <LoginWithNum/>
    )
  }
}




// import React, {Component} from 'react';
// import {View,Alert,StyleSheet,Button} from 'react-native';
// import LoginWithTwitter from './src/LoginWithTwitter';
// import LoginWithNum from './src/LoginWithNum';

// const FBSDK = require('react-native-fbsdk');
// const {
//   LoginButton,
//   AccessToken,
//   LoginManager,
//   ShareDialog
// } = FBSDK;
// import { GoogleSignin, GoogleSigninButton,statusCodes } from 'react-native-google-signin';

// export default class App extends Component{
//   constructor(props){
//     super(props)
//    this.state = {
//      userInfo:'',
//     isLoggedIn:false
//    }
//     this.onLoginFB =this.onLoginFB.bind(this)
//   }
  
//   onLoginFB(){
//     LoginManager.logInWithReadPermissions(['public_profile'])
//     .then(function(result) {
//           if (result.isCancelled) {
//           } else {
//             AccessToken.getCurrentAccessToken().then(
//               (data) => {
//                     Alert.alert("token"+data.accessToken)
//                     Alert.alert("user id"+data.userID);
//           });
//              return AccessToken.getCurrentAccessToken(); //this return public profile
//           }
//        },
//        function(error) {
//         Alert.alert('Login fail with error: ' + error);
//        }
//     );
//   }
 
//   signIn = async () => {
//     console.log("google signin")
//     try {
//       await GoogleSignin.hasPlayServices();
//       await GoogleSignin.configure({
//         webClientId:'220694242299-6cllie8tgfogorj4m1l88j7ikbq4ioi7.apps.googleusercontent.com',
//         offlineAccess: true,
//         scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
//     });
//       const userInfo = await GoogleSignin.signIn();
//       console.log("userinfo "+JSON.stringify(userInfo))
//       this.setState({ userInfo,isLoggedIn:true });
//     } catch (error) {
//       console.log("error "+error)
//       console.log("statusCodes "+JSON.stringify(statusCodes))
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         // user cancelled the login flow
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         // operation (f.e. sign in) is in p"rogress already
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         // play services not available or outdated
//       } else {
//         // some other error happened
//       }
//     }
//   }
//   componentDidMount(){
//     GoogleSignin.configure({
//       iosClientId: '<FROM DEVELOPER CONSOLE>', // only for iOS
//     });
    
//     getCurrentUser = async () => {
//       try {
//         const userInfo = await GoogleSignin.signInSilently();
//         this.setState({ userInfo });
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   }
//   signOut = async () => {
//     try {
//       await GoogleSignin.revokeAccess();
//       await GoogleSignin.signOut();
//       this.setState({ user: null }); // Remember to remove the user from your app's state as well
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   // signOut = async () => {
//   //   try {
//   //     await GoogleSignin.revokeAccess();
//   //     await GoogleSignin.signOut();
//   //     this.setState({ user: null }); // Remember to remove the user from your app's state as well
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };
//   render() {
//     return (
      
//       <View style={{justifyContent:'center',marginTop:50}} >
//       <View style={{alignSelf:'center'}}>

//         <LoginButton
//           onLoginFinished={this.onLoginFB}
//           />
//             {this.state.isLoggedIn ?
//             <Button 
//             name="logo-twitter" 
//             style={styles.button} 
//             onPress={this.signOut} 
//             title="Log out"> 
//           </Button>:
//           <GoogleSigninButton
//           style={{ width: 48, height: 48,marign:20 }}
//           size={GoogleSigninButton.Size.Icon}
//           color={GoogleSigninButton.Color.Dark}
//           onPress={this.signIn}
//           // disabled={this.state.isSigninInPr/ogress} 
//           />
//             }
//         <LoginWithTwitter />
//         <LoginWithNum />
//           </View>
      
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   button: {
//   backgroundColor: '#1b95e0',
//     color: 'white',
//     width: 200,
//     height: 50,
//     margin:20
//   },

// });