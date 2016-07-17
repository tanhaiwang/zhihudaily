'use strict';

import React, { Component, extends } from 'react';
import {
    AsyncStorage,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react';

import Drawer from 'react-native-drawer';
import StoriesList from '../containers/StoreList';

export default class MainIos extends Component {
    constructor (props) {
        super(props);
        this.state = {
            theme: null
        };
    }

    onSelectItem (theme) {
        this.refs['drawer'].close();
        this.setState({theme: theme});
    }

    render () {
        const Theme = <Theme onSelectItem={this.onSelectItem} />;
        return (<Drawer
                    ref="drawer",
                    openDrawerOffset={100}
                    panCloseMask={1}
                    content={Theme}
                    <StoriesList theme={theme} navigator={this.props.navigator}>
                />);
    }
}
