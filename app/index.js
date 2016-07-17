'use strict';

import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store';
import Splash from './pages/Splash';

const store = configureStore();

export class App extends Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.renderScene = this.renderScene.bind(this);
    }

    renderScene (route, navigator) {
        let Component = route.component;
        this.navigator = navigator;
        return (
            <Component navigator={navigator} route={route}/>
        );
    }

    render () {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor="#ff0000"
                    barStyle="default"
                />
                <Navigator
                    ref="navigator"
                    style={{flex: 1}}
                    configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
                    renderScene={this.renderScene}
                    initialRoute={{
                        component: Splash,
                        name: 'Splash'
                    }}
                />
            </View>
        );
    }
}

export default class zhihuDaily extends Component {
    render () {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}
