
import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Spinner, CardSwiper } from 'native-base';

import SwiperController from '../lib/controllers/swiper.js';

import Card from './../components/card.js';

export default class ConvoSwiper extends Component {
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
        drawUnderNavBar: true
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            activeCard: 0,
            cardDeck: [],
            err: false
        };

        this.swipeLeft = this.swipeLeft.bind(this);
        this.swipeRight = this.swipeRight.bind(this);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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
            SwiperController.getCards('-KPzFJ697NbkNZoHVBR7', '-KPzFYEKdj3yRQn3teTP').then(
                (cards) => {
                    this.setState({
                        cardDeck: cards,
                        activeCard: 0,
                        isLoading: false
                    })
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this.setState({
                        isLoading: false
                    })
                }
            );
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
            return (
                <View>
                    <LinearGradient colors={['#fff', '#ecf0f9']} style={ styles.cardViewer }>
                        <CardSwiper
                            onSwipeRight={this.swipeRight}
                            onSwipeLeft={this.swipeLeft}
                            style={{zIndex: 5}}
                        >
                            <Card cardData={this.state.cardDeck[this.state.activeCard]}/>
                        </CardSwiper>
                        <View style={styles.currentNetworkContainer}>
                            <Text style={styles.currentNetworkText}>HackerNest NYC</Text>
                        </View>
                    </LinearGradient>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    cardViewer: {
        padding: 15,
        paddingTop: 5,
        flexDirection: 'column',
        flex: 1
    },
    currentNetworkContainer: {
        padding: 15
    },
    currentNetworkText: {
        backgroundColor: 'transparent',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
        color: '#666'
    }
});
