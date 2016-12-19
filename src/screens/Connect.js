import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, StyleSheet, ListView, ScrollView, RefreshControl, Image, View, Text} from 'react-native';

import Nav from './../components/Nav';

import ConnectController from '../lib/controllers/connect';

import * as connectActions from '../reducers/connect/actions';

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

        this.loadPotentials = this.loadPotentials.bind(this);
    }

    loadPotentials() {
        this.props.dispatch(connectActions.loadPotentials());
    }

    componentWillMount() {
        this.loadPotentials();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.state.potentials !== this.props.state.potentials) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.state.potentials)
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

    connect(data) {
        ConnectController.connect(this.props.appState.currentUser._id, this.props.appState.currentNetwork._id, data)
            .then(() => {
                this.loadPotentials();
            });
    }

    pass(data) {
        ConnectController.pass(this.props.appState.currentUser._id, this.props.appState.currentNetwork._id, data)
            .then(() => {
                this.loadPotentials();
            });

    }

    _renderRow(data) {
        return (
            <View style={{flexDirection: 'row', backgroundColor: '#fff', borderBottomColor: '#ddd', borderBottomWidth: 1, padding: 6, paddingRight: 2}}>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', overflow: 'hidden'}}>
                    <Image style={styles.thumbnail} source={require('../../img/no-avatar.png')} />
                    <View style={{justifyContent: 'center', padding: 10}}>
                        <Text style={{color: '#666', fontSize: 15}}>Dan Sipple</Text>
                        <Text style={{color: '#777', fontSize: 12}}>Cofounder of Convos and a bunch of other stuff</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 110}}>
                    <TouchableHighlight onPress={() => this.pass(data)} underlayColor="rgba(52, 152, 219, 0.4)" style={[styles.actionButton, styles.passButton]}>
                        <Image style={{height: 15, width: 15, tintColor: '#3498db'}} source={require('../../img/close.png')} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.connect(data)} underlayColor="rgba(52, 152, 219, 0.4)" style={[styles.actionButton, styles.connectButton]}>
                        <Image style={{height: 15, width: 15, tintColor: '#3498db'}} source={require('../../img/check.png')} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Nav currentNetwork={this.props.appState.currentNetwork} navigator={this.props.navigator} />
                <View style={{flex: 1, backgroundColor: '#eee'}}>
                    {this.props.state.potentials.length ?
                        (<ListView
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow}
                            style={{ flex: 1 }}
                            refreshControl={
                              <RefreshControl
                                refreshing={this.props.state.isLoading}
                                onRefresh={this.loadPotentials}
                                style={{ backgroundColor: 'transparent' }}
                              />
                            }
                        />) : (
                        <View style={{flex: 1, justifyContent: 'center', padding: 50}}>
                            <TouchableOpacity onPress={this.loadPotentials}>
                                <View style={{alignItems: 'center'}}>
                                    <View style={{borderRadius: 4, borderColor: '#ddd', borderWidth: 4, backgroundColor: '#fff', height: 200, width: 200}}>
                                        <View style={{flex: 0.8, borderTopLeftRadius: 4, borderTopRightRadius: 4, backgroundColor: '#f9f9f9'}} />
                                        <View style={{backgroundColor: '#eee', height: 20, margin: 10, marginBottom: 0}}/>
                                        <View style={{backgroundColor: '#eee', height: 20, margin: 10}}/>
                                    </View>
                                    <Text style={{color: '#666', fontSize: 16, textAlign: 'center', marginTop: 15}}>When people swipe right on your convos they will show up here</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}

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
    },
    thumbnailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    thumbnail: {
        borderRadius: 20,
        height: 40,
        width: 40,
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
        justifyContent: 'center',
        padding: 20
    },
    actionButton: {
        borderColor: '#3498db',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems:'center',
        width: 40,
        height: 40,
        backgroundColor: 'transparent',
        borderRadius: 20
    },
    actionButtonText: {
        color: '#fff',
        textAlign: 'center'
    },
    passButton: {
        marginRight: 5
    }
});

function mapStateToProps(state) {
    return {
        state: state.connect,
        appState: state.app
    };
}

export default connect(mapStateToProps)(Connect);