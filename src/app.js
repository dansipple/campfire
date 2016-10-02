import React, {Component} from 'react';

import {Navigation} from 'react-native-navigation';

// screen related book keeping
import {registerScreens} from './screens';
registerScreens();

// this will start our app
Navigation.startSingleScreenApp({
    screen: {
        screen: 'Root',
        title: 'Convos',
        navigatorStyle: {
            navBarBackgroundColor: '#fff',
            navBarTextColor: '#666',
            navBarHidden: true
        }

    }
});
