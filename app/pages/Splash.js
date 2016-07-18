'use strict';

import React, { Component, PropTypes } from 'react';
import {
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Animated,
    InteractionManager,
    Platform,
    Easing,
} from 'react-native';
import { connect } from 'react-redux';
import {
    fetchThemes,
    fetchStories
} from '../actions'

const { width, height } = Dimensions.get('window');
import MainIos from './Main.ios';
import MainAndroid from './Main.android';

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1),
        };
    }

    componentDidMount() {
        this.state.bounceValue.setValue(1);     // Start large
        Animated.timing(this.state.bounceValue, {
           toValue: 1.25,                         // Animate to smaller size
           duration: 3000,                       // Bouncier spring
       }).start();                              // Start the animation

        const { fetchStories, fetchThemes } = this.props;
        fetchStories && fetchStories('latest', false);
        fetchThemes && fetchThemes();
        
       let Main;
       if (Platform.OS == 'android') {
           Main = MainAndroid
       } else {
           Main = MainIos;
       }
       setTimeout(() => {
           InteractionManager.runAfterInteractions(() => {
       		this.props.navigator.resetTo({
       			component: Main,
       			name: 'Main'
       		});
       	})
       }, 3500);

   }
    render() {
        let img, text;
        const { cover, bounceValue } = this.state;
        if (cover) {
            img  = {uri: cover.img}
            text = cover.text;
        } else {
            img  = require("../images/splash.png");
            text = '';
        }
        return (<View style={styles.container}>
                  <Animated.Image                         // Base: Image, Text, View
                    source={require("../images/splash.png")}
                    style={{
                      flex: 1,
                      width: width,
                      height: 1,
                      transform: [                        // `transform` is an ordered array
                        {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
                      ]
                    }}
                  />
                  <Text style={styles.text}>
                      {text}
                  </Text>
                  <Image style={styles.logo} source={require('../images/splash_logo.png')} />
                 </View>);
     }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    cover: {
        flex: 1,
        width: width,
        height: 1,
    },
    logo: {
        resizeMode: 'contain',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 30,
        height: 54,
        backgroundColor: 'transparent',
    },
    text: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 10,
        backgroundColor: 'transparent',
    }
});

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispath, ownProps) => {
    return {
        fetchStories: (id, isRreshing) => {
            dispath(fetchStories(id, isRreshing));
        },
        fetchThemes: () => {
            dispath(fetchThemes())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
