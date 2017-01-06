
import React, { Component } from 'react';
import { TouchableHighlight, Image, StyleSheet, Text, View } from 'react-native';

export default class Nav extends Component {

    constructor(props) {
        super(props);

        this.switchNetwork = this.switchNetwork.bind(this);
    }

    switchNetwork() {
        this.props.navigator.showModal({
            title: 'Networks',
            screen: 'ChooseNetwork',
            navigatorButton: {
                rightButtons: [{
                    title: 'Cancel',
                    id: 'close',
                    icon: require('../../img/close.png')
                }]
            }
        });
    }

    render() {
        const styles = StyleSheet.create({
            nav: {
                height: 65,
                paddingTop: 24,
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
                paddingLeft: 15,
                paddingRight: 15,
                flexDirection: 'row',
                justifyContent: 'space-between'
            },
            navSubtitle: {
                color: '#666',
                fontSize: 12
            },
            navTitle: {
                color: '#3498db',
                fontSize: 16
            },
            switchBtn: {
                borderWidth: 1,
                height: 30,
                borderColor: '#eee',
                borderRadius: 3,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 10,
                paddingRight: 10
            },
            switchBtnText: {
                color: '#666',
                fontSize: 12
            },
        });

        return (
            <View style={styles.nav}>
                <View>
                    <Text style={styles.navSubtitle}>Now Discovering</Text>
                    <Text style={styles.navTitle}>{this.props.currentNetwork.name}</Text>
                </View>
                <TouchableHighlight underlayColor="#f9f9f9" onPress={this.switchNetwork} style={styles.switchBtn}>
                    <Text style={styles.switchBtnText}>Switch</Text>
                </TouchableHighlight>
            </View>
        );

    }
}
