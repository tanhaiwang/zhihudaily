'use strict';

import React, { Component, PropTypes } from 'react';
import {
    Image,
    PixelRatio,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    View,
} from 'react-native';

export default class Story extends Component {
    updateReadState () {
        this.refs['title'].setNativeProps({style: {color: '#777777'}});
        this.props.onSelect && this.props.onSelect();
    }
    render () {
        let TouchableElement = TouchableHighlight;
        if (Platform.OS == 'android') {
            TouchableElement = TouchableNativeFeedback
        }
        const { story, onHighlight } = this.props;
        let image = null;
        if (story.images && story.images[0]) {
            image = (<Image
                        source={{uri: story.images[0]}}
                        style={styles.cellImages}
                    />)
        }

        return (<View {...this.props}>
                    <TouchablueElement
                        onPress={this.updateReadState}
                        onShowUnderlay={onHighlight}
                        onHideUnderlay={onHighlight}
                    >
                        <View style={styles.row}>
                            <Text
                                ref="title"
                                style={story.read ? styles.storyTitleRead : styles.storyTitle}
                                numberOfLines={3}
                            >
                                {story.title}
                            </Text>
                            {image}
                        </View>
                    </TouchablueElement>
                </View>);
    }
}

var styles = StyleSheet.create({
  storyTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  storyTitleRead: {
    flex: 1,
    fontSize: 16,
    color: '#777777',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 5,
    borderColor: '#dddddd',
    borderStyle: null,
    borderWidth: 0.5,
    borderRadius: 2,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 60,
    marginLeft: 10,
    width: 80,
  },
});
