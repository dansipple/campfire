
import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions, Text, View } from 'react-native';

export default class Onboarding extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stage: 0,
            show: true
        };
        this.nextStage = this.nextStage.bind(this);
        this.endOnboarding = this.endOnboarding.bind(this);

    }

    nextStage() {
        this.setState({
            stage: this.state.stage + 1
        })
    }

    endOnboarding() {
        this.setState({
            show: false
        });
        this.props.onComplete();
    }

    render() {
        if(this.state.show) {

            if(this.state.stage === 0) {
                return(
                    <View style={{position: 'absolute', top:0, right:0, bottom:0, left:0, padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(238,238,238,0.9)'}}>
                        <View
                            style={{backgroundColor: '#fff', padding: 20, paddingTop: 30, paddingBottom: 20, borderRadius: 8, borderWidth:1, borderColor: '#ddd'}}>
                            <Text style={{textAlign: 'center', color: '#3498db', fontSize: 22, marginBottom: 10}}>Welcome
                                to Convos!</Text>
                            <Text style={styles.paragraphText}>Finding good conversations around you is easy with
                                Convos, all you need to do is:</Text>
                            <Text style={styles.paragraphText}>1. Post convos that geniunly interest you</Text>
                            <Text style={styles.paragraphText}>2. Explore the convos of people around you</Text>
                            <Text style={styles.paragraphText}>3. Meet up and converse</Text>
                            <TouchableOpacity onPress={this.nextStage}>
                                <Text style={{marginTop: 20, textAlign: 'center', color: '#666', fontSize: 22}}>Got
                                    it!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            } else if(this.state.stage === 1 ) {
                return (
                    <View style={{position: 'absolute', top:0, right:0, bottom:0, left:0, padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(238,238,238,0.9)'}}>
                        <View
                            style={{backgroundColor: '#fff', padding: 20, paddingTop: 30, paddingBottom: 20, borderRadius: 8, borderWidth:1, borderColor: '#ddd'}}>
                            <Text style={{textAlign: 'center', color: '#3498db', fontSize: 22, marginBottom: 10}}>Creating
                                Convos</Text>
                            <Text style={styles.paragraphText}>You can create your own convo by clicking on the pencil
                                icon in the top right corner of the screen.</Text>
                            <Text style={styles.paragraphText}>You should either:</Text>
                            <Text style={styles.paragraphText}>1. Share what you're interested in discussing.</Text>
                            <Text style={styles.paragraphText}>2. Share what you can be most helpful with.</Text>
                            <TouchableOpacity onPress={this.nextStage}>
                                <Text style={{marginTop: 20, textAlign: 'center', color: '#666', fontSize: 22}}>Got
                                    it!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
            else if(this.state.stage === 2) {
                return (
                    <View style={{position: 'absolute', top:0, right:0, bottom:0, left:0, padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(238,238,238,0.1)'}}>
                        <View
                            style={{backgroundColor: '#fff', padding: 20, paddingTop: 30, paddingBottom: 20, borderRadius: 8, borderWidth:1, borderColor: '#ddd'}}>
                            <Text style={{textAlign: 'center', color: '#3498db', fontSize: 22, marginBottom: 10}}>Swiping
                                through convos</Text>
                            <Text style={styles.paragraphText}>This is a stack of what others are interested in
                                discussing.</Text>
                            <Text style={styles.paragraphText}>Swiping LEFT means you DON'T want to have the
                                convo</Text>
                            <Text style={styles.paragraphText}>Swiping RIGHT means you DO want to have the convo</Text>
                            <TouchableOpacity onPress={this.endOnboarding}>
                                <Text style={{marginTop: 20, textAlign: 'center', color: '#666', fontSize: 22}}>Got
                                    it!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    paragraphText: {
        color: '#666',
        fontSize: 15,
        lineHeight: 20,
        marginBottom: 5
    }
});

