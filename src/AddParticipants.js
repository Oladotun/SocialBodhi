import React, { Component } from 'react';
import { Button,View, TextInput, Platform, StyleSheet, FormData,TouchableOpacity, Animated,AsyncStorage, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import SearchableDropdown from 'react-native-searchable-dropdown';

export default class AddParticipants extends Component
{
    constructor()
    {
        super();
 
        this.state = { valueArray: [], disabled: false, message:[], accessTokens: '',items:[]}
 
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
    // this._retrieveData();
    this._retrieveDataToken('access');


  }



    defaultheader = function () {
       return {
           method: null,
           body: null,
           crossDomain: true,
           cache: false,
           async: false,
           timeout: 3000,
           headers: {
           "Content-Type": "application/json",
           "Authorization":"",
           "Accept": "*/*",
           "Access-Control-Allow-Headers":"*",
           "Access-Control-Allow-Headers":"*",
           "X-Requested-With":"XMLHttpRequest"
           },
       };
    };



      transformRequest(obj){
       var str = [];
       for (var p in obj)
       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
       return str.join("&");
      };


      _getContact= (data ) => {

        var emails = [];
        // var nameList = [];
        var emailNumber = 0;

        for(i in data) {
          var value = data[i];
          if (value['gd$email']) {
            var emailList = value['gd$email']
            // var name = value['title']['$t']
            var address = emailList[0];
            var addressValue = address['address'];

            emails[emailNumber] = {id: emailNumber + 1, name: addressValue};
            // nameList[emailNumber] = name;
            emailNumber = emailNumber + 1;
          }

          
          

        }
        console.log(emails);
        this.setState({items:emails});
        // console.log(nameList)

      }


      _storeData = async (token1,token2) => {
        try {
          // console.log("This is the token getting stored ", token);
          await AsyncStorage.setItem('@MySuperStore:accessToken', token1);
          await AsyncStorage.setItem('@MySuperStore:refreshToken', token2);
        } catch (error) {
          // Error saving data
        }
      };


        defaultForm = function(){

        return {

          grant_type: "refresh_token",
          client_id: "",
          client_secret: "",
          refresh_token:"",
          access_type:"offline" 
          




        }
      }


     getTokenForUser = async(value) => {


               // console.log("In here get token user");

              var formData = this.defaultForm();
              

              formData["client_id"] = "205524069868-o5l9t8v1ebqdikaep10t3kni54hqctrn.apps.googleusercontent.com"
              formData["client_secret"] = "OawvnISRqtltBy_LeR4XeW6T"
              formData["refresh_token"] = value

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
                // console.log("loading json")
                return response.json()
              })
             .then((responseJson) => {
              console.log("responseJson=",responseJson)

              this._storeData(responseJson['access_token'],responseJson['refresh_token']);

              this._retrieveData(responseJson['access_token']);

              
              })
              .catch((error) => {
                  console.log("An error occurred.Please try again",error);
                 })

              // console.log("After fetch");
            }


    


      _retrieveDataToken = async (type) => {
            try {
           
              const value = await AsyncStorage.getItem('@MySuperStore:'+type+'Token');
              // console.log("In after token")
              // console.log('@MySuperStore:'+type+'Token')

              if(type=='refresh' && value !=null){
                // console.log("type is refresh")
                this.getTokenForUser(value)
              }
               else if (value !== null) {
                // We have data!!
                // console.log(value);
                // this.getTokenForUser(value);
                this._retrieveData(value);
              } else{
                console.log("Value is null")
              }
            } catch (error) {
              // Error retrieving data
              console.log("There is error", error)
            }
          };

   
      _retrieveData = async (tokens) => {
          try {
           
              // const tokens = await GoogleSignin.getTokens()
              
              if (tokens != null){

                const header =this.defaultheader();
                let params={
                 "alt":"json",
                 "max-results":100
                };
                header.method='GET';
                let url="https://www.google.com/m8/feeds/contacts/default/full?";
                var suburl=this.transformRequest(params);
                url=url+suburl;

                
              header.headers["Authorization"]= 'Bearer'+' '+tokens;
              console.log("header is ", header);

              fetch(url, header)
              .then((response) => {
                  setTimeout(() => {let a=0;}, 0); 
                  // console.log(response.text())
                  return response.json();
              })
              .then((responseJson) => {
                console.log("responseJson=",responseJson);
                var data = responseJson;
                console.log("json is ");
                console.log(responseJson['feed']['entry']);
                this._getContact(responseJson['feed']['entry']);
              })
             .catch((error) => {
              this._retrieveDataToken('refresh')
              console.log("An error occurred.Please try again",error);
             });

              }
              
             
          } catch (error) {
            // Error retrieving data
            console.log(error);
          }
        };

      







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
                      


                    <SearchableDropdown
                      onTextChange={text => console.log(text)}
                      onItemSelect={item => JSON.stringify(item)}
                      containerStyle={{ padding: 5 }}
                      textInputStyle={{
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                      }}
                      itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#ddd',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                      itemTextStyle={{ color: '#222' }}
                      itemsContainerStyle={{ maxHeight: 140 }}
                      items={this.state.items}
                      defaultIndex={2}
                      placeholder="placeholder"
                      resetValue={false}
                      underlineColorAndroid="transparent"
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