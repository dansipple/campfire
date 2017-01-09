
import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, TextInput, Image, StyleSheet, Text, View } from 'react-native';

import {connect} from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as appActions from '../../src/reducers/app/actions';

import * as settingsActions from '../../src/reducers/settings/actions';

class Settings extends Component {

    static navigatorStyle = {
        navBarButtonColor: '#666'
    };

    static navigatorButtons = {
        rightButtons: [{
            title: 'Save',
            id: 'save'
        }]
    };

    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);
        this.showTC = this.showTC.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);
    }

    logOut() {
        this.props.dispatch(appActions.logOut());
    }

    updateUserData(key, text) {
        this.props.dispatch(settingsActions.updateUserData(key, text));
    }

    saveUser(key, event) {
        this.props.dispatch(settingsActions.saveSettings(key, event.nativeEvent.text));
    }

    componentWillMount() {
        this.props.dispatch(settingsActions.loadSettings());
    }

    uploadAvatar() {
        this.props.navigator.showLightBox({
            screen: "UploadImage", // unique ID registered with Navigation.registerScreen
            passProps: {
            }, // simple serializable object that will pass as props to the lightbox (optional)
            style: {
                backgroundBlur: "none",
                backgroundColor: "rgba(0,0,0,0.6)"
            }
        });
    }

    showTC() {
        this.props.navigator.showModal({
            screen: 'TermsAndConditions',
            title: 'Terms and Conditions'
        })
    }

    render() {
        const currentUser = this.props.state.userData || {};

        return (
            <KeyboardAwareScrollView style={{ backgroundColor: '#eee'}}>
                <View style={{backgroundColor: '#fff', marginTop: 50, height: 80}}>
                </View>
                <View style={{flexDirection: 'row', marginTop: -105}}>
                    <TouchableOpacity onPress={this.uploadAvatar} style={{ width: 110, height: 90, paddingTop: 10, paddingLeft: 15, paddingRight: 5}}>
                        <Image style={{width: 90, height: 90, borderRadius: 45}} source={ currentUser.avatar ? {uri: currentUser.avatar} : require('../../img/no-avatar.png')} />
                    </TouchableOpacity>
                    <View style={{flex: 1, paddingRight: 10, backgroundColor: 'transparent'}}>
                        <View style={{height: 25, justifyContent: 'center'}}>
                            <Text style={styles.label}>Name</Text>
                        </View>
                        <View style={{borderColor: '#eee', borderBottomWidth: 1}}>
                            <TextInput
                                style={styles.input}
                                onChangeText={this.updateUserData.bind(this, 'first')}
                                onEndEditing={this.saveUser.bind(this, 'first')}
                                value={currentUser.first}
                                multiline={false}
                                placeholder={'First Name'}
                            />
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={this.updateUserData.bind(this, 'last')}
                            onEndEditing={this.saveUser.bind(this, 'last')}
                            value={currentUser.last}
                            multiline={false}
                            placeholder={'Last Name'}
                        />
                    </View>
                </View>
                <View style={{marginTop: 15}}>
                    <Text style={styles.label}>Role</Text>
                    <View style={{backgroundColor: '#fff'}}>
                        <TextInput
                            style={styles.input}
                            onChangeText={this.updateUserData.bind(this, 'title')}
                            onEndEditing={this.saveUser.bind(this, 'title')}
                            value={currentUser.title}
                            placeholder={'Ex. Marketing Associate'}
                        />
                    </View>
                </View>
                <View style={{marginTop: 15}}>
                    <Text style={styles.label}>College</Text>
                    <View style={{backgroundColor: '#fff'}}>
                        <TextInput
                            style={styles.input}
                            onChangeText={this.updateUserData.bind(this, 'college')}
                            onEndEditing={this.saveUser.bind(this, 'college')}
                            value={currentUser.college}
                            placeholder={'College'}
                        />
                    </View>
                </View>
                <View style={{marginTop: 15}}>
                    <Text style={styles.label}>Email (Not publicly visible)</Text>
                    <View style={{backgroundColor: '#fff'}}>
                        <TextInput
                            style={styles.input}
                            onChangeText={this.updateUserData.bind(this, 'email')}
                            onEndEditing={this.saveUser.bind(this, 'email')}
                            value={currentUser.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder={'Email Address'}
                        />
                    </View>
                </View>
                <View style={{marginTop: 50}}>
                    <TouchableHighlight
                        onPress={this.showTC}
                        underlayColor={'#f9f9f9'}
                        style={{justifyContent: 'center', height: 40, backgroundColor: '#fff'}}
                    >
                        <Text style={{color: '#666', textAlign: 'center', fontSize: 17}}>Terms And Conditions</Text>
                    </TouchableHighlight>
                </View>
                <View style={{marginTop: 10}}>
                    <TouchableHighlight
                        onPress={this.logOut}
                        underlayColor={'#f9f9f9'}
                        style={{justifyContent: 'center', height: 40, backgroundColor: '#fff'}}
                    >
                        <Text style={{color: 'red', textAlign: 'center', fontSize: 17}}>Log Out</Text>
                    </TouchableHighlight>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 16,
        color: '#444'
    },
    label : {
        color: '#666',
        paddingLeft: 10,
        paddingBottom: 5
    }
});

function mapStateToProps(state) {
    return {
        state: state.settings
    };
}

export default connect(mapStateToProps)(Settings);