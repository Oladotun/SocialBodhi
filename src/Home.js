import React, { Component } from 'react';
import {
  ImageBackground,
  Text,StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const remote = 'HomeBackground.png';

export default class Home extends Component {

  static navigationOptions = {
        title: 'Home'
    }



  addNewQuestion = () => {
    this.props.navigation.navigate('NewQuestion');
  }
  render() {
    const resizeMode = 'center';
    const text = 'I am Home\n';


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
  
        <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => this.addNewQuestion()}>
            <Text style={[{fontSize: 20},{color: '#000000'}]}> No New Decisions </Text>
            <Icon name="ios-add-circle" size={100} style={[{color:'#4A90E2'},{alignSelf: 'center'}]}/>
            </TouchableOpacity>

          </View>

          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => this.addNewQuestion()}>
            <Text style={[{fontSize: 20},{color: '#000000'}]}> No Participating</Text>
            <Icon name="ios-add-circle" size={100} style={[{color:'#4A90E2'},{alignSelf: 'center'}]}/>
            </TouchableOpacity>

          </View>

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
  },
  imageContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20


  }
});
