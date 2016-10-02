
import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, Image, StyleSheet, Dimensions, ListView, Text, View } from 'react-native';

export default class ChooseNetwork extends Component {
    static navigatorButtons = {
        leftButtons: [{
            title: 'Cancel',
            id: 'close'
        }],
        rightButtons: [{
            title: 'Find',
            id: 'find'
        }]
    };

    static navigatorStyle = {
        navBarButtonColor: '#777',
        navBarTextColor: '#666',
    };

    constructor(props) {
        super(props);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.id == 'close') {
            this.props.navigator.dismissModal();
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
