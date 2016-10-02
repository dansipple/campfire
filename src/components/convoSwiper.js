import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Image, View, Text} from 'react-native';
import { Spinner, DeckSwiper } from 'native-base';
import SwiperController from '../lib/controllers/swiper';
import Card from './card';


export default class ConvoSwiper extends Component {

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
        if (this.state.activeCard === this.state.cardDeck.length - 1) this.loadCards();

        this.setState({
            activeCard: this.state.activeCard + 1
        });
    }
    loadCards() {
        this.setState({
            isLoading: true
        }, () => {
            SwiperController.getCards('-KPzFJ697NbkNZoHVBR7', '-KPzFYEKdj3yRQn3teTP').then(
                (cards) => {
                    this.setState({
                        cardDeck: this.state.cardDeck.concat(cards),
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
        if(this.state.isLoading && !this.state.cardDeck.length) {
            return (
                <View style={ styles.cardViewer }>
                    <Spinner color="#fff" />
                </View>
            )
        } else {
            return (
                <View style={{flex: 1}}>
                    <View style={ styles.header}>
                        <TouchableOpacity onPress={() => this.props.router('settings')}>
                            <Image style={styles.headerIcon} source={require('../../img/settings.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.router('network')}>
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Text style={styles.headerText}>New York City Beta</Text>
                                <Image style={styles.headerDownArrow}
                                       source={require('../../img/down-arrow.png')}/>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.router('messages')}>
                            <Image style={styles.headerIcon} source={require('../../img/chat.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.cardViewer }>
                        <DeckSwiper
                            onSwipeRight={this.swipeRight}
                            onSwipeLeft={this.swipeLeft}
                            dataSource={this.state.cardDeck}
                            renderItem={(card)=> {
                        return (
                            <Card cardData={card}/>
                        )
                    }}
                        >
                        </DeckSwiper>
                        <TouchableOpacity onPress={() => this.props.router('myConvos')} style={styles.myConvosButton}>
                            <Image style={styles.headerIcon} source={require('../../img/three_selected.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
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
        padding: 15,
        alignItems: 'center'
    }
});
