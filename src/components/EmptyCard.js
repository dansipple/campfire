
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
                backgroundColor: this.props.inMessage ? '#f9f9f9' : '#fff',
                borderRadius: 4,
                borderColor: '#ddd',
                borderWidth: 1,
                minHeight: this.props.inMessage ? 200 : height - 245
            },
            cardBody: {
                padding: 30,
                //height: this.props.inMessage ? 200 : height - 310
            },
            category: {
                color: '#777',
                fontSize: 14,
                paddingBottom: 25
            },
            creatorInformation: {
                flexDirection: 'row',
                padding: 15
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
            <View style={styles.cardContainer}>
                <View style={ styles.cardBody }>
                    <View style={[styles.grayBlock, {width: 150, marginBottom: 25}]} />
                    <View style={styles.divider} />
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
