import React, { Component } from 'react';
import { Alert, TouchableOpacity, TouchableHighlight, StyleSheet, Image, View, Text} from 'react-native';

import Card from './../components/Card';
import EmptyCard from './../components/EmptyCard';
import DeckSwiper from './../components/DeckSwiper';
import Nav from './../components/Nav';
import Onboarding from './Onboarding';

import * as convoSwiperActions from '../reducers/convoSwiper/actions';
import * as appActions from '../reducers/app/actions';

import {connect} from 'react-redux';

var Analytics = require('react-native-firebase-analytics');

class ConvoSwiper extends Component {

    constructor(props) {
        super(props);

        this.swipeLeft = this.swipeLeft.bind(this);
        this.swipeRight = this.swipeRight.bind(this);
        this.loadConvos = this.loadConvos.bind(this);

        this.renderLoader = this.renderLoader.bind(this);
        this.renderDeck = this.renderDeck.bind(this);
        this.flagCard = this.flagCard.bind(this);
    }

    swipeLeft() {
        const nextCardKey = this.props.state.cardDeck[this.props.state.activeCard + 1]?
            this.props.state.cardDeck[this.props.state.activeCard + 1]._id : null;
        this.props.dispatch(convoSwiperActions.swipe(this.props.state.cardDeck[this.props.state.activeCard],
            nextCardKey, false));

        Analytics.logEvent('CONVO_SWIPE', {'direction': 'no'});
    }

    swipeRight() {
        const nextCardKey = this.props.state.cardDeck[this.props.state.activeCard + 1]?
            this.props.state.cardDeck[this.props.state.activeCard + 1]._id : null;
        this.props.dispatch(convoSwiperActions.swipe(this.props.state.cardDeck[this.props.state.activeCard],
            nextCardKey, true));

        Analytics.logEvent('CONVO_SWIPE', {'direction': 'yes'});
    }

    loadConvos() {
        this.props.dispatch(convoSwiperActions.loadConvos());
    }

    flagCard() {
        this.props.navigator.showLightBox({
            screen: "Report", // unique ID registered with Navigation.registerScreen
            passProps: {
                report: this.swipeLeft
            }, // simple serializable object that will pass as props to the lightbox (optional)
            style: {
                backgroundBlur: "none",
                backgroundColor: "rgba(0,0,0,0.6)"
            }
        });
    }


    componentDidMount() {
        /*this.props.navigator.showModal({
           screen: 'Onboarding' 
        });
        */
        this.loadConvos();
    }

    renderLoader() {
        return (
            <View style={{flex: 1}}>
                <EmptyCard />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15}}>
                    <View style={{borderColor: '#ddd', borderWidth: 1, marginRight: 10, justifyContent: 'center', alignItems:'center', width: 80, height: 80, backgroundColor: 'transparent', borderRadius: 40}}>
                        <Image source={require('../../img/close.png')} />
                    </View>
                    <View style={{borderColor: '#ddd', borderWidth: 1, marginRight: 10, justifyContent: 'center', alignItems:'center', width: 30, height: 30, backgroundColor: '#999', borderRadius: 15}}>
                        <Image style={{tintColor: '#fff', width: 12, height: 12}} source={require('../../img/flag.png')} />
                    </View>
                    <View style={{borderColor: '#ddd', borderWidth: 1, justifyContent: 'center', alignItems:'center', width: 80, height: 80, backgroundColor: 'transparent', borderRadius: 40}}>
                        <Image source={require('../../img/check.png')} />
                    </View>
                </View>
            </View>
        );
    }

    renderDeck() {
        const state = this.props.state;

        if(state.activeCard < state.cardDeck.length) {
            return (
                <View style={{flex: 1}}>
                    <DeckSwiper
                        onSwipeRight={this.swipeRight}
                        onSwipeLeft={this.swipeLeft}
                        topCard={state.cardDeck[state.activeCard]}
                        bottomCard={state.cardDeck[state.activeCard + 1]}
                        renderItem={(card)=> {
                        return (
                            <Card onFlag={this.onFlagCard} cardData={card}/>
                        )
                    }}
                    >
                    </DeckSwiper>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15}}>
                        <TouchableHighlight underlayColor="rgba(234, 48, 87, 0.3)" onPress={this.swipeLeft} style={{borderColor: '#ddd', borderWidth: 1, marginRight: 10, justifyContent: 'center', alignItems:'center', width: 80, height: 80, backgroundColor: 'transparent', borderRadius: 40}}>
                            <Image source={require('../../img/close.png')} />
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="#666" onPress={this.flagCard} style={{marginRight: 10, justifyContent: 'center', alignItems:'center', width: 30, height: 30, backgroundColor: '#999', borderRadius: 15}}>
                            <Image style={{tintColor: '#fff', width: 12, height: 12}} source={require('../../img/flag.png')} />
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="rgba(44, 202, 67, 0.3)" onPress={this.swipeRight} style={{borderColor: '#ddd', borderWidth: 1, justifyContent: 'center', alignItems:'center', width: 80, height: 80, backgroundColor: 'transparent', borderRadius: 40}}>
                            <Image source={require('../../img/check.png')} />
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }

        else {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={this.loadConvos}>
                    <View>
                        <View style={{borderRadius: 4, borderColor: '#ddd', borderWidth: 4, backgroundColor: '#fff', height: 200, width: 200}}>
                            <View style={{flex: 0.8, borderTopLeftRadius: 4, borderTopRightRadius: 4, backgroundColor: '#f9f9f9'}} />
                            <View style={{backgroundColor: '#eee', height: 20, margin: 10, marginBottom: 0}}/>
                            <View style={{backgroundColor: '#eee', height: 20, margin: 10}}/>
                        </View>
                        <Text style={{color: '#666', fontSize: 20, textAlign: 'center', marginTop: 15}}>Out of Convos</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            );
        }

    }

    render() {
        return (
            <View>
                <Nav currentNetwork={this.props.appState.currentNetwork} navigator={this.props.navigator} />
                <View style={styles.cardViewer}>
                    {(this.props.state.isLoading) ? this.renderLoader() : this.renderDeck()}
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3498db',
        padding: 15,
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerWhite: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 10,
        paddingTop: 30
    },
    headerText: {
        color: '#fff',
        fontSize: 15,
        lineHeight: 20
    },
    headerIcon: {
        tintColor: '#fff'
    },
    headerDownArrow: {
        height: 10,
        width: 10,
        marginLeft: 5,
        marginTop: 5
    },
    cardViewer: {
        backgroundColor: '#eee',
        padding: 20,
        paddingBottom: 0,
        flex: 1
    },
    interestedThumbnail: {
        height: 60,
        width: 60,
        borderRadius: 30,
        margin: 5
    },
    myConvosButton: {
        padding: 5,
        alignItems: 'center'
    }
});

function mapStateToProps(state) {
    return {
        state: state.convoSwiper,
        appState: state.app
    };
}

export default connect(mapStateToProps)(ConvoSwiper);