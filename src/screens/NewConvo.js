import React, {Component} from 'react';
import { Animated, PanResponder, TouchableOpacity, Text, TextInput, View, StyleSheet, Dimensions, Keyboard } from 'react-native';

import clamp from 'clamp';

import { Icon } from 'native-base';

import Colors from '../lib/utils/colors';

import CardController from '../lib/controllers/card';

var SWIPE_THRESHOLD = 120;

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
        navBarButtonColor: '#666'
    };

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            height: 35,
            categoryIdx: 0,
            windowHeight: Dimensions.get('window').height,
            pan: new Animated.ValueXY(),
            enter: new Animated.Value(0.5)
        };
        // if you want to listen on navigator events, set this up
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.previousCategory = this.previousCategory.bind(this);
        this.nextCategory = this.nextCategory.bind(this);

        this.saveConvo = this.saveConvo.bind(this);
    }

    previousCategory() {
        const categoryIdx = this.state.categoryIdx;
        let nextCategoryIdx = categoryIdx - 1;

        // if at first card go to last card
        if(categoryIdx === 0) {
            nextCategoryIdx = categories.length - 1;
        }

        this.setState({
            categoryIdx: nextCategoryIdx
        })
    }

    nextCategory() {
        const categoryIdx = this.state.categoryIdx;
        let nextCategoryIdx = categoryIdx + 1;

        // if at last card go to first card
        if(categoryIdx === categories.length - 1) {
            nextCategoryIdx = 0;
        }
        this.setState({
            categoryIdx: nextCategoryIdx
        })
    }

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));

        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
                this.state.pan.setValue({x: 0, y: 0});
            },

            onPanResponderMove: Animated.event([
                null, {dx: this.state.pan.x, dy: this.state.pan.y},
            ]),

            onPanResponderRelease: (e, {vx, vy}) => {
                this.state.pan.flattenOffset();
                var velocity;

                if (vx >= 0) {
                    velocity = clamp(vx, 3, 5);
                } else if (vx < 0) {
                    velocity = clamp(vx * -1, 3, 5) * -1;
                }

                if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
                    if (velocity>0) {
                        this.nextCategory();
                    } else {
                        this.previousCategory();
                    }
                    Animated.decay(this.state.pan, {
                        velocity: {x: velocity, y: vy},
                        deceleration: 0.98
                    }).start(this._resetState.bind(this))
                } else if(Math.abs(this.state.pan.y._value) > SWIPE_THRESHOLD){
                    console.log('swiped up!');
                } else {
                    Animated.spring(this.state.pan, {
                        toValue: {x: 0, y: 0},
                        friction: 4
                    }).start()
                }
            }
        })
    }

    _resetState() {
        this.state.pan.setValue({x: 0, y: 0});
        this.state.enter.setValue(0);
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
        CardController.create('-KPzFYEKdj3yRQn3teTP', this.state.text, categories[this.state.categoryIdx].name, '-KPzFJ697NbkNZoHVBR7').then((card) => {
            this.props.navigator.dismissModal();
        });
    }

    render() {
        const styles = StyleSheet.create({
            textareaContainer: {
                justifyContent: 'center',
                alignItems: 'center',
                height: this.state.windowHeight - 160
            },
            categoryContainer: {
                flexDirection: 'row'
            },
            category: {
                flex: 0.8,
                paddingTop: 10
            },
            categoryLabel: {
                fontSize: 15,
                color: '#fff',
                textAlign: 'center'
            },
            categoryName: {
                fontSize: 32,
                color: '#fff',
                textAlign: 'center'
            },
            arrowLeft: {
                color: '#fff',
                flex: 0.1,
                lineHeight: 50
            },
            arrowRight: {
                color: '#fff',
                flex: 0.1,
                lineHeight: 50,
                textAlign: 'right'
            }
        });
        const textareaStyle = {
            borderColor: 'transparent',
            fontSize: 22,
            color: '#fff',
            textAlign: 'center',
            height: Math.max(35, this.state.height)
        };
        return (
            <View style={{flex: 1, padding: 20, backgroundColor: Colors.categories[categories[this.state.categoryIdx].name]}}>
                <Animated.View {...this._panResponder.panHandlers}>
                    <View style={styles.textareaContainer}>
                        <TextInput
                            style={textareaStyle}
                            autoFocus={true}
                            onChange={(event) => {
                                this.setState({
                                    text: event.nativeEvent.text,
                                    height: event.nativeEvent.contentSize.height
                                });
                            }}
                            value={this.state.text}
                            multiline = {true}
                        />
                    </View>
                    <View style={styles.categoryContainer}>
                        <TouchableOpacity onPress={this.previousCategory}>
                            <Icon style={styles.arrowLeft} name="ios-arrow-back"/>
                        </TouchableOpacity>
                        <View style={styles.category}>
                            <Text style={styles.categoryLabel}>Category</Text>
                            <Text style={styles.categoryName}>{categories[this.state.categoryIdx].name}</Text>
                        </View>
                        <TouchableOpacity onPress={this.nextCategory}>
                            <Icon style={styles.arrowRight} name="ios-arrow-forward"/>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
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
