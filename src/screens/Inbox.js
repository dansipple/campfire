
import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, Image, StyleSheet, Dimensions, ListView, Text, View } from 'react-native';

import Conversation from '../components/conversation';

export default class Inbox extends Component {

    static navigatorStyle = {
        navBarButtonColor: '#777',
        statusBarTextColorScheme: 'dark'
    };

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        ds = ds.cloneWithRows([{
            id: 'fdfasf',
            user: {
                first: 'Emily',
                last: 'Sullivan',
                email: 'colin@findconvos.com',
                avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg'
            },
            lastMessage: 'Hey check this out!'
        },
            {
                id: 'fdfasf',
                user: {
                    first: 'Colin',
                    last: 'Brauns',
                    email: 'colin@findconvos.com',
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/005/08d/1f5/0fe67d4.jpg'
                },
                lastMessage: 'Hey man check this out!'
            },
            {
                id: 'fdfasf',
                user: {
                    first: 'Jeff',
                    last: 'Hamilton',
                    email: 'colin@findconvos.com',
                    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg'
                },
                lastMessage: 'Hey man check this out!'
            },
            {
                id: 'fdfasf',
                user: {
                    first: 'Red',
                    last: 'Rainey',
                    email: 'colin@findconvos.com',
                    avatar: 'https://media.licdn.com/media/p/4/005/097/089/0bebe5a.jpg'
                },
                lastMessage: 'Hey man check this out!'
            }]);
        this.state = {
            conversations: ds
        };
        this._isMounted = false;

        this._renderRow = this._renderRow.bind(this);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        //this.selectConversation = this.selectConversation.bind(this);
    }

    onNavigatorEvent(event) {
        if (event.id == 'back') {
            this.props.navigator.pop();
        }
    }

    _renderRow(conversationData, sectionID, rowID) {
        return (
            <TouchableHighlight onPress={() => this._onPress(conversationData)} underlayColor="#f6f6f6">
                <View>
                    <Conversation conversationData={conversationData} />
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
                <View style={{ flex: 1 }}>
                    <ListView
                        dataSource={this.state.conversations}
                        renderRow={this._renderRow}
                        style={{ flex: 1 }}
                        renderHeader={() => {
                            return (
                                <View>
                                    <View style={styles.newMatchContainer}>
                                        <Text style={{fontSize: 11, textAlign: 'center', color: '#888', padding: 10}}>New Matches</Text>
                                        <View style={styles.newMatchRow}>
                                            <TouchableOpacity onPress={() => this._onPress({user: {first: 'Charlie'}})}>
                                                <Image style={styles.newMatchThumnnail} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/jadlimcaco/128.jpg'}} />
                                                <Text style={{textAlign: 'center'}}>Charlie</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Text style={{fontSize: 11, textAlign: 'center', color: '#888', padding: 10}}>Messages</Text>
                                </View>
                            );
                        }}
                    />
                </View>
        );
    }
    _onPress(conversationData) {
        this.props.navigator.push({
            title: conversationData.user.first,
            screen: 'MessageThread',
            backButtonTitle: ''
        })
    }
}

const styles = StyleSheet.create({
    newMatchContainer: {
        //flex: 0.2,
        padding: 10,
        paddingTop: 2,
        backgroundColor: '#eee',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    newMatchRow: {
        flex: 1,
        padding: 5,
        flexDirection: 'row'
    },
    newMatchThumnnail: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginBottom: 5
    }
});
