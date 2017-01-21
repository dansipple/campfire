import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, ListView, RefreshControl, Image, View, Text} from 'react-native';
import moment from 'moment';

import MyConvoCard from '../components/MyConvoCard';
import * as myConvosActions from '../reducers/myConvos/actions';

import {connect} from 'react-redux';

class MyConvos extends Component {

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

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../../../img/grid.png'),
                title: 'Networks',
                id: 'change-networks'
            }
        ],
        rightButtons: [
            {
                icon: require('../../../img/compose.png'),
                title: 'Add',
                id: 'add-convo'
            }
        ]
    };

    onNavigatorEvent(event) {
        if (event.type == 'DeepLink') {
            this.handleDeepLink(event);
        } else {
            switch (event.id) {
                case 'change-networks':
                    this.props.navigator.showModal({
                        title: 'Networks',
                        screen: 'ChooseNetwork'
                    });
                    break;

                case 'add-convo':
                    this.props.navigator.showModal({
                        title: 'New Convo',
                        screen: 'NewConvo'
                    });
                    break;

                default:
                    console.log('Unhandled event ' + event.id);
                    break;
            }
        }
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
            <View style={{flex: 1, backgroundColor: '#eee'}}>
                {this.props.state.convos.length ?
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
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3498db',
        padding: 15,
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    },
    interestedThumbnail: {
        height: 60,
        width: 60,
        borderRadius: 30,
        margin: 5
    },
    timestamp: {
        fontSize: 13,
        textAlign: 'center',
        paddingBottom: 10,
        color: '#888'
    }
});

function mapStateToProps(state) {
    return {
        state: state.myConvos,
        appState: state.app
    };
}

export default connect(mapStateToProps)(MyConvos);