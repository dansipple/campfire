
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

import Colors from '../lib/utils/colors';

export default class Profile extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {height, width} = Dimensions.get('window');

        if (this.props.profileData) {
            let profileData = this.props.profileData || {};

            const styles = StyleSheet.create({
                profileContainer: {
                    flex: 1,
                    //flexDirection: 'column',
                    backgroundColor: '#f9f9f9',
                    borderTopLeftRadius: width/2,
                    borderTopRightRadius: width/2,
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,
                    borderColor: '#ddd',
                    borderWidth: 1
                },
                userInformation: {

                },
                thumbnailContainer: {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center'
                },
                thumbnail: {
                    borderRadius: 50,
                    borderColor: '#fff',
                    borderWidth: 5,
                    height: 100,
                    width: 100,
                    resizeMode: 'contain',
                    marginTop: -50
                },
                nameAndTitleContainer: {
                    paddingTop: 10,
                    backgroundColor: 'transparent'
                },
                name: {
                    fontSize: 22,
                    lineHeight: 25,
                    textAlign: 'center'
                },
                title: {
                    fontSize: 14,
                    textAlign: 'center',
                    color: '#666'
                },
                additionalInfo: {
                    backgroundColor: 'transparent',
                    paddingLeft: 20,
                    paddingRight: 20
                },
                userConvos: {
                    padding: 20,
                    paddingBottom: 0
                },
                convo: {
                    marginBottom: 10
                },
                convoContent: {
                    backgroundColor: '#17BBB0',
                    borderRadius: 4,
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingLeft: 10,
                    paddingRight: 10
                },
                convoContentText: {
                    color: '#fff',
                    fontSize: 14,
                    lineHeight: 16,
                    textAlign: 'center'
                }
            });

            return (
                <View style={styles.profileContainer}>
                    <View style={styles.userInformation}>
                        <View style={styles.thumbnailContainer}>
                            <Image style={styles.thumbnail} source={{ uri: profileData.avatar}} />
                        </View>
                        <View style={styles.nameAndTitleContainer}>
                            <Text style={styles.name}>{ profileData.first } { profileData.last }</Text>
                            <Text style={styles.title}>{ profileData.title }</Text>
                        </View>
                    </View>
                    <View style={styles.userConvos}>
                        <View style={styles.convo}>
                            <View style={styles.convoContent}>
                                <Text style={styles.convoContentText}>I want to do some experiments with bunsen burners</Text>
                            </View>
                        </View>
                        <View style={styles.convo}>
                            <View style={styles.convoContent}>
                                <Text style={styles.convoContentText}>Was pangea a real thing? What do you think the earth looked like a million years ago?</Text>
                            </View>
                        </View>

                    </View>
                </View>
            );
        }
        else {
            return null;
        }

    }
}
