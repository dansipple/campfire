import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, StyleSheet, ListView, ScrollView, RefreshControl, Image, View, Text} from 'react-native';
import moment from 'moment';

import MyConvoCard from './../components/MyConvoCard';
import Nav from './../components/Nav';

import * as myConvosActions from '../reducers/myConvos/actions';

import {connect} from 'react-redux';

class Connect extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds
        };
        this._isMounted = false;
        this._renderRow = this._renderRow.bind(this);

        this.loadConvos = this.loadConvos.bind(this);
        this.editConvo = this.editConvo.bind(this);
        this.viewInterested = this.viewInterested.bind(this);
    }

    loadConvos() {
        this.props.dispatch(myConvosActions.loadConvos());
    }

    componentWillMount() {
        this.loadConvos();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.state.convos !== this.props.state.convos) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.state.convos)
            });
        }

        let nextBadges = null;
        if(nextProps.appState.badges) {
            nextBadges = nextProps.appState.badges[this.props.appState.currentNetwork._id] || {};
        }
        let badges = {};
        if(this.props.appState.badge) {
            badges = this.props.appState.badges[this.props.appState.currentNetwork._id] || {};
        }

        if(nextBadges) {
            if (nextBadges.myConvos !== badges.myConvos) {
                this.props.navigator.setTabBadge({
                    badge: nextBadges.myConvos !== 0 ? nextBadges.myConvos : null
                });
            }
        }
    }

    editConvo(convoData) {
        this.props.navigator.showModal({
            title: 'Edit Convo',
            screen: 'NewConvo',
            passProps: {
                card: convoData
            }
        });
    }

    viewInterested(convoData) {
        this.props.navigator.showLightBox({
            screen: "ProfileSwiper",
            passProps: {
                card: convoData
            },
            style: {
                backgroundBlur: "dark"
            }
        });
    }

    _renderRow(convoData) {
        const updatedTime = moment(convoData.createdAt).format('MMM D');
        return (
            <View>
                <Text style={styles.timestamp}>{updatedTime}</Text>
                <MyConvoCard
                    cardData={convoData} 
                    router={this.props.router}
                    viewInterested={() => {this.viewInterested(convoData)}}
                    editCard={() => {this.editConvo(convoData)}}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Nav currentNetwork={this.props.appState.currentNetwork} navigator={this.props.navigator} />
                <View style={{flex: 1, backgroundColor: '#eee', padding: 10}}>
                    <ScrollView>
                        <View style={styles.profileContainer}>
                            <View style={styles.userInformation}>
                                <View style={styles.thumbnailContainer}>
                                    <Image style={styles.thumbnail} source={require('../../img/no-avatar.png')} />
                                </View>
                                <View style={styles.nameAndTitleContainer}>
                                    <Text style={styles.name}>Dan Sipple</Text>
                                    <Text style={styles.title}>Cofounder of Convos</Text>
                                </View>
                            </View>
                            <View style={styles.actionButtons}>
                                <TouchableHighlight onPress={this.props.pass} underlayColor="#999" style={[styles.actionButton, styles.passButton]}>
                                    <Text style={styles.actionButtonText}>Pass</Text>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={this.props.connect} underlayColor="#145683" style={[styles.actionButton, styles.connectButton]}>
                                    <Text style={styles.actionButtonText}>Connect</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.profileContainer}>
                            <View style={styles.userInformation}>
                                <View style={styles.thumbnailContainer}>
                                    <Image style={styles.thumbnail} source={require('../../img/no-avatar.png')} />
                                </View>
                                <View style={styles.nameAndTitleContainer}>
                                    <Text style={styles.name}>Dan Sipple</Text>
                                    <Text style={styles.title}>Cofounder of Convos</Text>
                                </View>
                            </View>
                            <View style={styles.actionButtons}>
                                <TouchableHighlight onPress={this.props.pass} underlayColor="#999" style={[styles.actionButton, styles.passButton]}>
                                    <Text style={styles.actionButtonText}>Pass</Text>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={this.props.connect} underlayColor="#145683" style={[styles.actionButton, styles.connectButton]}>
                                    <Text style={styles.actionButtonText}>Connect</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.profileContainer}>
                            <View style={styles.userInformation}>
                                <View style={styles.thumbnailContainer}>
                                    <Image style={styles.thumbnail} source={require('../../img/no-avatar.png')} />
                                </View>
                                <View style={styles.nameAndTitleContainer}>
                                    <Text style={styles.name}>Dan Sipple</Text>
                                    <Text style={styles.title}>Cofounder of Convos</Text>
                                </View>
                            </View>
                            <View style={styles.actionButtons}>
                                <TouchableHighlight onPress={this.props.pass} underlayColor="#999" style={[styles.actionButton, styles.passButton]}>
                                    <Text style={styles.actionButtonText}>Pass</Text>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={this.props.connect} underlayColor="#145683" style={[styles.actionButton, styles.connectButton]}>
                                    <Text style={styles.actionButtonText}>Connect</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </ScrollView>
                    {/*{this.props.state.convos.length ?
                        (<ListView
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow}
                            style={{ flex: 1, padding: 20 }}
                            refreshControl={
                              <RefreshControl
                                refreshing={this.props.state.isLoading}
                                onRefresh={this.loadConvos}
                                style={{ backgroundColor: 'transparent' }}
                              />
                            }
                        />) : (
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TouchableOpacity onPress={this.loadConvos}>
                                <View style={{alignItems: 'center'}}>
                                    <View style={{borderRadius: 4, borderColor: '#ddd', borderWidth: 4, backgroundColor: '#fff', height: 200, width: 200}}>
                                        <View style={{flex: 0.8, borderTopLeftRadius: 4, borderTopRightRadius: 4, backgroundColor: '#f9f9f9'}} />
                                        <View style={{backgroundColor: '#eee', height: 20, margin: 10, marginBottom: 0}}/>
                                        <View style={{backgroundColor: '#eee', height: 20, margin: 10}}/>
                                    </View>
                                    <Text style={{color: '#666', fontSize: 16, textAlign: 'center', marginTop: 15}}>You haven't created any convos</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}*/}

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 5,
        borderColor: '#ddd',
        borderWidth: 1
    },
    userInformation: {
        padding: 20,
        borderBottomColor: '#eee',
        borderBottomWidth: 1
    },
    thumbnailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    thumbnail: {
        borderRadius: 40,
        height: 80,
        width: 80,
        resizeMode: 'contain'
    },
    nameAndTitleContainer: {
        paddingTop: 10,
        backgroundColor: 'transparent',
        paddingBottom: 10
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
        backgroundColor: '#f9f9f9',
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
        minHeight: 180
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
    connectButton: {
        backgroundColor: '#3498db',
        borderBottomRightRadius: 8
    }
});

function mapStateToProps(state) {
    return {
        state: state.myConvos,
        appState: state.app
    };
}

export default connect(mapStateToProps)(Connect);