import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
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
                this.props.navigator.showModal({
                    title: 'Networks',
                    screen: 'ChooseNetwork'
                });
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
                        }, 500);
                    });
                } else {
                    this.swiper.scrollBy(1);
                }
                return;
            case 'editConvo':
                this.props.navigator.showModal({
                    title: 'Edit Convo',
                    screen: 'NewConvo'
                });
                return;
            case 'viewInterested':
                this.props.navigator.showLightBox({
                    screen: "ProfileSwiper",
                    passProps: {},
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
        let enableSwiping = true;

        if(state.index === 0) {
            enableSwiping = false;
        }

        this.setState({
            swipingEnabled: enableSwiping
        });
    }

    render() {
        const appState = this.props.appState;
        const convoSwiperState = this.props.convoSwiperState;
        const myConvosState = this.props.myConvosState;

        return (
            <Swiper
                ref={component => this.swiper = component}
                horizontal={false}
                loop={false}
                showsPagination={false}
                scrollEnabled={this.state.swipingEnabled}
                scrollsToTop={true}
                loadMinimal={true}
                onMomentumScrollEnd={this._onMomentumScrollEnd}
                index={0}>

                <ConvoSwiper
                    dispatch={this.props.dispatch}
                    currentUserId={appState.currentUser.id}
                    networkId={appState.currentNetwork.id}
                    state={convoSwiperState}
                    router={this.router}
                />

                {this.state.renderMyConvos ?
                    <MyConvos
                        dispatch={this.props.dispatch}
                        currentUserId={appState.currentUser.id}
                        networkId={appState.currentNetwork.id}
                        state={myConvosState}
                        router={this.router}
                    /> : null }
            </Swiper>
        );
    }
}

function mapStateToProps(state) {
    return {
        appState: state.app,
        convoSwiperState: state.convoSwiper,
        myConvosState: state.myConvos
    };
}

export default connect(mapStateToProps)(Root);