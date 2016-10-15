
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
                        <TouchableHighlight
                            onPress={cardData.hasInterested ? this.props.viewInterested : null}
                            underlayColor="#f1f1f1"
                            style={[styles.actionButton, styles.interestedButton, {borderBottomLeftRadius: 8},
                            !cardData.hasInterested && styles.inactiveButton ]}
                        >
                            <Text style={styles.actionButtonText}>View Interested</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.props.editCard} underlayColor="#f1f1f1" style={[styles.actionButton, {borderBottomRightRadius: 8}]}>
                            <Text style={styles.actionButtonText}>Edit</Text>
                        </TouchableHighlight>
                    </View>
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
        minHeight: 250
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
    },
    inactiveButton : {
        backgroundColor: '#f3f3f3'
    }
});