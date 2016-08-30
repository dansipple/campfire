
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { CardSwiper, View, Text} from 'native-base';

import SwiperController from '../controllers/swiper.js';

import Card from './card.js';

export default class Swiper extends Component {

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
                function(err) {
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
                <Text>Loading</Text>
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
        padding: 10,
        flex: 1
    }
});
