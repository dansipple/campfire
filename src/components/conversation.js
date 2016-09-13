
import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

import { Card, CardItem, Thumbnail, Text, View } from 'native-base';

export default class conversation extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.conversationData) {
            let conversationData = this.props.conversationData || {};
            let user = conversationData.user || {};
            return (
                <View style={styles.conversation}>
                    <View style={styles.thumbnail}>
                        <Thumbnail style={styles.thumnailImg} size={50} source={{ uri: user.avatar }}/>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.time}>Sep 3rd</Text>
                        <Text style={styles.name}>{this.props.conversationData.user.first} {this.props.conversationData.user.last}</Text>
                        <Text style={styles.message}>{this.props.conversationData.lastMessage}</Text>
                    </View>
                </View>
            );
        }
        else {
            return null;
        }

    }
}

const styles = StyleSheet.create({
    conversation: {
        flex: 1,
        padding: 10,
        paddingTop: 0,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc'
    },
    thumbnail: {
        flex: 0.2,
        padding: 3,
        paddingTop: 20
    },
    thumbnailImg: {
        borderWidth: 3,
        borderColor: '#999'
    },
    content: {
        flex: 0.8
    },
    time: {
        fontSize: 12,
        textAlign: 'right',
        fontWeight: '300'
    },
    name: {
        fontWeight: '500',
        lineHeight: 17,
        paddingBottom: 5,
        fontSize: 17
    },
    message: {
        fontWeight: '300',
        lineHeight: 15,
        height: 15
    }
});

