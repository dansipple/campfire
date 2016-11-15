
import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, Image, StyleSheet, Dimensions, RefreshControl, ListView, Text, View } from 'react-native';

import * as networksActions from '../reducers/networks/actions';
import * as appActions from '../reducers/app/actions';

import {connect} from 'react-redux';

class CreateNetwork extends Component {

    static navigatorStyle = {
        navBarButtonColor: '#777',
        navBarTextColor: '#666'
    };

    constructor(props) {
        super(props);
        this._isMounted = false;


        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }

    onNavigatorEvent(event) {
        if (event.type == 'DeepLink') {
            this.handleDeepLink(event);
        } else {
            switch (event.id) {
                default:
                    console.log('Unhandled event ' + event.id);
                    break;
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#eee', paddingBottom: 30}}>

            </View>
        );
    }
}

const styles = StyleSheet.create({

});

function mapStateToProps(state) {
    return {
        state: state.networks,
        appState: state.app
    };
}

export default connect(mapStateToProps)(CreateNetwork);