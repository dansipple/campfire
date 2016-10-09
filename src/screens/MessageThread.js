
import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';

import { Container, Content, Thumbnail, Text, Button, Icon, List, ListItem, View } from 'native-base';

import Card from './../components/Card';

export default class MessageThread extends Component {

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
        this.renderFooter = this.renderFooter.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderCustomView = this.renderCustomView.bind(this);
    }

    componentWillMount() {
        this._isMounted = true;

        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hi Dan, you have a new connection! Talk to Red and see if you two match.',
                    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                    user: {
                        _id: 2,
                        name: 'Dan Sipple'
                    },
                    card: {
                        creator: {
                            first: 'Dan',
                            last: 'Sipple',
                            title: 'Cofounder at Convos Inc.',
                            avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/4/005/078/320/2a2a329.jpg'
                        },
                        content: 'Does anyone here go to burning man? Show me the ropes?',
                        category: 'travel'
                    }
                }
            ]
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onLoadEarlier() {
        this.setState((previousState) => {
            return {
                isLoadingEarlier: true
            };
        });
    }

    onSend(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages)
            };
        });
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
                        backgroundColor: '#3498db',
                        padding: 6
                    },
                    left: {
                        padding: 6,
                        backgroundColor: props.currentMessage.card ? '#fff' : '#f0f0f0',
                        marginRight: props.currentMessage.card ? 5 : 60,
                        paddingBottom: props.currentMessage.card && this.state.messages.length == 1 ? 60 : 6
                    }
                }}
            />
        );
    }

    renderCustomView(props) {
        if (props.currentMessage.card) {
            return (
                <View style={{ flex: 1}}>
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
                    messages={this.state.messages}
                    onSend={this.onSend}
                    loadEarlier={this.state.loadEarlier}
                    onLoadEarlier={this.onLoadEarlier}
                    isLoadingEarlier={this.state.isLoadingEarlier}

                    user={{
                      _id: 1 // sent messages should have same user._id
                    }}
                    renderCustomView={this.renderCustomView}
                    renderBubble={this.renderBubble}
                    renderFooter={this.renderFooter}
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
