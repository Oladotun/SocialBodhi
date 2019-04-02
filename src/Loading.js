import React, { Component } from 'react';
import {
  ImageBackground,
  Text,StyleSheet
} from 'react-native';

// import Home from './Home.js';
// import Login from './Login.js';
const remote = 'HomeBackground.png';

export default class Loading extends Component {

  static navigationOptions = {
        header: null
    }
  constructor(props) {
    super(props)

    this.state = {
      accessToken: false,
      loading: false
    };
  }

  

  componentDidMount() {
    // AccessToken.getCurrentAccessToken()
    // .then((data) => {
    //   this.setState({
    //     accessToken: data.accessToken,
    //     loading:false
    //   });
    // })
    // .catch(error => {
    //   console.log(error)
    //   this.setState({
    //     accessToken: null,
    //     loading:false
    //   });
    // });
  }




  render() {


  if (this.state.loading){

    const resizeMode = 'center';
    const text = 'Loading First\n';


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

  }else if (this.state.accessToken) {
      return (this.props.navigation.navigate('HomeTab'))

     } else {
      return (
           this.props.navigation.navigate('Login')

          
           );
      }
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
