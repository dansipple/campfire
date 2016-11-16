
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';

export default class EmptyCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {height, width} = Dimensions.get('window');

        const styles = StyleSheet.create({
            cardContainer: {
                elevation: 3,
                backgroundColor: this.props.inMessage ? '#f9f9f9' : '#fff',
                borderRadius: 4,
                borderColor: '#ddd',
                borderWidth: 1,
                flex: 1
            },
            cardBody: {
                padding: 30,
                minHeight: this.props.inMessage ? 200 : height - 300
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
                padding: 15,
                borderColor: '#eee',
                borderTopWidth: 0.5
            },
            creatorNameContainer: {
                flexDirection: 'column',
                flex: 1
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
                backgroundColor: '#eee'
            },
            grayBlock: {
                backgroundColor: '#eee',
                height: 14,
                marginBottom: 10
            }
        });

        return (
            <View style={styles.cardContainer}>
                <View style={ styles.cardBody }>
                    <View style={[styles.grayBlock, {width: 150, marginBottom: 25}]} />
                    <View style={[styles.grayBlock]} />
                    <View style={[styles.grayBlock]} />
                    <View style={[styles.grayBlock]} />
                    <View style={[styles.grayBlock]} />
                </View>
                <View style={styles.creatorInformation}>
                    <View style={styles.thumbnail} />
                    <View style={styles.creatorNameContainer}>
                        <View style={[styles.grayBlock, {width: 100}]} />
                        <View style={[styles.grayBlock, {width: 80}]} />
                    </View>
                </View>
            </View>
        );

    }
}
