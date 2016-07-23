'use strict';

import React, { Component, PropTypes } from 'react';
import {
    PixelRatio,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    View,
    Image,
    Animated,
    WebView,
} from 'react-native';
import Toolbar from '../components/Toolbar';
import Loading from '../components/Loading';
import { connect } from 'react-redux';

import {
    fetchStory
} from '../actions';

const HEADER_SIZE = 200;

export default class Story extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount () {
        const { story } = this.props.route
        const { detail, fetchStory } = this.props;
        if (!detail[story.id]) {
            fetchStory(story.id);
        }
    }


    render () {
        const { detail }   = this.props;
        const { story } = this.props.route
        let storyDetail = detail[story.id];
       
        if (!storyDetail || storyDetail.loading) {
            return (<View style={styles.container}>
                        <Toolbar />
                        <Loading />
                    </View>)
        } else {
            storyDetail = storyDetail.detail;
             const HTML = `<!DOCTYPE html>
                                <html>
                                    <head>
                                        <link rel="stylesheet" type="text/css" href="${storyDetail.css[0]}/>"
                                    </head>
                                    <body>
                                        ${storyDetail.body}
                                    </body>
                                </html>`;

            return (<View style={styles.container}>
                        { //<Animated.View style={styles.header}>
                            <Image
                                ref="image"
                                source={{uri: storyDetail.image}}
                                style={styles.headerImage}
                            >
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>
                                        {storyDetail.title}
                                    </Text>
                                </View>
                            </Image>
                        //</Animated.View>
                        }
                        <WebView 
                            style={styles.content}
                            source={{html: HTML}}
                        />
                    </View>)
        }
    }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#00a2ed',
    height: 56,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  header: {
    height: HEADER_SIZE,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 56,
  },
  headerImage: {
    height: HEADER_SIZE,
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top:56,
  },
});

const mapStateToProps = (state, ownProps) => {
    const { detail } = state;
    return {
        detail
    }
}

const mapDispatchToProps = (dispath, ownProps) => {
    return {
        fetchStory: (id) => {
            dispath(fetchStory(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Story);
