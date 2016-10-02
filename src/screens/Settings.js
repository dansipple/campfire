
import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, Image, StyleSheet, Dimensions, ListView, Text, View } from 'react-native';

export default class Settings extends Component {

    static navigatorStyle = {
        navBarButtonColor: '#777',
        statusBarTextColorScheme: 'dark'
    };

    constructor(props) {
        super(props);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.id == 'back') {
            this.props.navigator.pop({
                animated: false
            });
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#eee' }}>

            </View>
        );
    }
}

const styles = StyleSheet.create({

});
