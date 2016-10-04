import React, {Component} from 'react';
import {Picker, Image, TouchableOpacity, TouchableHighlight, Text, TextInput, View, StyleSheet, Dimensions, Keyboard } from 'react-native';


import CardController from '../lib/controllers/card';


export default class ModalScreen extends Component {
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
        this.state = {
            text: '',
            category: 'general',
            showCategoryPicker: false,
            windowHeight: Dimensions.get('window').height
        };
        // if you want to listen on navigator events, set this up
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.saveConvo = this.saveConvo.bind(this);
        this.toggleCategoryPicker = this.toggleCategoryPicker.bind(this);
    }

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
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

    onNavigatorEvent(event) {
        if (event.id == 'close') {
            this.props.navigator.dismissModal();
        }
        else if (event.id == 'save') {
            this.saveConvo();
        }
    }

    saveConvo() {
        CardController.create('-KPzFYEKdj3yRQn3teTP', this.state.text, this.state.category, '-KPzFJ697NbkNZoHVBR7')
            .then((card) => {
                this.props.navigator.dismissModal();
        });
    }

    toggleCategoryPicker() {
        const status = !this.state.showCategoryPicker;
        this.setState({
            showCategoryPicker: status
        });
    }

    render() {
        const styles = StyleSheet.create({
            textareaContainer: {
                height: this.state.windowHeight
            },
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
                paddingTop: 40,
                paddingLeft: 15,
                paddingRight: 15,
                flexDirection: 'row',
                justifyContent: 'space-between'
            },
            saveButton: {
                backgroundColor: '#3498db',
                borderColor: '#3498db',
                borderWidth: 1,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 35,
                paddingRight: 35,
                borderRadius: 8
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
                justifyContent: 'flex-end',
                borderTopWidth: 1,
                borderTopColor: '#ddd',
                padding: 10
            },
            hidden: {
                flex: 0,
                height: 0,
                width: 0,
                padding: 0,
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
            }
        });
        return (
            <View style={[styles.textareaContainer, this.state.showCategoryPicker && {backgroundColor: '#f9f9f9'}]}>
                <View style={[styles.header, this.state.showCategoryPicker && styles.hidden]}>
                    <TouchableOpacity
                        onPress={this.toggleCategoryPicker}
                    >
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{fontSize: 15, color: '#777'}}>#{this.state.category}</Text>
                            <Image style={{height: 10, width: 10, marginLeft: 5, marginTop: 5, tintColor: '#777'}}
                                   source={require('../../img/down-arrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.navigator.dismissModal}>
                        <Image source={require('../../img/close.png')}/>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={[styles.textareaStyle, this.state.showCategoryPicker && styles.hidden]}
                    autoFocus={true}
                    onChange={(event) => {
                        this.setState({
                            text: event.nativeEvent.text
                        });
                    }}
                    value={this.state.text}
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
                    <TouchableHighlight
                        onPress={this.saveConvo}
                        style={[styles.saveButton, !this.state.text.length && styles.saveButtonInactive]}
                        disabled={!this.state.text.length}
                        underlayColor={'#1b87d0'}
                    >
                        <Text style={[styles.saveButtonText, !this.state.text.length && styles.saveButtonTextInactive]}
                        >Save</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

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
        name: 'Other'
    }
];
