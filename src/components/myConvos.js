import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, ListView, ScrollView, Image, View, Text} from 'react-native';
import MyConvoCard from './myConvoCard';
import UserCardController from '../lib/controllers/userCard';

import moment from 'moment';

export default class MyConvos extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            conversations: ds
        };
        this._isMounted = false;
        this._renderRow = this._renderRow.bind(this);

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

    _renderRow(convoData) {
        console.log(convoData);
        const updatedTime = moment(convoData.createdAt).format('MMM D');
        return (
            <View>
                <Text style={styles.timestamp}>{updatedTime}</Text>
                <MyConvoCard cardData={convoData} router={this.props.router} />
            </View>
        );
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#eee'}}>
                <View style={[styles.header, styles.headerWhite]}>
                    <TouchableOpacity onPress={() => this.props.router('home')}>
                        <Image style={styles.headerIcon} source={require('../../img/settings.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.router('home')}>
                        <Text style={{color: '#666', fontSize: 16, fontWeight: 'bold'}}>Your Convos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.router('newConvo')}>
                        <Text>New</Text>
                    </TouchableOpacity>
                </View>
                <ListView
                    dataSource={this.state.conversations}
                    renderRow={this._renderRow}
                    style={{ flex: 1, padding: 25 }}
                />

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
    interestedThumbnail: {
        height: 60,
        width: 60,
        borderRadius: 30,
        margin: 5
    },
    timestamp: {
        fontSize: 13,
        textAlign: 'center',
        paddingBottom: 10,
        color: '#888'
    }
});
