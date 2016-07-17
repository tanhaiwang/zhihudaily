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
import Themes from '../containers/Themes';

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
        const Theme = <Themes onSelectItem={this.onSelectItem} />;
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
