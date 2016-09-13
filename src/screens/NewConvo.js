import React, {Component} from 'react';
import { TouchableOpacity, Text, TextInput, View, StyleSheet, Dimensions, Keyboard } from 'react-native';

import { Content, Icon } from 'native-base';

import Colors from '../lib/utils/colors'

export default class ModalScreen extends Component {
    static navigatorButtons = {
        leftButtons: [{
            title: 'X',
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
            windowHeight: Dimensions.get('window').height
        };
        // if you want to listen on navigator events, set this up
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.previousCategory = this.previousCategory.bind(this);
        this.nextCategory = this.nextCategory.bind(this);
    }

    previousCategory() {
        const categoryIdx = this.state.categoryIdx;
        let nextCategoryIdx = categoryIdx - 1;

        if(categoryIdx === 0) {
            nextCategoryIdx = categories.length;
        }

        this.setState({
            categoryIdx: nextCategoryIdx
        })
    }

    nextCategory() {
        const categoryIdx = this.state.categoryIdx;
        let nextCategoryIdx = categoryIdx + 1;

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
      </View>
    );
    }
    onNavigatorEvent(event) {
    if (event.id == 'close') {
      this.props.navigator.dismissModal();
    }
    }
}
/*
<Picker
    selectedValue={this.state.category}
    onValueChange={(category) => this.setState({category: category})}
    mode="dialog"
>
    <Picker.Item label="Art" value="art" />
    <Picker.Item label="Food" value="food" />
    <Picker.Item label="Science" value="science" />
    <Picker.Item label="Music" value="music" />
    <Picker.Item label="Business" value="business" />
    <Picker.Item label="Tech" value="tech" />
    <Picker.Item label="Sports" value="sports" />
    <Picker.Item label="Other" value="other" />
</Picker>
*/


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
