import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, ListView, ScrollView, Image, View, Text} from 'react-native';
import moment from 'moment';

import MyConvoCard from './../components/MyConvoCard';
import * as myConvosActions from '../reducers/myConvos/actions';


export default class MyConvos extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds
        };
        this._isMounted = false;
        this._renderRow = this._renderRow.bind(this);

        this.loadConvos = this.loadConvos.bind(this);
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

    _renderRow(convoData) {
        const updatedTime = moment(convoData.createdAt).format('MMM D');
        return (
            <View>
                <Text style={styles.timestamp}>{updatedTime}</Text>
                <MyConvoCard
                    cardData={convoData} 
                    router={this.props.router}
                    viewInterested={() => {this.props.router('viewInterested', convoData)}}
                    editCard={() => {this.props.router('editConvo', convoData)}}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#eee'}}>
                <View style={[styles.header, styles.headerWhite]}>
                    <TouchableOpacity onPress={() => this.props.router('home')}>
                        <Image style={styles.headerIcon} source={require('../../img/settings.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.router('home')}>
                        <Text style={{color: '#666', fontSize: 16, fontWeight: 'bold'}}>Your Convos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.router('newConvo')}>
                        <Text>New</Text>
                    </TouchableOpacity>
                </View>
                {this.props.state.convos.length ?
                    (<ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        style={{ flex: 1, padding: 25 }}
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
