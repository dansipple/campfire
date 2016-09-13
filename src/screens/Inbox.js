
import React, { Component } from 'react';
import { TouchableHighlight, Image, StyleSheet, Dimensions, ListView, View } from 'react-native';
import { Container, Content, Thumbnail, Text, Button, Icon, List, ListItem} from 'native-base';

import Conversation from '../components/conversation';

export default class Inbox extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        ds = ds.cloneWithRows([{
            id: 'fdfasf',
            user: {
                first: 'Red',
                last: 'Rainey',
                email: 'colin@findconvos.com',
                avatar: 'https://media.licdn.com/media/p/4/005/097/089/0bebe5a.jpg'
            },
            lastMessage: 'Hey man check this out!'
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
                    first: 'Colin',
                    last: 'Brauns',
                    email: 'colin@findconvos.com',
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/005/08d/1f5/0fe67d4.jpg'
                },
                lastMessage: 'Hey man check this out!'
            }]);
        this.state = {
            conversations: ds
        };
        this._isMounted = false;

        this._renderRow = this._renderRow.bind(this);

        //this.selectConversation = this.selectConversation.bind(this);
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
            <ListView
                dataSource={this.state.conversations}
                renderRow={this._renderRow}
                style={{ flex: 1 }}
            />
        );
    }
    _onPress(conversationData) {
        this.props.navigator.push({
            title: conversationData.user.first,
            backButtonTitle: 'Back',
            screen: 'example.MessageThread'
        })
    }
}

const styles = StyleSheet.create({

});
