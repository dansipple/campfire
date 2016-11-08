import React, { Component } from 'react';
import {TouchableHighlight, Text, Image, View} from 'react-native';
import Swiper from 'react-native-swiper';
import ChooseNetwork from './ChooseNetwork';
import ConvoSwiper from './ConvoSwiper';
import MyConvos from './MyConvos';

import {connect} from 'react-redux';

class Root extends Component {
    static navigatorStyle = {
        navBarHidden: true,
        drawUnderNavBar: true
    };

    constructor(props) {
        super(props);
        this.state = {
            renderMyConvos: false,
            renderNetworks: false,
            showFab: true,
            swipingEnabled: false
        };
        this.router = this.router.bind(this);
        this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
    }
    

    router(route, data) {
        switch(route){
            case 'messages':
                this.props.navigator.push({
                    title: 'Messages',
                    backButtonTitle: '',
                    screen: 'Inbox'
                });
                return;
            case 'settings':
                this.props.navigator.push({
                    title: 'Settings',
                    backButtonTitle: '',
                    screen: 'Settings'
                });
                return;
            case 'network':
                if(!this.state.renderNetworks) {
                    this.setState({
                        renderNetworks: true
                    }, () => {
                        setTimeout(() => {
                            this.swiper.scrollBy(-1);
                        }, 100);
                    });
                } else {
                    this.swiper.scrollBy(-1);
                }
                return;
            case 'newConvo':
                this.props.navigator.showModal({
                    title: 'New Convo',
                    screen: 'NewConvo'
                });
                return;
            case 'myConvos':
                if(!this.state.renderMyConvos) {
                    this.setState({
                        renderMyConvos: true
                    }, () => {
                        setTimeout(() => {
                            this.swiper.scrollBy(1);
                        }, 100);
                    });
                } else {
                    this.swiper.scrollBy(1);
                }
                return;
            case 'editConvo':
                this.props.navigator.showModal({
                    title: 'Edit Convo',
                    screen: 'NewConvo',
                    passProps: {
                        card: data
                    }
                });
                return;
            case 'viewInterested':
                this.props.navigator.showLightBox({
                    screen: "ProfileSwiper",
                    passProps: {
                        card: data
                    },
                    style: {
                        backgroundBlur: "dark"
                    }
                });
                return;
            case 'home':
                this.swiper.scrollBy(-1);
                return;
        }
    }



    _onMomentumScrollEnd(e, state, context) {
        this.setState({
            showFab: state.index !== 0,
            swipingEnabled: state.index !== 1
        });
    }

    render() {
        const appState = this.props.appState;
        const convoSwiperState = this.props.convoSwiperState;
        const myConvosState = this.props.myConvosState;
        const networksState = this.props.networksState;

        return (
            <View>
            <Swiper
                ref={component => this.swiper = component}
                horizontal={false}
                loop={false}
                showsPagination={false}
                scrollEnabled={this.state.swipingEnabled}
                scrollsToTop={true}
                loadMinimal={true}
                onMomentumScrollEnd={this._onMomentumScrollEnd}
                index={1}>
                {this.state.renderNetworks ?
                <ChooseNetwork
                    dispatch={this.props.dispatch}
                    state={networksState}
                    appState={appState}
                    router={this.router}
                /> : null }

                <ConvoSwiper
                    dispatch={this.props.dispatch}
                    state={convoSwiperState}
                    appState={appState}
                    router={this.router}
                />

                {this.state.renderMyConvos ?
                    <MyConvos
                        dispatch={this.props.dispatch}
                        state={myConvosState}
                        router={this.router}
                    /> : null }
            </Swiper>
            <TouchableHighlight
                onPress={this.router.bind(this, 'newConvo')}
                underlayColor={'#f9f9f9'}
                style={[{width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: '#fff',
                        position: 'absolute',
                        shadowColor: '#000',
                        shadowOpacity: 0.2,
                        shadowRadius: 8,
                        bottom: 10,
                        right: 10,
                        justifyContent: 'center',
                        alignItems: 'center'}, !this.state.showFab && {opacity: 0, height: 0, width: 0}]}
            >
                <Image style={{tintColor: '#3498db'}} source={require('../../img/add.png')} />
            </TouchableHighlight>
        </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        appState: state.app,
        convoSwiperState: state.convoSwiper,
        myConvosState: state.myConvos,
        networksState: state.networks
    };
}

export default connect(mapStateToProps)(Root);