
import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, Image, StyleSheet, Dimensions, ListView, Text, View } from 'react-native';

import {connect} from 'react-redux';
import * as appActions from '../../src/reducers/app/actions';

class Login extends Component {

    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    login() {
        this.props.dispatch(appActions.login());
    }

    render() {
        return (
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('../../img/logo-big.png')} />
                    <TouchableHighlight onPress={this.login} style={styles.fbLogin}>
                        <Text style={styles.fbLoginText}>Login with Facebook</Text>
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