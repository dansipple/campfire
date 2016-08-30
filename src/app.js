
import React, { Component } from 'react';
import { StyleSheet, Navigator } from 'react-native';

import { Container, Header, Title, Icon, Content, Button, View } from 'native-base';

import Swiper from './lib/views/swiper.js';

import MessageThread from './lib/views/MessageThread.js';

export var globalNav = {};

export default class app extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        globalNav.navigator = this._navigator;
    }

    renderScene(route, navigator) {
        if(route.idx == 1) {
            return (
                <MessageThread />
            )
        }
        else if (route.idx == 0) {
            return (
                <Swiper />
            )
        }
    }


    render() {
        const routes = [
            { title: 'Discover', idx: 0 },
            { title: 'Messages', idx: 1 }
        ];

        return (
            <Container style={styles.bg}>
                <Header style={styles.header}>
                    <Button transparent>
                        <Icon name="ios-menu" style={styles.button} />
                    </Button>

                    <Title style={styles.headerTitle}>Discover</Title>

                    <Button transparent onPress={() => this._navigator.push(routes[1])}>
                        <Icon name="ios-chatbubbles" style={styles.button} />
                    </Button>
                </Header>
                <View>
                    <Navigator
                        ref={(ref) => this._navigator = ref}
                        configureScene={(route) => {
                            return Navigator.SceneConfigs.FloatFromRight;
                        }}
                        initialRoute={routes[0]}
                        initialRouteStack={routes}
                        renderScene={this.renderScene}
                    />
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: '#fff',
        borderBottomColor: '#ccc',
        borderBottomWidth: 2
    },
    headerTitle: {
        color: '#555'
    },
    buttonActive: {
        color: '#17BBB0'
    },
    button: {
        color: '#657576'
    },
    content: {
        flex: 1
    }
});
