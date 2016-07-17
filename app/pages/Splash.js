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
} from 'react-native';

const { width, height } = Dimensions.get('window');
const Main from './Main';

export default class Splash extends Component {
    constructor (props) {
        super(props);
        this.state = {
            cover: null,
            bounceValue: new Animated.Value(1),
        }
    }

    componentDidMount () {
        const { bounceValue } = this.state;
        const { navigator } = this.props;
        this.fetchData();
        bounceValue.setValue(1);
        Animated.timing(bounceValue, {
            toValue: 1.2,
            duration: 3000
        }).start();
        setTimeout(() => {
            InteractionManager.runAfterInteractions(() => {
				navigator.resetTo({
					component: Main,
					name: 'Main'
				});
			})
        }, 3500);
    }

    render () {
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
                    <Animated.Image
                        source={img}
                        style={[styles.cover, transfrom: [{scale: bounceValue}]]}
                    />
                    <Text style={styles.text}>
                        {text}
                    </Text>
                    <Image style={styles.logo} source={require('../images/logo.png')} />
                </View>)
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
})
