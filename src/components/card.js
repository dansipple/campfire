
import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View, Dimensions } from 'react-native';

export default class Card extends Component {

    constructor(props) {
        super(props);
    }

    onPress() {
        console.log('pressed');
    }
    
    render() {
        let {height, width} = Dimensions.get('window');

        if (this.props.cardData) {
            let cardData = this.props.cardData || {};
            let creator = cardData.creator || {};

            const styles = StyleSheet.create({
                cardContainer: {
                    elevation: 3,
                    backgroundColor: this.props.inMessage ? '#f9f9f9' : '#fff',
                    borderRadius: 4,
                    borderColor: '#ddd',
                    borderWidth: this.props.inMessage ? 1 : 0,
                    shadowColor: '#bbb',
                    shadowOpacity: this.props.inMessage ? 0 : 0.6,
                    shadowRadius: 8,
                    flex: 1
                },
                cardBody: {
                    padding: 30,
                    minHeight: this.props.inMessage ? 200 : height - 310
                },
                category: {
                    color: '#777',
                    fontSize: 16,
                    paddingBottom: 25
                },
                description: {
                    fontSize: 19,
                    lineHeight: 25,
                    color: '#555',
                    flex: 1,
                    justifyContent: 'center'
                },
                creatorInformation: {
                    flex: 1,
                    flexDirection: 'row',
                    padding: 15
                },
                creatorNameContainer: {
                    flex: 1,
                    flexDirection: 'column'
                },
                name: {
                    fontSize: 16,
                    color: '#555',
                    lineHeight: 18
                },
                title: {
                    fontSize: 13,
                    color: '#666'
                },
                thumbnail: {
                    borderRadius: 18,
                    height: 36,
                    width: 36,
                    marginRight: 10,
                    resizeMode: 'contain'
                },
                divider: {
                    width: 50,
                    backgroundColor: '#3498db',
                    height: 5,
                    borderRadius: 3,
                    marginBottom: 25
                }
            });

            return (
                <TouchableOpacity onPress={() => this.onPress()}>
                    <View style={styles.cardContainer}>
                        <View style={ styles.cardBody }>
                            <Text style={styles.category}>#{cardData.category}</Text>
                            <View style={styles.divider} />
                            <Text style={ styles.description }>{ cardData.content }</Text>
                        </View>
                        <View style={styles.creatorInformation}>
                            <Image style={styles.thumbnail} source={ creator.avatar ? { uri: creator.avatar} : require('../../img/no-avatar.png')} />
                            <View style={styles.creatorNameContainer}>
                                <Text style={styles.name}>{ creator.first } { creator.last }</Text>
                                <Text style={styles.title}>{ creator.title }</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
        else {
            return null;
        }

    }
}
