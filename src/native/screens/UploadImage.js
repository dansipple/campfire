import React, { Component } from 'react';
import { Platform, Image, StyleSheet, ScrollView, View, Text, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';

import {connect} from 'react-redux';

import firebase from '../../lib/firebase';

import UserController from '../../lib/controllers/user';

import RNFetchBlob from 'react-native-fetch-blob';

var Analytics = require('react-native-firebase-analytics');

var ImagePicker = require('react-native-image-picker');

import * as settingsActions from '../reducers/settings/actions';

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class UploadImage extends Component {

    constructor(props) {
        super(props);

        this.cancel = this.cancel.bind(this);
        this.upload = this.upload.bind(this);
    }

    componentDidMount() {

        //Analytics.logEvent('MODAL_OPEN', {'id': 'report'});
    }

    cancel() {
        this.props.navigator.dismissLightBox();
    }
    upload() {
        var options = {
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchImageLibrary(options, (response)  => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                // You can display the image using either data...
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                // or a reference to the platform specific asset location
                if (Platform.OS === 'ios') {
                    const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                } else {
                    const source = {uri: response.uri, isStatic: true};
                }

                this.uploadImage(response.uri).then((url) => {
                    /*firebase.app.database().ref('/users/'+this.props.appState.currentUser._id)
                        .update({
                            avatar: url
                        });
                    */
                    UserController.updateAvatar(url, this.props.appState.currentUser._id);
                    this.props.dispatch(settingsActions.loadSettings());
                });
            }
        });
        this.props.navigator.dismissLightBox();
    }

    uploadImage(uri, mime = 'application/octet-stream') {
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
            let uploadBlob = null;
            const sessionId = new Date().getTime();
            const imageRef = firebase.storage.ref('avatars').child(this.props.appState.currentUser._id +'.jpg');


            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` });
                })
                .then((blob) => {
                    uploadBlob = blob;

                    var uploadTask = imageRef.put(blob, { contentType: mime });
                    return uploadTask;
                })
                .then(() => {
                    uploadBlob.close();
                    return imageRef.getDownloadURL();
                })
                .then((url) => {
                    resolve(url);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    };


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttons}>
                    <TouchableHighlight style={[styles.button,{backgroundColor: '#3498db'}]} onPress={this.upload}>
                        <Text style={[styles.buttonText, {color: '#fff'}]}>Choose from camera roll</Text>
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

function mapStateToProps(state) {
    return {
        appState: state.app
    };
}

export default connect(mapStateToProps)(UploadImage);