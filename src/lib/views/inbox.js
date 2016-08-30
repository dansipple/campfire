
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { CardSwiper, View } from 'native-base';


export default class Inbox extends Component {

    constructor(props) {
        super(props);

        this.state = {
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
        SwiperUtil.getCards('-KPzFYEKdj3yRQn3teTP').then(
            (cards) => {
                this.setState({
                    cardDeck: cards,
                    activeCard: 0
                })
            }
        ).catch(
            function(err) {
                console.log(err);
            }
        );
    }

    componentWillMount() {
        this.loadCards();
    }

    render() {

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

const styles = StyleSheet.create({
    cardViewer: {
        padding: 10,
        flex: 1
    }
});
