
import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

import { Card, CardItem, Thumbnail, Text, View } from 'native-base';

export default class Conversation extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.conversationData) {
            let conversationData = this.props.conversationData || {};
            let user = conversationData.participant || {};
            return (
                <View style={styles.conversation}>
                    <View style={styles.thumbnail}>
                        <Image style={styles.thumbnailImg} source={ user.avatar ? { uri: user.avatar } : require('../../img/no-avatar.png')}/>
                        <View style={this.props.conversationData.isUnread && styles.unread} />
                    </View>
                    <View style={styles.content}>
                        <View style={styles.nameAndTime}>
                            <Text style={styles.name}>{user.first} {user.last}</Text>
                        </View>
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
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        height: 90
    },
    thumbnail: {
        width: 70,
        flexDirection: 'row',
        alignItems: 'center'
        //padding: 3
    },
    thumbnailImg: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
    content: {
        flex: 1,
        padding: 5,
        height: 76,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    nameAndTime: {
        flexDirection: 'row'
    },
    time: {
        fontSize: 12,
        textAlign: 'right',
        fontWeight: '300'
    },
    name: {
        fontWeight: '500',
        lineHeight: 22,
        paddingBottom: 5,
        fontSize: 17,
        color: '#555'
    },
    message: {
        fontWeight: '300',
        lineHeight: 15,
        height: 15,
        color: '#666'
    },
    unread: {
        backgroundColor: 'red',
        height: 12,
        width: 12,
        borderRadius: 6,
        marginLeft: -6,
        borderWidth: 1,
        borderColor: '#fff'
    }
});

