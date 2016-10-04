
import React, { Component } from 'react';
import { TouchableHighlight, Image, StyleSheet, Text, View, ScrollView} from 'react-native';

export default class Profile extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.profileData) {
            let profileData = this.props.profileData || {};

            const styles = StyleSheet.create({
                profileContainer: {
                    flex: 1,
                    //flexDirection: 'column',
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    margin: 5,
                },
                userInformation: {
                    paddingBottom: 20,
                    paddingTop: 20,
                    borderBottomColor: '#ddd',
                    borderBottomWidth: 1
                },
                thumbnailContainer: {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center'
                },
                thumbnail: {
                    borderRadius: 40,
                    //borderColor: '#fff',
                    //borderWidth: 5,
                    height: 80,
                    width: 80,
                    resizeMode: 'contain'
                    //marginTop: -50
                },
                nameAndTitleContainer: {
                    paddingTop: 10,
                    backgroundColor: 'transparent'
                },
                name: {
                    fontSize: 22,
                    lineHeight: 25,
                    textAlign: 'center'
                },
                title: {
                    fontSize: 14,
                    textAlign: 'center',
                    color: '#666'
                },
                additionalInfo: {
                    backgroundColor: 'transparent',
                    paddingLeft: 20,
                    paddingRight: 20
                },
                userConvos: {
                    backgroundColor: '#eee',
                    padding: 20,
                    paddingBottom: 0
                },
                convo: {
                    elevation: 3,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    marginBottom: 15,
                    flex: 1
                },
                cardBody: {
                    padding: 20,
                    height: 180
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
                actionButtons: {
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                    borderTopColor: '#fff',
                    borderTopWidth: 1
                },
                actionButton: {
                    flex: 0.5,
                    paddingTop: 25,
                    paddingBottom: 25
                },
                actionButtonText: {
                    color: '#fff',
                    textAlign: 'center'
                },
                passButton: {
                    backgroundColor: '#bbb',
                    borderBottomLeftRadius: 8,
                    borderRightWidth: 1,
                    borderRightColor: '#fff'
                },
                matchButton: {
                    backgroundColor: '#3498db',
                    borderBottomRightRadius: 8
                }
            });

            return (
                <View style={styles.profileContainer}>
                    <View style={styles.userInformation}>
                        <View style={styles.thumbnailContainer}>
                            <Image style={styles.thumbnail} source={{ uri: profileData.avatar}} />
                        </View>
                        <View style={styles.nameAndTitleContainer}>
                            <Text style={styles.name}>{ profileData.first } { profileData.last }</Text>
                            <Text style={styles.title}>{ profileData.title }</Text>
                        </View>
                    </View>
                    <ScrollView style={styles.userConvos}>
                        <View style={styles.convo}>
                            <View style={styles.cardBody}>
                                <Text style={styles.category}>#{this.props.convos[0].category}</Text>
                                <Text style={styles.description}>{this.props.convos[0].content}</Text>
                            </View>
                        </View>
                        <View style={styles.convo}>
                            <View style={styles.cardBody}>
                                <Text style={styles.category}>#{this.props.convos[1].category}</Text>
                                <Text style={styles.description}>{this.props.convos[1].content}</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.actionButtons}>
                        <TouchableHighlight onPress={this.props.pass} underlayColor="#999" style={[styles.actionButton, styles.passButton]}>
                            <Text style={styles.actionButtonText}>Pass</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.props.match} underlayColor="#145683" style={[styles.actionButton, styles.matchButton]}>
                            <Text style={styles.actionButtonText}>Match</Text>
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
