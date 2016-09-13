
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Spinner, CardSwiper, View, Text } from 'native-base';

import SwiperController from '../lib/controllers/swiper.js';

import Card from './../components/card.js';

export default class Swiper extends Component {
    static navigatorButtons = {
        leftButtons: [{
            icon: require('../../img/navicon_menu.png'),
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
        navBarButtonColor: '#666',
        drawUnderTabBar: true
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
                this.props.navigator.showModal({
                    title: 'Create a Convo',
                    screen: "example.NewConvo"
                });
            /*
            this.props.navigator.toggleDrawer({
                side: 'left',
                animated: true
            });*/
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
                screen: 'example.inbox'
            })
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
                <View style={ styles.cardViewer }>
                    <CardSwiper
                        onSwipeRight={this.swipeRight}
                        onSwipeLeft={this.swipeLeft}
                    >
                        <Card cardData={this.state.cardDeck[this.state.activeCard]}/>
                    </CardSwiper>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    cardViewer: {
        backgroundColor: '#fff',
        padding: 10,
        flex: 1
    }
});
