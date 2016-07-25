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
	static defaultProps = {
	  	size: 'large',
	  	loadingText: '加载中...'
	};
	render () {
		return (
			 <View style={ styles.loading }>
	          	<ActivityIndicator size={this.props.size}/>
	          	<Text style={ styles.loadingText }>{this.props.loadingText}</Text>
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
