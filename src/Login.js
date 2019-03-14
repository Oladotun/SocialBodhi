import React, { Component } from 'react';
import {
  ImageBackground,
  Text,TouchableOpacity,StyleSheet
} from 'react-native';

const remote = 'HomeBackground.png';

export default class Login extends Component {
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

      <TouchableOpacity
                style={styles.loginScreenButton}
                onPress= '#'
                underlayColor='#3b5998'>
                <Text style={styles.loginText}>Login with Facebook</Text>
       </TouchableOpacity>

       </ImageBackground>

      
       
    );
  }
}


const styles = StyleSheet.create({
  loginScreenButton:{
    marginRight:40,
    marginLeft:40,
   marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#3b5998',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  loginText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  }
});
