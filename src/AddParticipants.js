import React, { Component } from 'react';
import { Button,View, TextInput, Platform, StyleSheet, TouchableOpacity, Animated, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class AddParticipants extends Component
{
    constructor()
    {
        super();
 
        this.state = { valueArray: [], disabled: false, message:[]}
 
        this.index = 0;
        this.messageIndex = 0;
 
        this.animatedValue = new Animated.Value(0);
    }

    static navigationOptions = ({ navigation }) => {
       
       return{ headerTitle: 'Add Participant',
        headerRight: (
        <Button
          onPress={navigation.getParam('nextButton')}
          title="Save"
          
        />
      )
      }
    }


  

    componentDidMount() {
    this.props.navigation.setParams({ nextButton: this.nextButton });
    }



    nextButton = () => {
      var goNext = true;

      if (this.state.message.length < 2){
        goNext = false;
         // alert('One or more fields cannot be empty');
      } else {

        
        // Ensure animated field and constant have same difference of two
        if((this.state.message.length - this.state.valueArray.length) != 2){
          goNext = false
        } else {

            for (var key in this.state.message) {
            var obj = this.state.message[key];

            if (obj == ""){
              // alert('One or more fields cannot be empty');
              goNext = false;
            }
        }

        }
        

      }
      

        if (goNext){
           this.props.navigation.navigate("HomeTab")
           // console.log("goNext");
        } else {
          alert('One or more fields cannot be empty');
        }
    }

     addMessage = (text,index) => {
      console.log("text", text)
      console.log("index", index)
      console.log("message",this.state.message)
      var joined = this.state.message.slice();
      joined[index] = text;
      // this.messageIndex = this.messageIndex+1;
      console.log(joined)
      this.setState({ message: joined})
    }


  removeClick = () =>{
    if(this.state.valueArray.length>0){
      let values = this.state.valueArray;
     let messages = this.state.message;
     
     values.splice(-1,1);
     messages.splice(-1,1);
     this.index = this.index -1;

     console.log("message is ",messages);
     console.log("value is ",values);
     this.setState({ valueArray: values, message:messages });

    }
     
  }

    addPrompt= (text) => {
      
      this.setState({ prompt: text})
    }

 
    addMore = () =>
    {
      
        this.animatedValue.setValue(0);
 
        let newlyAddedValue = { index: this.index }
 
        this.setState({ disabled: true, valueArray: [ ...this.state.valueArray, newlyAddedValue ] }, () =>
        {
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }
            ).start(() =>
            {
                this.index = this.index + 1;
                this.setState({ disabled: false });
            }); 
        });              
    }
 
    render()
    {
        const animationValue = this.animatedValue.interpolate(
        {
            inputRange: [ 0, 1 ],
            outputRange: [ -59, 0 ]
        });
 
        let newArray = this.state.valueArray.map(( item, key ) =>
        {
            if(( key ) == this.index)
            {
                return(
                    <Animated.View key = { key } style = {[{ opacity: this.animatedValue, transform: [{ translateY: animationValue }] }]}>
                        

                        <TextInput style = {styles.input}
                       underlineColorAndroid = "transparent"
                       placeholder = "Enter Email"
                       placeholderTextColor = "#9a73ef"
                       autoCapitalize = "none"
                       onChangeText = {(value) => this.addMessage(value,key+2)}
                       
                       defaultValue=" "
                       />
                    </Animated.View>
                );
            }
            else
            {
                return(
                    <View key = { key } >
                        <TextInput style = {styles.input}
                       underlineColorAndroid = "transparent"
                       placeholder = "Enter Email"
                       placeholderTextColor = "#9a73ef"
                       autoCapitalize = "none"
                       onChangeText = {(value) => this.addMessage(value,key+2)}
                       defaultValue=" "
                       />
                    </View>
                );
            }
        });
 
        return(
            <View style = { styles.container }>
                <ScrollView>

                    <View style = {{ flex: 1, padding: 4 }}>
                      


                    <TextInput style = {styles.input}
                       underlineColorAndroid = "transparent"
                       placeholder = "Enter Email"
                       placeholderTextColor = "#9a73ef"
                       autoCapitalize = "none"
                       onChangeText = {(value) => this.addMessage(value,0)}
                       />

                       <TextInput style = {styles.input}
                       underlineColorAndroid = "transparent"
                       placeholder = "Enter Email"
                       placeholderTextColor = "#9a73ef"
                       autoCapitalize = "none"
                       onChangeText = {(value) => this.addMessage(value,1)}
                       />


                    {
                        newArray
                    }
                    </View>
                </ScrollView>

                <View style={{flexDirection:"row"}}>

                <TouchableOpacity activeOpacity = { 0.8 } style = { styles.btnLeft } disabled = { this.state.disabled } onPress = { this.removeClick }>
                    <Icon name="ios-remove-circle" size={30} style={[{color:'#4A90E2'},{alignSelf: 'center'}]}/>
                </TouchableOpacity>
 
                <TouchableOpacity activeOpacity = { 0.8 } style = { styles.btn } disabled = { this.state.disabled } onPress = { this.addMore }>
                    <Icon name="ios-add-circle" size={30} style={[{color:'#4A90E2'},{alignSelf: 'center'}]}/>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}
 
const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        paddingTop: (Platform.OS == 'ios') ? 20 : 0
    },
    multiLine: {
      margin: 15,
      height: 40,
      borderColor: '#FFF',
      fontSize: 30,
      borderWidth: 0
   },
    input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
      borderRadius:25,
      textAlign: 'center'
   },
 
    viewHolder:
    {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        borderStyle: 'solid',
        borderColor: 'black', 

    },
 
    text:
    {
        color: 'white',
        fontSize: 25
    },
    btnLeft:
    {
        position: 'absolute',
        left: 10,
        bottom: 25,
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 15
    },
 
    btn:
    {
        position: 'absolute',
        right: 25,
        bottom: 25,
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 15
    },
 
    btnImage:
    {
        resizeMode: 'contain',
        width: '100%',
        tintColor: 'white'
    }
});