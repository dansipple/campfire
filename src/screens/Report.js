import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView, View, Text, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';

import {connect} from 'react-redux';

import * as profileSwiperActions from '../reducers/profileSwiper/actions';

import * as myConvosActions from '../reducers/myConvos/actions';

var Analytics = require('react-native-firebase-analytics');

class Report extends Component {

    constructor(props) {
        super(props);

        this.cancel = this.cancel.bind(this);
        this.report = this.report.bind(this);
    }

    componentDidMount() {

        //Analytics.logEvent('MODAL_OPEN', {'id': 'report'});
    }

    cancel() {
        this.props.navigator.dismissLightBox();
    }
    report() {
        this.props.report();
        this.props.navigator.dismissLightBox();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttons}>
                    <TouchableHighlight style={[styles.button,{backgroundColor: 'rgba(234, 48, 87, 0.9)'}]} onPress={this.report}>
                        <Text style={[styles.buttonText, {color: '#fff'}]}>Report</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.button} onPress={this.cancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    buttons: {
        flexDirection: 'column'
    },
    button: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 4,
        marginBottom: 10
    },
    buttonText: {
        color: '#666',
        textAlign: 'center'
    }
});

export default Report;