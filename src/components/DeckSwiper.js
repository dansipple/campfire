import React, { Component } from 'react';
import clamp from 'clamp';
import {Animated, PanResponder, View} from 'react-native';

var SWIPE_THRESHOLD = 120;

export default class DeckSwiper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY(),
            pan2: new Animated.ValueXY(),
            enter: new Animated.Value(0.95),
            card1Top: true,
            card2Top: false,
            fadeAnim: new Animated.Value(0.8),
            topCard: this.props.topCard,
            bottomCard: this.props.bottomCard
        }
    }

    getInitialStyle() {
        return {
            topCard: {
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.topCard !== this.props.topCard) {
            setTimeout( () => {
                this.setState({
                    topCard: nextProps.topCard
                });
                setTimeout( () => {
                    this.setState({
                        bottomCard: nextProps.bottomCard
                    });
                }, 350);
            }, 50);
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
                this.state.pan.setValue({x: 0, y: 0});
            },

            onPanResponderMove: (e, gestureState) => {
                let val = Math.abs((gestureState.dx*.0013));
                let opa = Math.abs((gestureState.dx*.0022));
                if (val>0.05) {
                    val = 0.05;
                }
                Animated.timing(
                    this.state.fadeAnim,
                    {toValue: 0.8+val}
                ).start();
                Animated.spring(
                    this.state.enter,
                    { toValue: 0.95+val, friction: 7 }
                ).start();
                Animated.event([
                    null, {dx: this.state.pan.x},
                ])(e, gestureState)
            },

            onPanResponderRelease: (e, {vx, vy}) => {
                var velocity;

                if (vx >= 0) {
                    velocity = clamp(vx, 4.5, 10);
                } else if (vx < 0) {
                    velocity = clamp(vx * -1, 4.5, 10) * -1;
                }

                if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {

                    if (velocity>0) {
                        (this.props.onSwipeRight) ? this.props.onSwipeRight() : undefined;
                    } else {
                        (this.props.onSwipeLeft) ? this.props.onSwipeLeft() : undefined;
                    }

                    Animated.decay(this.state.pan, {
                        velocity: {x: velocity, y: vy},
                        deceleration: 0.98
                    }).start(this._resetState.bind(this))
                } else {
                    Animated.spring(this.state.pan, {
                        toValue: {x: 0, y: 0},
                        friction: 4
                    }).start()
                }
            }
        })
    }

    componentWillUnmount() {
        this._panResponder = undefined;
    }

    _resetState() {
        this.state.pan.setValue({x: 0, y: 0});
        this.state.enter.setValue(0.8);
        this.state.fadeAnim.setValue(0.8);
        this.setState({
            card1Top: !this.state.card1Top,
            card2Top: !this.state.card2Top
        });

    }

    getCardStyles() {

        let { pan, pan2, enter } = this.state;

        let [translateX, translateY] = [pan.x, pan.y];
        // let [translateX, translateY] = [pan2.x, pan2.y];

        let rotate = pan.x.interpolate({inputRange: [-700, 0, 700], outputRange: ['15deg', '0deg', '-15deg']});

        let opacity = pan.x.interpolate({inputRange: [-320, 0, 320], outputRange: [0.9, 1, 0.9]});
        let scale = enter;

        let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}], opacity};
        let animatedCardStyles2 = {transform: [{scale}]};

        return [animatedCardStyles, animatedCardStyles2];
    }

    getOverlayStyle(type) {
        let { pan } = this.state;
        let cardOverlay = {};

        if(type === 'yes') {
            let opacity = pan.x.interpolate({inputRange: [-320, 0, 320], outputRange: [0, 0, 0.4]});
            cardOverlay = {opacity, backgroundColor: 'rgb(44, 202, 67)', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0};
        }
        else {
            let opacity = pan.x.interpolate({inputRange: [-320, 0, 320], outputRange: [0.4, 0, 0]});
            cardOverlay = {opacity, backgroundColor: 'rgb(234, 48, 87)', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0};
        }

        return cardOverlay;
    }

    render() {


        return(
            <View style={{flex: 1, position: 'relative', flexDirection: 'column'}}>{(this.state.topCard)===undefined ? (<View />) :
                (<View>
                        <Animated.View style={[this.getCardStyles()[1],{/*opacity: this.state.fadeAnim*/}]} {...this._panResponder.panHandlers}>
                            {this.props.renderItem(this.state.bottomCard)}
                        </Animated.View>
                        <Animated.View style={[ this.getCardStyles()[0], this.getInitialStyle().topCard] } {...this._panResponder.panHandlers} >
                            {this.props.renderItem(this.state.topCard)}
                            <Animated.View style={this.getOverlayStyle('no')} />
                            <Animated.View style={this.getOverlayStyle('yes')} />
                        </Animated.View>
                    </View>
                )
            }
            </View>
        );
    }

}