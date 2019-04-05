import React, {Component} from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import { Button} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home.js';
import Loading from './Loading';
import Login from './Login.js';
import Profile from './Profile.js';
import Activity from './Activity.js';
import NewQuestion from './AddNewQuestions.js';
import NewParticipant from './AddParticipants.js';


const HomeTab = createBottomTabNavigator({
	Home: {
		screen: Home
	},
	Activity: {
		screen: Activity

	},
	Profile: {
		screen: Profile
	}

},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home`;
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
          
        } else if (routeName === 'Activity') {
          iconName = `ios-notifications`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
  }
);





HomeTab.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  // You can do whatever you like here to pick the title based on the route name
  const headerTitle = routeName;

  return {
    headerTitle,
    headerLeft: null,
  };
};



const LoadNav = createStackNavigator({
  Loading: {screen: Loading},
  HomeTab: {screen: HomeTab},
  Login: { screen: Login },
  NewQuestion: {
    screen: NewQuestion
  },
  NewParticipant: {screen:NewParticipant}


});




const AppNav = createAppContainer(LoadNav);

export default AppNav;