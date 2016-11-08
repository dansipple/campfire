import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Image, View, Text} from 'react-native';

import Card from './../components/Card';
import DeckSwiper from './../components/DeckSwiper';

import * as convoSwiperActions from '../reducers/convoSwiper/actions';

export default class ConvoSwiper extends Component {

    constructor(props) {
        super(props);

        this.swipeLeft = this.swipeLeft.bind(this);
        this.swipeRight = this.swipeRight.bind(this);
        this.loadConvos = this.loadConvos.bind(this);

        this.renderLoader = this.renderLoader.bind(this);
        this.renderDeck = this.renderDeck.bind(this);

    }

    swipeLeft() {
        const nextCardKey = this.props.state.cardDeck[this.props.state.activeCard + 1]?
            this.props.state.cardDeck[this.props.state.activeCard + 1]._id : null;
        this.props.dispatch(convoSwiperActions.swipe(this.props.state.cardDeck[this.props.state.activeCard],
            nextCardKey, false));
    }

    swipeRight() {
        const nextCardKey = this.props.state.cardDeck[this.props.state.activeCard + 1]?
            this.props.state.cardDeck[this.props.state.activeCard + 1]._id : null;
        this.props.dispatch(convoSwiperActions.swipe(this.props.state.cardDeck[this.props.state.activeCard],
            nextCardKey, true));
    }

    loadConvos() {
        this.props.dispatch(convoSwiperActions.loadConvos());
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.appState.currentUser != nextProps.appState.currentUser && nextProps.state.cardDeck.length == 0){
            this.loadConvos();
        }
    }

    renderLoader() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../img/ripple.gif')} />
            </View>
        );
    }

    renderDeck() {
        const state = this.props.state;

        if(state.activeCard < state.cardDeck.length -1) {
            return (
                <View style={{flex: 1}}>
                    <DeckSwiper
                        onSwipeRight={this.swipeRight}
                        onSwipeLeft={this.swipeLeft}
                        topCard={state.cardDeck[state.activeCard]}
                        bottomCard={state.cardDeck[state.activeCard + 1]}
                        renderItem={(card)=> {
                        return (
                            <Card cardData={card}/>
                        )
                    }}
                    >
                    </DeckSwiper>
                </View>
            );
        }

        else {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View>
                        <View style={{borderRadius: 4, backgroundColor: '#fff', height: 200, width: 200}}>
                            <View style={{flex: 0.8, borderTopLeftRadius: 4, borderTopRightRadius: 4, backgroundColor: '#eee'}} />
                            <View style={{backgroundColor: '#eee', height: 20, margin: 10, marginBottom: 0}}/>
                            <View style={{backgroundColor: '#eee', height: 20, margin: 10}}/>
                        </View>
                        <Text style={{color: '#fff', fontSize: 20, textAlign: 'center', marginTop: 15}}>Out of Convos</Text>
                    </View>
                </View>
            );
        }

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.router('settings')}>
                        <Image style={styles.headerIcon} source={require('../../img/settings.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.router('network')}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={styles.headerText}>{this.props.appState.currentNetwork.name}</Text>
                            <Image style={styles.headerDownArrow}
                                   source={require('../../img/down-arrow.png')}/>
                        </View>
                     </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.router('messages')}>
                        <Image style={styles.headerIcon} source={require('../../img/chat.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardViewer}>
                    {(this.props.state.isLoading) ? this.renderLoader() : this.renderDeck()}
                    <TouchableOpacity onPress={() => this.props.router('myConvos')} style={styles.myConvosButton}>
                        <Image style={styles.headerIcon} source={require('../../img/three_selected.png')}/>
                    </TouchableOpacity>
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
        backgroundColor: '#3498db',
        padding: 15,
        paddingTop: 10,
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
