
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { CardSwiper, View } from 'native-base';

import UserModel from '../lib/models/user.js';

import Card from './card.js';

export default class Swiper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeCard: 0
        };

        this.swipeLeft = this.swipeLeft.bind(this);
        this.swipeRight = this.swipeRight.bind(this);
    }

    swipeLeft() {
        console.log('Swiped Left');
        this.nextCard();
    }

    swipeRight() {
        UserModel.get(function(err, users) {
            console.log(users);
        });
        this.nextCard();
    }

    nextCard() {
        this.setState({
            activeCard: this.state.activeCard + 1
        })
    }

    render() {

        return (
            <View style={ styles.cardViewer }>
                <CardSwiper
                    onSwipeRight={this.swipeRight}
                    onSwipeLeft={this.swipeLeft}
                >
                    <Card cardData={cards[this.state.activeCard]}/>
                </CardSwiper>
            </View>
        );
    }
}

const cards = [
    {
        name: 'Colin Brauns',
        title: 'Senior Recruiter',
        description: 'I\'d love to talk about space exploration. Mars anyone?',
        avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/005/08d/1f5/0fe67d4.jpg'
    },
    {
        name: 'Colin Brauns',
        title: 'Senior Recruiter',
        description: 'Anyone into stranger things? Let\'s talk.',
        avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/005/08d/1f5/0fe67d4.jpg'
    }
];

const styles = StyleSheet.create({
    cardViewer: {
        padding: 10
    }
});
