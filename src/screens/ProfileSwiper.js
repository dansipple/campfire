import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView, View, Text, Dimensions, TouchableOpacity } from 'react-native';

import Swiper from 'react-native-swiper';

import Profile from './../components/Profile';

import {connect} from 'react-redux';

import * as profileSwiperActions from '../reducers/profileSwiper/actions';

class ProfileSwiper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cardDeck: [],
            activeCard: 1,
            isLoading: false
        };

        this.pass = this.pass.bind(this);
        this.connect = this.connect.bind(this);
        this.loadProfiles = this.loadProfiles.bind(this);
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

    loadProfiles() {
        this.props.dispatch(profileSwiperActions.loadProfiles(this.props.card.id));

        /*
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
        */
    }

    componentWillMount() {
        this.loadProfiles();
    }

    pass() {
        this.nextCard();
    }

    connect() {
        this.nextCard();
    }

    render() {
        const that = this;

        console.log(this.props.state.profiles);

        let {height, width} = Dimensions.get('window');
        if(this.props.state.profiles.length) {
            return (
                <View style={{ width: width, height: height }}>
                    <TouchableOpacity style={styles.top} onPress={() => this.props.navigator.dismissLightBox()}>
                        <Text style={styles.count}>{this.props.state.activeProfile}
                            of {this.props.state.profiles.length}</Text>
                        <Image style={styles.closeButton} source={require('../../img/close.png')}/>
                    </TouchableOpacity>
                    <Swiper
                        ref={component => this.swiper = component}
                        horizontal={true}
                        loop={false}
                        scrollEnabled={false}
                        showsPagination={false}
                        loadMinimal={true}
                        index={0}
                    >

                        {this.props.state.profiles.map(function (card, i) {
                            return (
                                <View key={i} style={{height: height - 50}}>
                                    <Profile convos={cards[i]} pass={that.pass} connect={that.connect}
                                             profileData={card}/>
                                </View>
                            );
                        })}
                    </Swiper>
                </View>
            );
        } else {
            return <View />
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
];

const styles = StyleSheet.create({
    top: {
        padding: 20,
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    closeButton: {
        tintColor: '#fff'
    },
    count: {
        color: '#fff'
    }
});

function mapStateToProps(state) {
    return {
        state: state.profileSwiper
    };
}

export default connect(mapStateToProps)(ProfileSwiper);