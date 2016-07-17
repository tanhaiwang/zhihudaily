'use strict';

import React, { Component, PropTypes } from 'react';
import {
    AsyncStorage,
    Platform,
    ListView,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
    TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import {
    fetchThemes
} from '../actions'

export class Themes extends Component {
    constructor (props) {
        super(props);
        this.state = {
            dataSource: new ListView.dataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
    }

    componendDidMount () {
        this.props.fetchThemes();
    }

    renderHeader () {
        let TouchablueElement = TouchableHighlight;
        if (Platform.OS == 'android') {
            TouchablueElement = TouchableNativeFeedback;
        }
        return (<View style={styles.header}>
                    <View style={styles.userInfo}>
                        <TouchablueElement>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 16}}>
                                <Image
                                    source={require('../images/comment_avatar.png')}
                                    style={{width: 40, height: 40, marginLeft: 8, marginRight: 8}}
                                />
                                <Text style={styles.menuText}>
                                    请登录
                                </Text>
                            </View>
                        </TouchablueElement>
                        <View style={styles.row}>
                            <TouchablueElement>
                                <View style={styles.menuContainer}>
                                <Image
                                    source={require('../images/ic_favorites_white.png')}
                                    style={{width: 30, height: 30}}
                                />
                                <Text style={styles.menuText}>
                                    我的收藏
                                </Text>
                                </View>
                            </TouchablueElement>
                            <TouchableElement>
                                <View style={styles.menuContainer}>
                                    <Image
                                        source={require('../images/ic_download_white.png')}
                                        style={{width: 30, height: 30}}
                                    />
                                    <Text style={styles.menuText}>
                                        离线下载
                                    </Text>
                              </View>
                            </TouchableElement>
                        </View>
                    </View>
                    <TouchableElement onPress={() => this.props.onSelectItem(null)}>
                        <View style={styles.themeItem}>
                            <Image
                                source={require('../images/home.png')}
                                style={{width: 30, height: 30, marginLeft: 10}}
                            />
                            <Text style={styles.homeTheme}>
                                首页
                            </Text>
                        </View>
                    </TouchableElement>
                </View>);
    }

    renderRow (theme, sectionId, rowId, highlightRowFunc) {
        const { onSelectItem } = this.props;
        let TouchableElement = TouchableHighlight;
        const icon = theme.subscribed ? require('../images/ic_menu_arrow.png') : require('../images/ic_menu_follow.png');
        return (<View>
                    <TouchableElement
                        onPress={() => onSelectItem(theme)}
                        onHideUnderlay={highlightRowFunc}
                        onShowUnderlay={highlightRowFunc}
                    >
                        <View style={styles.themeItem}>
                            <Text style={styles.themeName}>
                                {theme.name}
                            </Text>
                            <Image
                                source={icon}
                                style={style.themeIndicate}
                            />
                        </View>
                    </TouchableElement>
                </View>);
    }

    render () {
        const { themes } = this.props;
        const { loading, list } = themes;
        if (loading) {
            return (<View style={styles.container}>
                        <Text>loading...</Text>
                    </View>)
        } else {
            return (<View style={styles.container} {...this.props}>
                        <ListView
                            ref="themes"
                            dataSource={this.state.dataSource.cloneWithRows(list)}
                            renderRow={this.renderRow}
                            automaticallyAdjustContentInsets={false}
                            keyboardDismissMode="on-drag"
                            keyboardShouldPersistTaps={true}
                            showsVerticalScrollIndicator={false}
                            renderHeader={this.renderHeader}
                            style={{flex:1, backgroundColor: 'white'}}
                        />
                    </View>);
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const { themes } = state;
    return {
        themes
    }
}

const mapDispatchToProps = (dispath, ownProps) => {
	return {
        fetchThemes: () => {
            dispath(fetchThemes())
        }
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Themes);
