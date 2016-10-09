
import React, { Component } from 'react';
import { TouchableHighlight, Image, StyleSheet, Text, View } from 'react-native';

export default class MyConvoCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.cardData) {
            let cardData = this.props.cardData || {};

            return (
                <View style={styles.cardContainer}>
                    <View style={ styles.cardBody }>
                        <Text style={styles.category}>#{cardData.category}</Text>
                        <Text style={ styles.description }>{ cardData.content }</Text>
                    </View>
                    <View style={styles.actionButtons}>
                        <TouchableHighlight onPress={this.props.viewInterested} underlayColor="#f1f1f1" style={[styles.actionButton, styles.interestedButton, {borderBottomLeftRadius: 8}]}>
                            <Text style={styles.actionButtonText}>View Interested</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.props.editCard} underlayColor="#f1f1f1" style={[styles.actionButton, {borderBottomRightRadius: 8}]}>
                            <Text style={styles.actionButtonText}>Edit</Text>
                        </TouchableHighlight>
                    </View>
                    {/*
                    <View style={styles.interested}>
                        <Text style={{fontSize: 11, textAlign: 'center', color: '#888', padding: 10}}>Interested</Text>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-start', flexWrap: 'wrap'}}>
                            <TouchableOpacity>
                                <Image style={styles.interestedThumbnail} source={{uri: 'https://media.licdn.com/media/p/4/005/097/089/0bebe5a.jpg'}} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.interestedThumbnail} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg'}} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.interestedThumbnail} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/jadlimcaco/128.jpg'}} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.interestedThumbnail} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg'}} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.interestedThumbnail} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/mlane/128.jpg'}} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.interestedThumbnail} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/nuraika/128.jpg'}} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.interestedThumbnail} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg'}} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.interestedThumbnail} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/tonystubblebine/128.jpg'}} />
                            </TouchableOpacity>
                        </View>
                    </View>*/}
                </View>
            );
        }
        else {
            return null;
        }

    }
}
const styles = StyleSheet.create({
    cardContainer: {
        elevation: 3,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        marginBottom: 25,
        flex: 1
    },
    cardBody: {
        padding: 20,
        height: 250
    },
    category: {
        color: '#777',
        fontSize: 13,
        paddingBottom: 10
    },
    description: {
        fontSize: 16,
        lineHeight: 21,
        color: '#555',
        flex: 1,
        justifyContent: 'center'
    },
    interestedThumbnail: {
        height: 60,
        width: 60,
        borderRadius: 30,
        margin: 5
    },
    interested: {
        height: 195,
        backgroundColor: '#f9f9f9',
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        padding: 10,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    actionButtons: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },
    actionButton: {
        flex: 0.5,
        paddingTop: 15,
        paddingBottom: 15
    },
    actionButtonText: {
        color: '#666',
        textAlign: 'center'
    },
    interestedButton: {
        borderRightColor: '#ddd',
        borderRightWidth: 1
    }
});