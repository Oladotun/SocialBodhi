import React, { Component } from 'react';
import {
  ImageBackground,
  Text,TouchableOpacity,StyleSheet,View, AsyncStorage
} from 'react-native';

// import { LoginButton, AccessToken } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { GoogleSignin, statusCodes, GoogleSigninButton } from 'react-native-google-signin';
const remote = 'HomeBackground.png';

export default class Login extends Component {

  static navigationOptions = {
        header: null
    }



_storeData = async (token1,token2) => {
  try {
    console.log("Access token is ", token1);
    console.log("Refresh token is ", token2);
    await AsyncStorage.setItem('@MySuperStore:accessToken', token1);
    await AsyncStorage.setItem('@MySuperStore:refreshToken', token2);
  } catch (error) {
    // Error saving data
  }
};

  defaultForm = function(){

      return {

        grant_type: "authorization_code",
        client_id: "",
        client_secret: "",
        redirect_uri:"",
        code:"",
        access_type:"offline" ,
        response_type:'code'




      }
    }


 getTokenForUser = async(value) => {


           console.log("In here get token user");

          var formData = this.defaultForm();
          

          formData["client_id"] = "205524069868-o5l9t8v1ebqdikaep10t3kni54hqctrn.apps.googleusercontent.com"
          formData["client_secret"] = "OawvnISRqtltBy_LeR4XeW6T"
          formData["code"] = value

          console.log(JSON.stringify(formData))

          // console.log("Going to fetch");
         fetch('https://www.googleapis.com/oauth2/v4/token', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            body: JSON.stringify(formData)

          })
         .then((response) =>{
            setTimeout(() => {let a=0;}, 0); 
            console.log("loading json")
            return response.json()
          })
         .then((responseJson) => {
          console.log("responseJson=",responseJson)

          this._storeData(responseJson['access_token'],responseJson['refresh_token']);

          
          })
          .catch((error) => {
              console.log("An error occurred.Please try again",error);
             })

          console.log("After fetch");
        }



googleLogin= async() =>{
  try {
    // add any configuration settings here:
    await GoogleSignin.configure({
      scopes: [
            "https://www.google.com/m8/feeds/",
            "https://www.googleapis.com/auth/contacts.readonly"],
          offlineAccess: true,
          webClientId: '205524069868-o5l9t8v1ebqdikaep10t3kni54hqctrn.apps.googleusercontent.com'
        
    });

    const data = await GoogleSignin.signIn();
    console.warn("data set ", data)
    console.warn("data server",data.serverAuthCode)
    if(data.serverAuthCode){
      await this.getTokenForUser(data.serverAuthCode);
    }
    
    // await this._storeData(data.serverAuthCode);
    console.warn(data);
    // create a new firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
    // login with credential
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

    this.props.navigation.navigate('HomeTab')
    console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
  } catch (e) {
    console.error(e);
  }
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



  <GoogleSigninButton
    style={{ width: 192, height: 48 ,alignSelf: 'center'}}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={() => this.googleLogin()}
     />



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
