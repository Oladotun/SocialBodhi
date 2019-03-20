import React, { Component } from 'react';
import {
  ImageBackground,
  Text,StyleSheet
} from 'react-native';


const remote = 'HomeBackground.png';

export default class Activity extends Component {

  static navigationOptions = {
        header: null
    }
  render() {
    const resizeMode = 'center';
    const text = 'I am in Activity\n';


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
