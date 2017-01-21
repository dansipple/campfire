import React, {Component} from 'react';
import {
  Text,
StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class SideMenu extends Component {
    static navigatorStyle = {
        statusBarHidden: true
    };

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ScrollView style={styles.sidebar}>
                <View style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Edit Profile</Text>
                </View>
                <View style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Settings</Text>
                </View>
                <View style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Notifications</Text>
                </View>
                <View style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Log Out</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    sidebar: {
        backgroundColor: '#535355',
        flex: 1,
        paddingTop: 20
    },
    menuItem: {
        padding: 25,
        borderBottomWidth: 0.5,
        borderBottomColor: '#777'
    },
    menuItemText: {
        color: '#fff',
        paddingLeft: 20,
        fontSize: 18
    }
});
