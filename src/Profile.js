import React, { Component } from 'react';
import {
  ImageBackground,
  Button,
  Text,StyleSheet
} from 'react-native';

import firebase from 'react-native-firebase'
import { GoogleSignin } from 'react-native-google-signin';

const remote = 'HomeBackground.png';

export default class Profile extends Component {

  static navigationOptions = {
        header: null
    }

  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        // this.props.navigation.state('Home');
        this.props.navigation.navigate('Login');
    } catch (e) {
        console.log(e);
    }
 }
  render() {
    const resizeMode = 'center';
    const text = 'I am in Profile \n';


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

       <Button title="logout" onPress={() => this.signOutUser()} />

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
