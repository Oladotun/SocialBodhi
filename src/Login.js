import React, { Component } from 'react';
import {
  ImageBackground,
  Text,TouchableOpacity,StyleSheet,View
} from 'react-native';

// import { LoginButton, AccessToken } from 'react-native-fbsdk';
const remote = 'HomeBackground.png';

export default class Login extends Component {

  static navigationOptions = {
        header: null
    }
  render() {
    const resizeMode = 'center';
    const text = 'SocialBodhi\nBetterDecisions';

    return (
      <ImageBackground
        style={{
          backgroundColor: '#ccc',
          flex: 1,
          resizeMode,
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center'
        }}
        source={{ uri: remote }}
      >
      <Text
          style={{
            backgroundColor: 'transparent',
            textAlign: 'center',
            fontSize: 30,
            padding: 40
          }}
        >
          {text}
      </Text>



       </ImageBackground>

      
       
    );
  }
}


// <View>
//         <LoginButton
//          style = {styles.loginScreenButton}
//           onLoginFinished={
//             (error, result) => {
//               if (error) {
//                 console.log("login has error: " + result.error);
//               } else if (result.isCancelled) {
//                 console.log("login is cancelled.");
//               } else {
//                 AccessToken.getCurrentAccessToken().then(
//                   (data) => {
//                     console.log(data.accessToken.toString())
//                     (this.props.navigation.navigate('HomeTab'))
//                   }
//                 )
//               }
//             }
//           }
//           onLogoutFinished={() => console.log("logout.")}/>
//       </View>


const styles = StyleSheet.create({
  loginScreenButton:{
    
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#3b5998',
    borderWidth: 1,
    borderColor: '#fff',
    width: 195,
    height: 50,
    alignSelf: 'center'
  },
  loginText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  }
});
