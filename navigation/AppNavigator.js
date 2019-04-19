import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import loginScreens from '../screens/LoginScreens';
import FirstPg from '../screens/firstPg';
import StatusPg from '../screens/StatusPg';
import MainTabNavigator from './MainTabNavigator';



const App = createStackNavigator ({
  Main: MainTabNavigator,
  Login: { screen: loginScreens },
  FirstPg: { screen: FirstPg },
  StatusPg: { screen: StatusPg },
}, 

{

  initialRouteName: 'Login',

});


export default createAppContainer( App );
