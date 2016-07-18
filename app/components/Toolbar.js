'use strict';

import React, { Component, PropTypes } from 'react';
import {
    Platform,
    PixelRatio,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableNativeFeedback,
    TouchableHighlight,
    ToastAndroid,
} from 'react-native';

import SwitchAndroid from 'SwitchAndroid';
import ToolbarAndroid from 'ToolbarAndroid';
const statusBarSize = Platform.OS == 'ios' ? 10 : 0;

export default class Toolbar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoading: true,
            extra: null,
        }
    }

    componendDidMount () {

    }

    _onPressBackButton () {
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    _onPressShareButton () {
        // Todo:
        ToastAndroid.show('分享', ToastAndroid.SHORT);
    }

    _onPressCollection () {
        ToastAndroid.show('收藏', ToastAndroid.SHORT);
    }

    _onPressCommentButton () {
        ToastAndroid.show('评论', ToastAndroid.SHORT);
    }

    _onPressPriseButton () {
        ToastAndroid.show('赞', ToastAndroid.SHORT);
    }

    render () {
        let TouchableElement = TouchableHighlight;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableNativeFeedback;
        }

        return (<View {...this.props}>
                    <View style={styles.container}>
                        <TouchableElement onPress={this._onPressBackButton}>
                          <View style={styles.actionItem}>
                            <Image
                              style={styles.backIcon}
                              source={require('image!ic_back_white')}
                              resizeMode='contain' />
                          </View>
                        </TouchableElement>
                        <View style={{flex: 1}} />
                        <TouchableElement onPress={this._onPressShareButton}>
                          <View style={styles.actionItem}>
                            <Image
                              style={styles.actionIcon}
                              source={require('image!ic_share_white')}
                              resizeMode='contain' />
                          </View>
                        </TouchableElement>
                        <TouchableElement onPress={this._onPressCollectButton}>
                          <View style={styles.actionItem}>
                            <Image
                              style={styles.actionIcon}
                              source={require('image!ic_collect_white')}
                              resizeMode='contain' />
                          </View>
                        </TouchableElement>
                        <TouchableElement onPress={this._onPressCommentButton}>
                          <View style={styles.actionItem}>
                            <Image
                              style={styles.actionIconWithCount}
                              source={require('image!ic_comment_white')}
                              resizeMode='contain' />
                            <Text style={styles.count}>
                              {(this.state.isLoading || !this.state.extra) ? '...' : this.state.extra.comments}
                            </Text>
                          </View>
                        </TouchableElement>
                        <TouchableElement onPress={this._onPressPraiseButton}>
                          <View style={styles.actionItem}>
                            <Image
                              style={styles.actionIconWithCount}
                              source={require('image!ic_praise_white')}
                              resizeMode='contain' />
                            <Text style={styles.count}>
                              {(this.state.isLoading || !this.state.extra) ? '...' : this.state.extra.popularity}
                            </Text>
                          </View>
                        </TouchableElement>
                    </View>
                </View>)
    }
}

const styles = StyleSheet.create({
  actionsContainer: {
    height: 56,
    paddingTop: statusBarSize,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 32,
    height: 32,
    marginLeft: 8,
    marginRight: 8,
  },
  actionItem: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  actionIcon: {
    width: 32,
    height: 32,
  },
  actionIconWithCount: {
    width: 32,
    height: 32,
    marginLeft: 5,
  },
  count: {
    fontSize: 16,
    color: 'white',
    marginRight: 5,
  },
});
