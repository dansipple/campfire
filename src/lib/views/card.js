
import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

import { Card, CardItem, Thumbnail, Text, View } from 'native-base';

export default class card extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        let {height, width} = Dimensions.get('window');

        const styles = StyleSheet.create({
            cardBody: {
                padding: 10,
                height: this.props.inMessage ? 200 : height - 150,
                backgroundColor: '#17BBB0',
                justifyContent: 'center',
                alignItems: 'center'
            },
            description: {
                fontSize: 25,
                lineHeight: 32,
                color: '#fff',
                textAlign: 'center',
                alignSelf: 'center'
            }
        });

        if (this.props.cardData) {
            let cardData = this.props.cardData || {};
            let creator = cardData.creator || {};
            return (
                    <Card>
                        <View style={ styles.cardBody }>
                            <Text style={ styles.description }>{ cardData.content }</Text>
                        </View>
                        <CardItem>
                            <Thumbnail source={{ uri: creator.avatar}} />
                            <Text>{ creator.first } { creator.last }</Text>
                            <Text note>{ creator.title }</Text>
                        </CardItem>
                    </Card>
            );
        }
        else {
            return null;
        }

    }
}
