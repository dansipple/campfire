
import React, { Component } from 'react';
import { TouchableHighlight, Image, StyleSheet, Dimensions, ListView, Text, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import UserCardController from '../lib/controllers/userCard';

import Colors from '../lib/utils/colors';

export default class MyConvos extends Component {

    static navigatorButtons = {
        rightButtons: [
            {
                title: 'New',
                id: 'new'
            }
        ]
    };
    static navigatorStyle = {
        navBarNoBorder: false
    };

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            conversations: ds
        };

        this._isMounted = false;

        this._renderRow = this._renderRow.bind(this);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

        //this.selectConversation = this.selectConversation.bind(this);
    }

    onNavigatorEvent(event) {
        if (event.id == 'new') {
            this.props.navigator.showModal({
                title: 'New Convo',
                //backButtonTitle: 'Back',
                screen: 'NewConvo'
            });
        }
    }

    _renderRow(convoData, sectionID, rowID) {
        let convoContentColor = StyleSheet.create({
            convoContentColor: {
                backgroundColor: Colors.categories[convoData.category]
            }
        });

        return (
            <TouchableHighlight onPress={() => this._onPress(convoData)} underlayColor="#f6f6f6">
                <View style={styles.convo}>
                    <View style={styles.convoContent}>
                        <Text style={styles.convoCategory}>#{convoData.category}</Text>
                        <Text style={styles.convoContentText}>{convoData.content}</Text>
                    </View>
                    <View style={styles.interestedContainer}>
                        <Image style={styles.interestedImage} source={{ uri: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/005/08d/1f5/0fe67d4.jpg' }} />
                        <Image style={styles.interestedImage} source={{ uri: 'https://media.licdn.com/media/p/4/005/097/089/0bebe5a.jpg' }} />
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    componentWillMount() {
        this.loadCards();
    }

    loadCards() {
        this.setState({
            isLoading: true
        }, () => {
            UserCardController.getCards('-KPzFJ697NbkNZoHVBR7', '-KPzFYEKdj3yRQn3teTP').then(
                (cards) => {
                    cards.reverse();
                    let ds = this.state.conversations.cloneWithRows(cards);

                    this.setState({
                        conversations: ds,
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

    render() {
        return (
            <LinearGradient colors={['#fff', '#ecf0f9']} style={styles.viewer}>
                <ListView
                    dataSource={this.state.conversations}
                    renderRow={this._renderRow}
                    style={{ flex: 1, padding: 10 }}
                />
            </LinearGradient>
        );
    }
    _onPress(conversationData) {
        this.props.navigator.showLightBox({
            screen: "ProfileSwiper", // unique ID registered with Navigation.registerScreen
            passProps: {}, // simple serializable object that will pass as props to the lightbox (optional)
            style: {
                backgroundBlur: "dark" // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
            }
        });
    }
}

const styles = StyleSheet.create({
    viewer: {
        flex: 1,
        flexDirection: 'column'
    },
    convo: {
        marginBottom: 15
    },
    convoCategory: {
        color: '#fff',
        fontSize: 16,
        paddingBottom: 10
    },
    convoContent: {
        backgroundColor: '#3498db',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingTop: 15,
        paddingBottom: 35,
        paddingLeft: 15,
        paddingRight: 15
    },
    convoContentText: {
        color: '#fff',
        fontSize: 20,
        lineHeight: 25
    },
    interestedContainer: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        borderTopWidth: 0,
        padding: 10,
        justifyContent: 'center'
    },
    interestedImage: {
        height: 46,
        width: 46,
        borderRadius: 23,
        marginRight: -23,
        resizeMode: 'contain',
        borderColor: '#ddd',
        borderWidth: 1
    }
});
