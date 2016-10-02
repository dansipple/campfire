
import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import ConvoSwiper from './../components/convoSwiper';
import MyConvos from './../components/myConvos';

export default class Root extends Component {
    static navigatorStyle = {
        navBarHidden: true,
        drawUnderNavBar: true
    };

    constructor(props) {
        super(props);
        this.state = {
            renderMyConvos: false
        };
        this.router = this.router.bind(this);
    }
    

    router(route, data) {
        switch(route){
            case 'messages':
                this.props.navigator.push({
                    title: 'Messages',
                    //titleImage: require('../../img/chat.png'),
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
                this.setState({
                   renderMyConvos: true
                }, () => {
                    this.swiper.scrollBy(1);
                });
                return;
            case 'editConvo':
                this.props.navigator.showModal({
                    title: 'Edit Convo',
                    screen: 'NewConvo'
                });
                return;
            case 'home':
                this.swiper.scrollBy(-1);
                return;
        }
    }


    render() {
        return (
            <Swiper
                ref={component => this.swiper = component}
                horizontal={false}
                loop={false}
                showsPagination={false}
                scrollEnabled={false}
                scrollsToTop={true}
                loadMinimal={true}
                index={0}>

                <ConvoSwiper router={this.router} />
                {this.state.renderMyConvos ? <MyConvos router={this.router} /> : null }
            </Swiper>
        );
    }
}
