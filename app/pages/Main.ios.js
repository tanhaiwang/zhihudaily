'use strict';

import React, { Component, extends } from 'react';
import {
    AsyncStorage,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import StoriesList from '../containers/StoriesList';
import Themes from '../containers/Themes';

import {
    closeDrawer,
} from '../actions'

export default class MainIos extends Component {
    constructor (props) {
        super(props);
        this.state = {
            theme: null
        };
        this.onSelectItem = this.onSelectItem.bind(this);
    }

    onSelectItem (theme) {
        this.refs['drawer'].close();
        this.setState({theme: theme});
    }

    componentDidMount () {
       /* setTimeout(() => {
            this.refs['drawer'].open();
        }, 1000)*/
    }

    render () {

        return (<Drawer
                    type="overlay"
                    ref="drawer"
                    tapToClose={true}
                    open={this.props.drawer}
                    openDrawerOffset={100}
                    panCloseMask={0.2}
                    closedDrawerOffset={-3}
                    onClose={this.props.closeDrawer}
                    content={<Themes onSelectItem={this.onSelectItem} />}
                >
                    <StoriesList theme={this.state.theme} navigator={this.props.navigator} />
                </Drawer>);
    }
}

const mapStateToProps = (state, ownProps) => {
    const { drawer } = state;
    return {
        drawer
    }
}

const mapDispatchToProps = (dispath, ownProps) => {
    return {
        closeDrawer: () => {
            dispath(closeDrawer());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainIos);
