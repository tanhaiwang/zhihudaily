'use strict';

import React, { Component, extends } from 'react';
import {
    AsyncStorage,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Drawer from 'react-native-drawer';
import StoriesList from '../containers/StoriesList';
import Theme from '../containers/Drawer';

export default class MainIos extends Component {
    constructor (props) {
        super(props);
        this.state = {
            theme: 'dark'
        };
    }

    onSelectItem (theme) {
        this.refs['drawer'].close();
        this.setState({theme: theme});
    }

    render () {
        const Theme = <Theme onSelectItem={this.onSelectItem} />;
        return (<Drawer
                    ref="drawer"
                    openDrawerOffset={100}
                    panCloseMask={1}
                    content={<View />}
                >
                    <StoriesList theme={this.state.theme} navigator={this.props.navigator} />
                </Drawer>);
    }
}
