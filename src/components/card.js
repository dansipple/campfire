
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';

import Colors from '../lib/utils/colors';

export default class card extends Component {

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
                    elevation: 3
                },
                cardBody: {
                    padding: 20,
                    height: this.props.inMessage ? 200 : height - 205,
                    backgroundColor: '#3498db',
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                },
                category: {
                    color: '#fff',
                    fontSize: 18,
                    paddingBottom: 25
                },
                description: {
                    fontSize: 25,
                    lineHeight: 32,
                    color: '#fff',
                    flex: 1,
                    justifyContent: 'center',
                    //alignSelf: 'center'
                },
                creatorInformation: {
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    padding: 15,
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    borderTopWidth: 0
                },
                creatorNameContainer: {
                    flexDirection: 'column'
                },
                name: {
                    fontSize: 18,
                    lineHeight: 20
                },
                title: {
                    fontSize: 15,
                    color: '#666'
                },
                thumbnail: {
                    borderRadius: 20,
                    height: 40,
                    width: 40,
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
