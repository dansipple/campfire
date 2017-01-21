
import React, { Component } from 'react';
import { Alert, TouchableOpacity, Image, StyleSheet, Dimensions, Text, View } from 'react-native';

import AppIntro from 'react-native-app-intro';

export default class Onboarding extends Component {

    constructor(props) {
        super(props);

        this.endOnboarding = this.endOnboarding.bind(this);

    }

    static navigatorStyle = {
        navBarHidden: true
    };


    endOnboarding() {
        this.props.navigator.dismissModal();
    }
    onSkipBtnHandle = (index) => {
        this.endOnboarding();
    };
    doneBtnHandle = () => {
        this.endOnboarding();
    };

    render() {
        return (
            <AppIntro
                onNextBtnClick={this.nextBtnHandle}
                onDoneBtnClick={this.doneBtnHandle}
                onSkipBtnClick={this.onSkipBtnHandle}
                onSlideChange={this.onSlideChangeHandle}
                dotColor={'#666'}
                activeDotColor={'#3498db'}
                leftTextColor={'#666'}
                rightTextColor={'#666'}
            >
                <View style={[styles.slide,{ backgroundColor: '#fff' }]}>
                    <View level={10}><Text style={styles.headline}>Welcome to Convos</Text></View>
                    <View level={15}><Text style={styles.paragraphText}>Convos is a platform for finding good
                        conversations.</Text></View>
                    <View level={15}><Text style={[styles.paragraphText, {marginTop: 25}]}>Let's find out how it
                        works!</Text></View>
                </View>
                <View style={[styles.slide, { backgroundColor: '#fff' }]}>
                    <Image source={require('../../../img/onboarding/new-convo.png')}/>
                    <View level={10}><Text style={styles.headline}>Create a Convo</Text></View>
                    <View level={15}><Text style={styles.paragraphText}>What do you want to talk about? Write it
                        down.</Text></View>
                    <View level={15}><Text style={styles.paragraphText}>We call these Convos</Text></View>
                </View>
                <View style={[styles.slide, { backgroundColor: '#fff', padding: 0 }]}>
                    <View style={{flexDirection: 'row'}}>
                        <Image style={{flex: 1}} source={require('../../../img/onboarding/swipe.png')}/>
                    </View>
                    <View level={15}><Text style={styles.paragraphText}>Swipe through other Convos to see what interests
                        you</Text></View>
                </View>
                <View style={[styles.slide, { backgroundColor: '#fff'}]}>
                    <Image source={require('../../../img/onboarding/connect.png')}/>
                    <View level={10}><Text style={styles.headline}>Connect</Text></View>
                    <View level={15}><Text style={styles.paragraphText}>When other folks swipe right on your Convos
                        they'll show up under your connect tab</Text></View>
                </View>
                <View style={[styles.slide, { backgroundColor: '#fff'}]}>
                    <Image source={require('../../../img/onboarding/topics.png')}/>
                    <View level={10}><Text style={styles.headline}>Chat and Meetup</Text></View>
                    <View level={15}><Text style={styles.paragraphText}>In person conversations are the best way to
                        talk, learn, and grow!</Text></View>
                </View>
            </AppIntro>
        );
    }
}

const styles = StyleSheet.create({
    paragraphText: {
        color: '#666',
        fontSize: 25,
        lineHeight: 35,
        marginBottom: 5,
        textAlign: 'center'
    },
    headline: {
        color: '#3498db',
        fontSize: 32
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        padding: 15
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
});

