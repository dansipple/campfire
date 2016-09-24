
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
                        <Image style={styles.thumbnailImg} source={{ uri: user.avatar }}/>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.nameAndTime}>
                            <Text style={styles.name}>{this.props.conversationData.user.first} {this.props.conversationData.user.last}</Text>
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
        fontSize: 19
    },
    message: {
        fontWeight: '300',
        lineHeight: 15,
        height: 15
    }
});
