import React, {Component} from 'react';
import {
  AppRegistry,
  View
} from 'react-native';
import {Navigation} from 'react-native-navigation';

// screen related book keeping
import {registerScreens} from './screens';
registerScreens();

// this will start our app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'example.FirstTabScreen',
    title: 'Discover',
    navigatorStyle: {
      navBarBackgroundColor: '#fff',
      navBarTextColor: '#666',
      navBarNoBorder: false
      //navBarButtonColor: '#666'
    }

  },
  drawer: {
    type: 'MMDrawer',
    animationType: 'slide',
    left: {
      screen: 'example.SideMenu'
    },
    right: {
      screen: 'example.SideMenu'
    },
    disableOpenGesture: true
  }
});
