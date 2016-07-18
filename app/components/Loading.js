'use strict';
import React, { Component, PropTypes } from 'react';
import {
	ActivityIndicator,
	Platform,
	Text,
	StyleSheet,
	View
} from 'react-native';

export default class LoadingView extends Component {
	render () {
		return (
			 <View style={ styles.loading }>
	          	<ActivityIndicator size='large'/>
	          	<Text style={ styles.loadingText }>加载中...</Text>
	        </View>
		);
	}
}

const styles = StyleSheet.create({
  	loading: {
	    flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center'
  	},
  	loadingText: {
    	marginTop: 10,
    	textAlign: 'center'
  	}
});
