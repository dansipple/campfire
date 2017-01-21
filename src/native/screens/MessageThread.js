
import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions, View, Text } from 'react-native';
import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';

import Card from '../components/Card';

import * as messagesActions from '../reducers/messages/actions';

import {connect} from 'react-redux';

var Analytics = require('react-native-firebase-analytics');

class MessageThread extends Component {

    static navigatorStyle = {
        navBarNoBorder: false,
        tabBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loadEarlier: false,
            typingText: null,
            isLoadingEarlier: false
        };
        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        //this.renderCustomActions = this.renderCustomActions.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderCustomView = this.renderCustomView.bind(this);

    }

    componentWillUnmount() {
        this._isMounted = false;
        this.props.loadConversations();
    }

    componentDidMount() {
        this._isMounted = true;
        Analytics.logEvent('THREAD_VIEWED');

        if(!this.props.messagesState.messages[this.props.conversationId])
            this.props.dispatch(messagesActions.loadMessages(this.props.conversationId, this.props.isUnread));

    }

    onLoadEarlier() {
        this.setState((previousState) => {
            return {
                isLoadingEarlier: true
            };
        });
    }

    onSend(message = []) {
        this.props.dispatch(messagesActions.sendMessage(this.props.conversationId, message[0].text));
        Analytics.logEvent('MESSAGE_SEND');
    }

    renderFooter(props) {
        if (this.state.typingText) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        {this.state.typingText}
                    </Text>
                </View>
            );
        }
        return null;
    }
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: props.currentMessage.card ? '#fff' : '#3498db',
                        padding: 6,
                        marginLeft: props.currentMessage.card ? 10 : 60,
                        marginRight: 5,
                        height: props.currentMessage.card && this.props.messagesState.messages[this.props.conversationId].length == 1 ? Dimensions.get('window').height - 155 : null,
                        justifyContent: props.currentMessage.card && this.props.messagesState.messages[this.props.conversationId].length == 1 ? 'flex-start' : 'flex-end'
                    },
                    left: {
                        padding: 6,
                        backgroundColor: props.currentMessage.card ? '#fff' : '#f0f0f0',
                        marginRight: props.currentMessage.card ? 5 : 60,
                        marginLeft: props.currentMessage.card ? 1 : 5,
                        height: props.currentMessage.card && this.props.messagesState.messages[this.props.conversationId].length == 1 ? Dimensions.get('window').height - 155 : null,
                        justifyContent: props.currentMessage.card && this.props.messagesState.messages[this.props.conversationId].length == 1 ? 'flex-start' : 'flex-end'
                    }
                }}
            />
        );
    }

    renderCustomView(props) {
        if (props.currentMessage.card) {
            let {width} = Dimensions.get('window');
            return (
                <View style={{ width: width - 30}}>
                    <Card
                        inMessage={true}
                        cardData={props.currentMessage.card}
                        {...props}
                    />
                </View>
            );
        }
        else {
            return null;
        }

    }
    render() {
        return (
            <View style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height - 64}}>
                <GiftedChat
                    messages={this.props.messagesState.messages[this.props.conversationId] || []}
                    onSend={this.onSend}
                    loadEarlier={this.state.loadEarlier}
                    onLoadEarlier={this.onLoadEarlier}
                    isLoadingEarlier={this.state.isLoadingEarlier}
                    user={{
                      _id: this.props.appState.currentUser._id // sent messages should have same user._id
                    }}
                    renderCustomView={this.renderCustomView}
                    renderBubble={this.renderBubble}
                    renderFooter={() => {return null}}
                    renderTime={() => {return null}}
                    renderAvatar={() => {return null}}
                    bottomOffset={0}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    footerText: {
        fontSize: 14,
        color: '#aaa'
    }
});

function mapStateToProps(state) {
    return {
        messagesState: state.messages,
        appState: state.app
    };
}

export default connect(mapStateToProps)(MessageThread);
