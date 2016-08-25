
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
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                height: this.props.inMessage ? 200 : height - 150,
                backgroundColor: '#17BBB0'
            },
            description: {
                fontSize: 25,
                lineHeight: 32,
                color: '#fff',
                textAlign: 'center'
            }
        });

        return (
            <View>
                <Card>
                    <CardItem style={ styles.cardBody }>
                        <Text style={ styles.description }>{ this.props.cardData.description }</Text>
                    </CardItem>

                    <CardItem>
                        <Thumbnail source={{ uri: this.props.cardData.avatar}} />
                        <Text>{ this.props.cardData.name }</Text>
                        <Text note>{ this.props.cardData.title }</Text>
                    </CardItem>
                </Card>
            </View>
        );
    }
}
