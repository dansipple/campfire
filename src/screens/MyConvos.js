import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, ListView, ScrollView, Image, View, Text} from 'react-native';
import moment from 'moment';

import MyConvoCard from './../components/MyConvoCard';
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
                icon: require('../../img/grid.png'),
                title: 'Networks',
                id: 'networks'
            }
        ],
        rightButtons: [
            {
                icon: require('../../img/compose.png'),
                title: 'Add',
                id: 'add'
            }
        ]
    };

    onNavigatorEvent(event) {
        if (event.type == 'DeepLink') {
            this.handleDeepLink(event);
        } else {
            switch (event.id) {
                case 'networks':
                    this.props.navigator.showModal({
                        title: 'Networks',
                        screen: 'ChooseNetwork'
                    });
                    break;

                case 'add':
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
            })
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
                        style={{ flex: 1, padding: 10 }}
                    />) : (<View />)}
            </View>
        )
    }
};

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
        state: state.myConvos
    };
}

export default connect(mapStateToProps)(MyConvos);