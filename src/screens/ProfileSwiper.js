import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView, View, Text, Dimensions, TouchableOpacity } from 'react-native';

import { Spinner, CardSwiper } from 'native-base';

import Swiper from 'react-native-swiper';

import Profile from './../components/profile';

export default class ProfileSwiper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            activeCard: 1,
            cardDeck: [],
            err: false
        };

        this.pass = this.pass.bind(this);
        this.match = this.match.bind(this);
    }

    nextCard() {
        if(this.state.activeCard < this.state.cardDeck.length) {
            this.setState({
                activeCard: this.state.activeCard + 1
            });
            this.swiper.scrollBy(1);
        } else {
            this.props.navigator.dismissLightBox();
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
                activeCard: 1,
                isLoading: false
            })
        });

    }

    componentWillMount() {
        this.loadCards();
    }

    pass() {
        this.nextCard();
    }

    match() {
        this.nextCard();
    }

    render() {

        const that = this;

        if(this.state.isLoading) {
            return (
                <View style={ styles.cardViewer }>
                    <Spinner color="#666" />
                </View>
            )
        } else {
            let {height, width} = Dimensions.get('window');
            return (
                <View style={{ width: width, height: height }}>
                    <TouchableOpacity style={styles.top} onPress={() => this.props.navigator.dismissLightBox()}>
                        <Text style={styles.count}>{this.state.activeCard} of {this.state.cardDeck.length}</Text>
                        <Image style={styles.closeButton} source={require('../../img/close.png')} />
                    </TouchableOpacity>
                        <Swiper
                            ref={component => this.swiper = component}
                            horizontal={true}
                            loop={false}
                            scrollEnabled={false}
                            showsPagination={false}
                            loadMinimal={true}
                            index={0}>

                            {this.state.cardDeck.map(function(card, i){
                                return(
                                    <View key={i} style={{height: height - 50}}>
                                        <Profile convos={cards[i]} pass={that.pass} match={that.match} profileData={card}/>
                                    </View>
                                );
                            })}
                        </Swiper>
                </View>
            );
        }
    }
}

const cards = [
    [
        {
            category: 'art',
            content: 'I want to learn about art. Anyone want to checkout some new exhibits at the MET?'
        },
        {
            category: 'business',
            content: 'I want to learn about investing. Now that I have a steady income I want to be smart about it. Can anyone help me?'
        },
    ],
    [
        {
            category: 'science',
            content: 'Was pangea a real thing? What do you think the earth looked like a million years ago?'
        },
        {
            category: 'travel',
            content: 'I\'m planning a backpacking trip through South America. Am I following in your footsteps? Any tips?'
        }
    ]
]

const styles = StyleSheet.create({
    top: {
        padding: 20,
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    closeButton: {
        tintColor: '#fff',
    },
    count: {
        color: '#fff'
    }
});
