import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions, TouchableOpacity } from 'react-native';

import { Spinner, CardSwiper } from 'native-base';


import Profile from './../components/profile';

export default class ProfileViewer extends Component {
    static navigatorButtons = {
        leftButtons: [{
            icon: require('../../img/three_selected.png'),
            id: 'menu'
        }],
        rightButtons: [
            {
                icon: require('../../img/more.png'),
                id: 'more'
            },
            {
                icon: require('../../img/chat.png'),
                id: 'chat'
            }
        ]
    };
    static navigatorStyle = {
        navBarButtonColor: '#777',
        navBarNoBorder: true,
        drawUnderNavBar: true,
        statusBarHidden: true
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            activeCard: 0,
            cardDeck: [],
            err: false
        };
    }

    onNavigatorEvent(event) {
        if (event.id == 'menu') {
            /*
             this.props.navigator.toggleDrawer({
             side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
             animated: true // does the toggle have transition animation or does it happen immediately (optional)
             });
             */
            this.props.navigator.push({
                title: 'Your Convos',
                backButtonTitle: 'Back',
                screen: 'MyConvos'
            });
        }
        if (event.id == 'more') {
            this.props.navigator.toggleDrawer({
                side: 'right',
                animated: true
            });
        }
        if (event.id == 'chat') {
            this.props.navigator.push({
                title: 'Messages',
                backButtonTitle: 'Back',
                screen: 'Inbox'
            });
        }
    }

    swipeLeft() {
        this.nextCard();
    }

    swipeRight() {
        this.nextCard();
    }

    nextCard() {
        if(this.state.activeCard < this.state.cardDeck.length - 1) {
            this.setState({
                activeCard: this.state.activeCard + 1
            })
        } else {
            this.loadCards();
        }
    }

    loadCards() {
        this.setState({
            isLoading: true
        }, () => {
            let profileCards = [
                {
                    first: 'Colin',
                    last: 'Brauns',
                    title: 'Cofounder at Convos Inc.',
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/005/08d/1f5/0fe67d4.jpg'
                },
                {
                    first: 'Red',
                    last: 'Rainey',
                    title: 'Film Director',
                    avatar: 'https://media.licdn.com/media/p/4/005/097/089/0bebe5a.jpg'
                }
            ];
            this.setState({
                cardDeck: profileCards,
                activeCard: 0,
                isLoading: false
            })
        });

    }

    componentWillMount() {
        this.loadCards();
    }

    render() {

        if(this.state.isLoading) {
            return (
                <View style={ styles.cardViewer }>
                    <Spinner color="#666" />
                </View>
            )
        } else {
            let {height, width} = Dimensions.get('window');
            return (
                <View style={{ width: width, height: height - 30 }}>
                    <TouchableOpacity style={styles.top} onPress={() => this.props.navigator.dismissLightBox()}>
                        <Text style={styles.closeButton}>x</Text>
                    </TouchableOpacity>
                    <Profile profileData={this.state.cardDeck[this.state.activeCard]}/>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    top: {
        padding: 10 ,
        zIndex: 1
    },
    closeButton: {
        color: '#fff',
        textAlign: 'right',
        fontSize: 25
    },
    count: {
        color: '#fff'
    }
});
