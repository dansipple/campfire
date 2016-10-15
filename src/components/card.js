
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';

export default class Card extends Component {

    constructor(props) {
        super(props);
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
                    borderRadius: 8,
                    shadowColor: '#000',
                    shadowOpacity: this.props.inMessage ? 0 : 0.2,
                    shadowRadius: 8,
                    borderColor: '#ddd',
                    borderWidth: this.props.inMessage ? 1 : 0,
                    flex: 1
                },
                cardBody: {
                    padding: 30,
                    minHeight: this.props.inMessage ? 200 : height - 205
                },
                category: {
                    color: '#777',
                    fontSize: 14,
                    paddingBottom: 25
                },
                description: {
                    fontSize: 18,
                    lineHeight: 25,
                    color: '#555',
                    flex: 1,
                    justifyContent: 'center',
                    //alignSelf: 'center'
                },
                creatorInformation: {
                    flex: 1,
                    flexDirection: 'row',
                    //backgroundColor: '#fff',
                    padding: 15,
                    //borderColor: '#ddd',
                    //borderWidth: 1,
                    //borderTopWidth: 0
                },
                creatorNameContainer: {
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
                }
            });

            return (
                    <View style={styles.cardContainer}>
                        <View style={ styles.cardBody }>
                            <Text style={styles.category}>#{cardData.category}</Text>
                            <Text style={ styles.description }>{ cardData.content }</Text>
                        </View>
                        <View style={styles.creatorInformation}>
                            <Image style={styles.thumbnail} source={{ uri: creator.avatar}} />
                            <View style={styles.creatorNameContainer}>
                                <Text style={styles.name}>{ creator.first } { creator.last }</Text>
                                <Text style={styles.title}>{ creator.title }</Text>
                            </View>
                        </View>
                    </View>
            );
        }
        else {
            return null;
        }

    }
}
