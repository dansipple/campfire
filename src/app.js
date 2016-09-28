import React, {Component} from 'react';

import {Navigation} from 'react-native-navigation';

// screen related book keeping
import {registerScreens} from './screens';
registerScreens();

// this will start our app
Navigation.startSingleScreenApp({
    screen: {
        screen: 'ConvoSwiper',
        title: 'Convos',
        titleImage: require('../img/logo.png'),
        navigatorStyle: {
            navBarBackgroundColor: '#fff'
        }

    },
    drawer: {
        type: 'MMDrawer',
        animationType: 'slide',
        right: {
            screen: 'SideMenu'
        },
        disableOpenGesture: true
    }
});
