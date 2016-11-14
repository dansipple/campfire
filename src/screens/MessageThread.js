
import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions, View, Text } from 'react-native';
import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';

import Card from './../components/Card';

import * as messagesActions from '../reducers/messages/actions';

import {connect} from 'react-redux';

class MessageThread extends Component {

    static navigatorStyle = {
        navBarNoBorder: false
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
        this.props.navigator.toggleTabs({
            to: 'shown'
        });
    }

    componentDidMount() {
        this._isMounted = true;
        this.props.navigator.toggleTabs({
            to: 'hidden'
        });

        if(!this.props.messagesState.messages[this.props.conversationId])
            this.props.dispatch(messagesActions.loadMessages(this.props.conversationId));

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
                        marginLeft: props.currentMessage.card ? 5 : 60,
                        marginRight: 5,
                        paddingBottom: props.currentMessage.card &&
                        this.props.messagesState.messages[this.props.conversationId].length == 1 ? 60 : 6
                    },
                    left: {
                        padding: 6,
                        backgroundColor: props.currentMessage.card ? '#fff' : '#f0f0f0',
                        marginRight: props.currentMessage.card ? 5 : 60,
                        marginLeft: 5,
                        paddingBottom: props.currentMessage.card &&
                        this.props.messagesState.messages[this.props.conversationId].length == 1 ? 60 : 6
                    }
                }}
            />
        );
    }

    renderCustomView(props) {
        if (props.currentMessage.card) {
            let {width} = Dimensions.get('window');
            return (
                <View style={{flexDirection: 'row', width: width - 35}}>
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
            <View style={{ flex: 1 }}>
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
