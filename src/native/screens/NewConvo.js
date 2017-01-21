import React, {Component} from 'react';
import {Alert, Picker, Image, TouchableOpacity, TouchableHighlight, Text, TextInput, ListView, RefreshControl, View, StyleSheet, Dimensions, Keyboard } from 'react-native';
import moment from 'moment';

import MyConvoCard from '../components/MyConvoCard';
import * as myConvosActions from '../reducers/myConvos/actions';

import {connect} from 'react-redux';

var Analytics = require('react-native-firebase-analytics');

class NewConvo extends Component {
    static navigatorButtons = {
        leftButtons: [{
            title: 'Cancel',
            id: 'close'
        }],
        rightButtons: [{
            title: 'Save',
            id: 'save'
        }]
    };
    static navigatorStyle = {
        navBarButtonColor: '#666',
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            tab: 0,
            content: '',
            category: 'general',
            showCategoryPicker: false,
            isFocused: false,
            windowHeight: Dimensions.get('window').height,
            dataSource: ds
        };
        this._renderRow = this._renderRow.bind(this);
        this.saveConvo = this.saveConvo.bind(this);
        this.deleteConvo = this.deleteConvo.bind(this);

        this.unfocusTextbox = this.unfocusTextbox.bind(this);

        this.loadConvos = this.loadConvos.bind(this);
        this.changeTab = this.changeTab.bind(this);

        this.toggleCategoryPicker = this.toggleCategoryPicker.bind(this);
    }

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));

        if(this.props.card) {
            this.setState({
                content: this.props.card.content || '',
                category: this.props.card.category || 'general'
            });
            Analytics.logEvent('edit_convo_open');
        } else {
            Analytics.logEvent('create_convo');
        }

        this.loadConvos();
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    keyboardWillShow (e) {
        let newSize = Dimensions.get('window').height - e.endCoordinates.height;
        this.setState({
            windowHeight: newSize
        })
    }

    keyboardWillHide (e) {
        this.setState({
            windowHeight: Dimensions.get('window').height
        });
    }

    async saveConvo() {
        this.props.dispatch(myConvosActions.createConvo(this.state.content, this.state.category));
        Analytics.logEvent('CONVO_CREATE', {'category': this.state.category});

        this.loadConvos();
        this.changeTab(1);
        this.setState({
            content: '',
            category: 'general'
        })
    }

    deleteConvo(convoData) {
        if(convoData) {
            Alert.alert(
                'Are you sure?',
                'If you delete this convo you won\'t be able to go back!',
                [
                    {text: 'Cancel', style: 'cancel'},
                    {text: 'Delete', onPress: () => {
                        this.props.dispatch(myConvosActions.deleteConvo(convoData._id));
                        this.loadConvos();
                    }}
                ]
            );

        }
    }

    toggleCategoryPicker() {
        const status = !this.state.showCategoryPicker;
        this.setState({
            showCategoryPicker: status
        });
    }

    unfocusTextbox() {
        this.setState({
            isFocused: false
        });
        this.refs.input.blur();
    }

    loadConvos() {
        this.props.dispatch(myConvosActions.loadConvos());
    }

    _renderRow(convoData) {
        const updatedTime = moment(convoData.createdAt).format('MMM D');
        return (
            <View>
                <Text style={styles.timestamp}>{updatedTime}</Text>
                <MyConvoCard
                    cardData={convoData}
                    deleteConvo={() => this.deleteConvo(convoData)}
                />
            </View>
        );
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.state.convos !== this.props.state.convos) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.state.convos)
            });
        }
    }
    changeTab(tabIdx) {
        this.setState({
            tab: tabIdx
        })
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={[{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd', padding: 13, paddingTop: 32}, this.state.showCategoryPicker && styles.hidden]}>
                    <TouchableOpacity onPress={() => {this.changeTab(0)}} style={{flex: 0.5, alignItems: 'center'}}>
                        <Text style={[{ fontSize: 16, color: '#666'}, this.state.tab === 0 && {color: '#3498db'}]}>New Convo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.changeTab(1)}} style={{flex: 0.5, alignItems: 'center'}}>
                        <Text style={[{fontSize: 16, color: '#666'}, this.state.tab === 1 && {color: '#3498db'}]}>Your Convos</Text>
                    </TouchableOpacity>
                </View>

                {this.state.tab === 0 ? (
                <View style={[{height: this.state.windowHeight - 65}, this.state.showCategoryPicker && {height: this.state.windowHeight, backgroundColor: '#f9f9f9'}]}>
                    <View style={[styles.header, this.state.showCategoryPicker && styles.hidden]}>
                        <TouchableOpacity
                            onPress={this.toggleCategoryPicker}
                        >
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Text style={{fontSize: 15, color: '#777'}}>#{this.state.category}</Text>
                                <Image style={{height: 10, width: 10, marginLeft: 5, marginTop: 5, tintColor: '#777'}}
                                       source={require('../../../img/down-arrow.png')}/>
                            </View>
                        </TouchableOpacity>
                        {this.state.isFocused ? (
                            <TouchableOpacity onPress={this.unfocusTextbox}>
                                <Image source={require('../../../img/close.png')}/>
                            </TouchableOpacity>
                        ) : <View/>}
                    </View>

                    <TextInput
                        ref="input"
                        style={[styles.textareaStyle, this.state.showCategoryPicker && styles.hidden]}
                        onChange={(event) => {
                            this.setState({
                                content: event.nativeEvent.text
                            });
                        }}
                        onFocus={() => {
                            this.setState({
                                isFocused: true
                            });
                        }}
                        autoFocus={true}
                        value={this.state.content}
                        placeholder="What do you want to talk about today?"
                        multiline={true}
                    />
                    <View style={[{flex: 1, padding: 30}, !this.state.showCategoryPicker && styles.hidden]}>
                        <Text style={{fontSize: 13, textAlign: 'center', color: '#777', padding: 10}}>
                            Select a Category</Text>
                        <Picker
                            style={{flex:1}}
                            selectedValue={this.state.category}
                            onValueChange={(cat) => this.setState({category: cat})}>
                            <Picker.Item label="science" value="science" />
                            <Picker.Item label="art" value="art" />
                            <Picker.Item label="tech" value="tech" />
                            <Picker.Item label="general" value="general" />
                            <Picker.Item label="sports" value="sports" />
                            <Picker.Item label="food" value="food" />
                            <Picker.Item label="music" value="music" />
                            <Picker.Item label="business" value="business" />
                            <Picker.Item label="travel" value="travel" />
                        </Picker>
                        <TouchableHighlight
                            style={styles.doneButton}
                            onPress={this.toggleCategoryPicker}
                            underlayColor={'#aaa'}
                        >
                            <Text style={styles.doneButtonText}>Done</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={[styles.actions, this.state.showCategoryPicker && styles.hidden]}>
                        <TouchableOpacity
                            style={{padding: 8}}
                            onPress={this.deleteConvo}
                        >
                            <Image style={[{height: 20, width: 20}, !this.props.card && {tintColor: '#fff'}]} source={require('../../../img/trash.png')} />
                        </TouchableOpacity>
                        <TouchableHighlight
                            onPress={this.saveConvo}
                            style={[styles.saveButton, !this.state.content.length && styles.saveButtonInactive]}
                            disabled={!this.state.content.length}
                            underlayColor={'#1b87d0'}
                        >
                            <Text
                                style={[styles.saveButtonText, !this.state.content.length && styles.saveButtonTextInactive]}
                            >
                                Save
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
                ) : (
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
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textareaStyle: {
        borderColor: 'transparent',
        backgroundColor: '#fff',
        flex: 1,
        fontSize: 18,
        lineHeight: 26,
        color: '#666',
        padding: 15
    },
    header: {
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    saveButton: {
        backgroundColor: '#3498db',
        borderColor: '#3498db',
        borderWidth: 1,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 35,
        paddingRight: 35,
        borderRadius: 8,
        justifyContent: 'center'
    },
    saveButtonInactive: {
        backgroundColor: '#f9f9f9',
        borderColor: '#eee',
        borderWidth: 1
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center'
    },
    saveButtonTextInactive: {
        color: '#777'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        padding: 6
    },
    hidden: {
        flex: 0,
        height: 0,
        width: 0,
        padding: 0,
        paddingTop: 0,
        opacity: 0
    },
    doneButton: {
        backgroundColor: '#bbb',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 65,
        paddingRight: 65,
        borderRadius: 8
    },
    doneButtonText: {
        color: '#fff',
        textAlign: 'center'
    },
    timestamp: {
        fontSize: 13,
        textAlign: 'center',
        paddingBottom: 10,
        color: '#888'
    }
});

const categories = [
    {
        id: 0,
        name: 'Science'
    },
    {
        id: 1,
        name: 'Art'
    },
    {
        id: 2,
        name: 'Tech'
    },
    {
        id: 3,
        name: 'Sports'
    },
    {
        id: 4,
        name: 'Food'
    },
    {
        id: 5,
        name: 'Music'
    },
    {
        id: 6,
        name: 'Business'
    },
    {
        id: 7,
        name: 'Education'
    },
    {
        id: 8,
        name: 'Other'
    }
];

function mapStateToProps(state) {
    return {
        state: state.myConvos,
        appState: state.app
    };
}

export default connect(mapStateToProps)(NewConvo);
