
import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, Image, StyleSheet, Dimensions, RefreshControl, ListView, Text, View } from 'react-native';

import * as networksActions from '../reducers/networks/actions';
import * as appActions from '../reducers/app/actions';

import {connect} from 'react-redux';

var Analytics = require('react-native-firebase-analytics');

class ChooseNetwork extends Component {
    static navigatorButtons = {
        rightButtons: [{
            title: 'Cancel',
            id: 'close',
            icon: require('../../../img/close.png')
        }]
    };

    static navigatorStyle = {
        navBarButtonColor: '#666',
        navBarTextColor: '#666'
    };

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds
        };
        this._isMounted = false;
        this._renderRow = this._renderRow.bind(this);

        this.loadNetworks = this.loadNetworks.bind(this);
        this.createNetwork = this.createNetwork.bind(this);
        this.joinNetwork = this.joinNetwork.bind(this);
        this.goToAdmin = this.goToAdmin.bind(this);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }

    onNavigatorEvent(event) {
        if (event.type == 'DeepLink') {
            this.handleDeepLink(event);
        } else {
            switch (event.id) {
                case 'close':
                    this.props.navigator.dismissModal();
                    break;

                default:
                    console.log('Unhandled event ' + event.id);
                    break;
            }
        }
    }

    createNetwork() {
        this.props.navigator.push({
            title: 'Create a Network',
            screen: 'CreateNetwork',
            backButtonTitle: ''
        });
    }

    joinNetwork() {
        this.props.navigator.push({
            title: 'Join a Network',
            screen: 'JoinNetwork',
            backButtonTitle: ''
        });
    }

    loadNetworks() {
        this.props.dispatch(networksActions.loadNetworks());
    }

    selectNetwork(network) {
        this.props.dispatch(appActions.selectNetwork(network));

        Analytics.logEvent('NETWORK_SELECT');
    }

    goToAdmin(network) {
        this.props.navigator.push({
            title: 'Manage Network',
            screen: 'Invite',
            backButtonTitle: '',
            passProps: {
                network: network
            }
        });
    }

    componentWillMount() {
        this.loadNetworks();


        if(this.props.appState.showOnboarding) {
            this.props.navigator.showModal({
                screen: 'Onboarding'
            });
        }

        // hackish way to remove x button. Look for better way to do this. The recommended method wasn't working
        if(this.props.isRoot) {
            this.props.navigator.setButtons({
                rightButtons: [{}]
            })
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.state.networks !== this.props.state.networks) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.state.networks)
            })
        }
    }

    _renderRow(data) {
        if(data.isAdmin) {
            return (
                <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#ddd'}}>
                    <TouchableHighlight style={{flex: 1, padding: 20}} onPress={() => {this.selectNetwork(data)}} underlayColor="#f9f9f9">
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{color: '#555', fontSize: 16}}>{data.name}</Text>
                            { data._id === this.props.appState.currentNetwork._id ? <Image style={{tintColor: '#3498db'}} source={require('../../../img/check.png')} /> : null }
                        </View>
                    </TouchableHighlight>
                    <TouchableOpacity style={{padding: 20, paddingLeft: 0}}  onPress={() => {this.goToAdmin(data)}} underlayColor="#f9f9f9">
                        <Image style={{tintColor: '#666'}} source={require('../../../img/settings.png')} />
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return (

                    <TouchableHighlight onPress={() => {this.selectNetwork(data)}} underlayColor="#f9f9f9">
                        <View style={{backgroundColor: '#fff', padding: 20, borderTopWidth: 1, borderColor: '#ddd'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{color: '#555', fontSize: 16}}>{data.name}</Text>
                                { data._id === this.props.appState.currentNetwork._id ? <Image style={{tintColor: '#3498db'}} source={require('../../../img/check.png')} /> : null }
                            </View>
                        </View>
                    </TouchableHighlight>
            );
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#eee', paddingBottom: 30}}>
                {this.props.state.networks.length ?
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        style={{ flex: 1, paddingTop: 30, paddingBottom: 30 }}
                        refreshControl={
                          <RefreshControl
                            refreshing={this.props.state.isLoading}
                            onRefresh={this.loadNetworks}
                            style={{ backgroundColor: 'transparent' }}
                          />
                        }
                    /> : <View style={{ flex: 1, paddingTop: 30, paddingBottom: 30 }} />}
                <TouchableHighlight onPress={this.joinNetwork} underlayColor="#f9f9f9">
                    <View style={{backgroundColor: '#fff', padding: 20, borderTopWidth: 1, borderColor: '#ddd'}}>
                        <Text style={{color: '#555', fontSize: 18}}>Join a Network</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.createNetwork} underlayColor="#f9f9f9">
                    <View style={{backgroundColor: '#fff', padding: 20, borderTopWidth: 1, borderColor: '#ddd'}}>
                        <Text style={{color: '#555', fontSize: 18}}>Create a Network</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3498db',
        padding: 15,
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
    },
    headerWhite: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 10,
        paddingTop: 30
    },
    headerText: {
        color: '#fff',
        fontSize: 15,
        lineHeight: 20
    },
    headerIcon: {
        tintColor: '#fff'
    }
});

function mapStateToProps(state) {
    return {
        state: state.networks,
        appState: state.app
    };
}

export default connect(mapStateToProps)(ChooseNetwork);