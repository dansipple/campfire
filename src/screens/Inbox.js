
import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, Image, StyleSheet, Dimensions, ListView, Text, View, RefreshControl } from 'react-native';

import Conversation from '../components/Conversation';

import * as inboxActions from '../reducers/inbox/actions';

import {connect} from 'react-redux';

class Inbox extends Component {

    static navigatorStyle = {
        navBarButtonColor: '#666',
    };

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds
        };
        this._isMounted = false;

        this._renderRow = this._renderRow.bind(this);

        this.loadConversations = this.loadConversations.bind(this);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../../img/grid.png'),
                title: 'Networks',
                id: 'networks'
            }
        ]
    };

    onNavigatorEvent(event) {
        if (event.type == 'DeepLink') {
            this.handleDeepLink(event);
        } else {
            switch (event.id) {
                case 'add':
                    this.props.navigator.showModal({
                        title: 'New Convo',
                        screen: 'NewConvo'
                    });
                    break;

                case 'networks':
                    this.props.navigator.showModal({
                        title: 'Networks',
                        screen: 'ChooseNetwork'
                    });
                    break;

                default:
                    console.log('Unhandled event ' + event.id);
                    break;
            }
        }
    }

    loadConversations() {
        this.props.dispatch(inboxActions.loadConversations());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.state.conversations !== this.props.state.conversations) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.state.conversations)
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
                hasUnread: conversationData.hasUnread || false,
                otherUser: conversationData._id,
                loadConversations: this.loadConversations
            }
        });
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
    renderHeader() {
        return (
            <View>
                <View style={styles.newMatchContainer}>
                    <Text style={{fontSize: 11, textAlign: 'center', color: '#888', padding: 10}}>New Connections</Text>
                    <View style={styles.newMatchRow}>
                        <TouchableOpacity onPress={() => {}}>
                            <Image style={styles.newMatchThumbnail} source={{uri: 'https://media.licdn.com/media/p/4/005/097/089/0bebe5a.jpg'}} />
                            <Text style={{textAlign: 'center'}}>Red</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{fontSize: 11, textAlign: 'center', color: '#888', padding: 10}}>Messages</Text>
            </View>
        );
    }

    render() {
        return (
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
                          />
                        }
                    /> : <View />}
                </View>
        );
    }
}

const styles = StyleSheet.create({
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
        state: state.inbox
    };
}

export default connect(mapStateToProps)(Inbox);