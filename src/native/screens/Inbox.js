
import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, Image, StyleSheet, Dimensions, ListView, Text, View, RefreshControl } from 'react-native';

import Conversation from '../components/Conversation';
import Nav from '../components/Nav';

import * as inboxActions from '../reducers/inbox/actions';

import MessagesController from '../../lib/controllers/messages';

import {connect} from 'react-redux';

class Inbox extends Component {


    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds
        };
        this._isMounted = false;

        this._renderRow = this._renderRow.bind(this);

        this.loadConversations = this.loadConversations.bind(this);

    }

    loadConversations() {
        this.props.dispatch(inboxActions.loadConversations());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.state.conversations !== this.props.state.conversations) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.state.conversations)
            });
            const unread = nextProps.state.conversations.filter((conversation) => {
                return conversation.isUnread === true;
            });

            this.props.navigator.setTabBadge({
                badge: unread.length ? unread.length : null
            });
        }

    }

    componentDidMount() {
        this.loadConversations();
    }

    selectConversation(conversationData) {
        this.props.navigator.push({
            title: conversationData.participant.first,
            screen: 'MessageThread',
            backButtonTitle: '',
            passProps: {
                conversationId: conversationData.conversationId,
                isUnread: conversationData.isUnread || false,
                otherUser: conversationData._id,
                loadConversations: this.loadConversations
            }
        });
        if(conversationData.isUnread) {
            MessagesController.markAsRead(this.props.appState.currentNetwork._id, this.props.appState.currentUser._id, conversationData._id);
        }
    }

    _renderRow(conversationData) {
        return (
            <TouchableHighlight onPress={() => this.selectConversation(conversationData)} underlayColor="#f6f6f6">
                <View>
                    <Conversation conversationData={conversationData} />
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Nav currentNetwork={this.props.appState.currentNetwork} navigator={this.props.navigator} />
                <View style={{ flex: 1 }}>
                    {this.props.state.conversations.length ?
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow}
                            style={{ flex: 1 }}
                            refreshControl={
                              <RefreshControl
                                refreshing={this.props.state.isLoading}
                                onRefresh={this.loadConversations}
                                style={{ backgroundColor: 'transparent' }}
                              />
                            }
                        /> :
                        <TouchableOpacity style={{ flex: 1, backgroundColor: '#eee'}} onPress={() => this.loadConversations()}>
                            <View style={{flex:1 , alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{tintColor: '#ccc', marginBottom: 15}} source={require('../../../img/empty-chat.png')} />
                                <Text style={styles.noMessages}>You have no messages</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    noMessages: {
        fontSize: 20,
        textAlign: 'center',
        color: '#666'
    },
    newMatchContainer: {
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
    newMatchThumbnail: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginBottom: 5
    }
});

function mapStateToProps(state) {
    return {
        state: state.inbox,
        appState: state.app
    };
}

export default connect(mapStateToProps)(Inbox);