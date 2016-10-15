import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, Image, StyleSheet, Dimensions, ListView, Text, View } from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    AccessToken
} = FBSDK;


import {connect} from 'react-redux';
import * as appActions from '../../src/reducers/app/actions';

class Login extends Component {

    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props) {
        super(props);

        //this.login = this.login.bind(this);
    }

    login(userId) {
        this.props.dispatch(appActions.login(userId));
    }

    render() {
        return (
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('../../img/logo-big.png')} />


                    <TouchableHighlight onPress={this.login.bind(this, '-KPzFJ697NbkNZoHVBR7')} style={styles.fbLogin}>
                        <Text style={styles.fbLoginText}>Login with Colin</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.login.bind(this, '-KPzFJ697NbkNZoHVBR8')} style={styles.fbLogin}>
                        <Text style={styles.fbLoginText}>Login with Dan</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.login.bind(this, '-KPzFJ697NbkNZoHVBR9')} style={styles.fbLogin}>
                        <Text style={styles.fbLoginText}>Login with Red</Text>
                    </TouchableHighlight>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 120,
        backgroundColor: '#3498db',
        alignItems: 'center'
    },
    fbLogin: {
        backgroundColor: '#4267B2',
        marginTop: 40,
        padding: 20
    },
    fbLoginText: {
        color: '#fff'
    }
});

export default connect()(Login);