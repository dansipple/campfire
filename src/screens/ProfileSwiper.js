import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView, View, Text, Dimensions, TouchableOpacity } from 'react-native';

import Swiper from 'react-native-swiper';

import Profile from './../components/Profile';

import {connect} from 'react-redux';

import * as profileSwiperActions from '../reducers/profileSwiper/actions';

import * as myConvosActions from '../reducers/myConvos/actions';

var Analytics = require('react-native-firebase-analytics');

class ProfileSwiper extends Component {

    constructor(props) {
        super(props);
        
        this.pass = this.pass.bind(this);
        this.connect = this.connect.bind(this);
        this.loadProfiles = this.loadProfiles.bind(this);
        this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.state.activeProfile !== nextProps.state.activeProfile) {
            // handle next profile
            if(nextProps.state.activeProfile < this.props.state.profiles.length) {
                this.swiper.scrollBy(1);
            } else {
                this.props.dispatch(myConvosActions.loadConvos());
                this.props.navigator.dismissLightBox();
            }
        }
        if(this.props.state.isLoading === true && nextProps.state.isLoading === false) {
            if(nextProps.state.profiles.length === 0) this.props.navigator.dismissLightBox();
        }
    }

    loadProfiles() {
        this.props.dispatch(profileSwiperActions.loadProfiles(this.props.card._id));
    }

    componentWillMount() {
        this.loadProfiles();

        Analytics.logEvent('MODAL_OPEN', {'id': 'profile_swiper'});
    }

    pass() {
        this.props.dispatch(profileSwiperActions.pass(this.props.state.profiles[this.props.state.activeProfile]._id, this.props.card._id));
        Analytics.logEvent('PROFILE_SWIPE', {'direction': 'no'});
    }

    connect() {
        this.props.dispatch(profileSwiperActions.connect(this.props.state.profiles[this.props.state.activeProfile]._id, this.props.card._id));
        Analytics.logEvent('PROFILE_SWIPE', {'direction': 'yes'});
    }

    _onMomentumScrollEnd(e, state) {
        if(state.index !== this.props.state.activeProfile) {
            this.props.dispatch(profileSwiperActions.updateActiveProfile(state.index));
        }
    }

    render() {
        const that = this;

        let {height, width} = Dimensions.get('window');
        if(this.props.state.profiles.length) {
            return (
                <View style={{ width: width, height: height }}>
                    <TouchableOpacity style={styles.top} onPress={() => this.props.navigator.dismissLightBox()}>
                        <Text style={styles.count}>{this.props.state.activeProfile + 1} of {this.props.state.profiles.length}</Text>
                        <Image style={styles.closeButton} source={require('../../img/close.png')}/>
                    </TouchableOpacity>
                    <Swiper
                        ref={component => this.swiper = component}
                        horizontal={true}
                        loop={false}
                        scrollEnabled={false}
                        showsPagination={false}
                        loadMinimal={true}
                        index={0}
                    >

                        {this.props.state.profiles.map(function (card, i) {
                            return (
                                <View key={i} style={{height: height - 50}}>
                                    <Profile pass={that.pass} connect={that.connect} profileData={card}/>
                                </View>
                            );
                        })}
                    </Swiper>
                </View>
            );
        } else {
            return <View />
        }
    }
}

const styles = StyleSheet.create({
    top: {
        padding: 20,
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    closeButton: {
        tintColor: '#fff'
    },
    count: {
        color: '#fff'
    }
});

function mapStateToProps(state) {
    return {
        state: state.profileSwiper
    };
}

export default connect(mapStateToProps)(ProfileSwiper);