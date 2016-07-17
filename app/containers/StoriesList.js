'use strict';
import React, { Component, PropTypes } from 'react';
import {
    AsyncStorage,
    Platform,
    Dimensions,
    ListView,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import StoryItem from './StoryItem';
import ThemeList from './Drawer';
import ViewPager from 'react-native-viewpager';
import StoryPage from '../pages/Story';

export default class StoriesList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoading: false,
            isLoadingTail: false,
            dataSource: new ListView.dataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            headerDataSource: new ViewPager.dataSource({
                pageHasChanged: (p1, p2) => p1 !== p2
            }),
        }
    }

    componendDidMount () {

    }

    componentWillUnmount () {

    }

    componentWillReceiveProps (nextProps) {

    }
    _renderPage (story, pageID) {
        return (<TouchableOpacity style={{flex: 1}} onPress={() => this.selectStory(story)} >
                    <Image source={{uri: story.image}} style={style.headerItem}>
                        <View style={styles.headerTitleContainer} >
                            <Text style={styles.headerTitle}
                                numberOfLines={2}>
                                {story.title}
                            </Text>
                        </View>
                    </Image>
                </TouchableOpacity>);
    }

    _renderHeader () {
        const { theme } = this.props;

        if (theme) {
            const themeId = theme ? theme.id : 0;
            const topData = dataCache.topDataForTheme[themeId];
            if (!topData) {
                return null;
            }
            let editorsAvator = [];
            if (topData.editors) {
                topData.editors.forEach((editor) => {
                    editorsAvator.push(<Image style={styles.editorAvatar} source={{uri: editor.avatar}} />);
                })
            }
            return (
                <View style={{flex: 1}}>
                    {this._renderPage({image: topData.background, title: topData.description}, 0)}
                    <View style={styles.editors}>
                        <Text style={styles.editorsLable}>主编:</Text>
                        {editorsAvator}
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1, height: 200}}>
                    <ViewPager
                      dataSource={this.state.headerDataSource}
                      style={styles.listHeader}
                      renderPage={this._renderPage}
                      isLoop={true}
                      autoPlay={true} />
                 </View>
            );
        }
    }

    getSectionTitle (str) {
        const date = Util.parseDateFromYYYYMMDD(str);
        if (data.toDateString() == new Date().toDateString)) {
            return '今日热闻'
        }
        let title = str.slice(4, 6) + '月' + str.slice(6, 8);
        title += ' ' + WEEKDAY[date.getDay()];
        return title;
    }

    renderSectionHeader (sectionData, sectionID) {
        const { theme } = this.props;
        if (theme) {
            return (<View></View>)
        } else {
            return (<Text style={styles.sectionHeader}>
                        {this.getSectionTitle(sectionID)}
                    </Text>)
        }
    }

    selectStory (story) {
        story.read = true;
        const { navigator } = this.props;
        navigator.push({
            title: story.title,
            name: 'story',
            story: story,
        });
    }

    renderRow (story, sectionID, rowID, highlightRowFunc) {
        return (<Story
                    key={story.id}
                    onSelect={() => this.selectStory(story)}
                    onHighlight={() => highlightRowFunc(sectionID, rowID)}
                    onUnhighlight={() => highlightRowFunc(null, null)}
                    story={story}
                />)
    }

    onEndReached () {
        console.log('onEndReached() ' + this.state.isLoadingTail);
        if (this.state.isLoadingTail) {
          return;
        }
        this.fetchStories(this.props.theme, false);
    }

    setTheme (theme) {
        this.drawer.closeDrawer();
        this.setState({
            theme: theme
        });
        this.fetchStories(theme, true);
    }

    onRefresh () {
        this.onSelectTheme(this.props.theme);
    }

    render () {
        const { isLoading, dataSource } = this.state;
        const content = dataSource.getRowCount() == 0 ?
            (<View style={styles.centerEmpty}><
                <Text>{isLoading ? '正在加载...' : '加载失败'}</Text>
            /View>) :
            (<ListView
              ref="listview"
              style={styles.listview}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              onEndReached={this.onEndReached}
              renderSectionHeader={this.renderSectionHeader}
              automaticallyAdjustContentInsets={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps={true}
              showsVerticalScrollIndicator={false}
              renderHeader={this._renderHeader}
            />);
        return content;
    }
}

const styles = StyleSheet.create({
  centerEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
  },
  listview: {
    backgroundColor: '#FAFAFA',
  },
  toolbar: {
    backgroundColor: '#00a2ed',
    height: 56,
  },
  rator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  sectionHeader: {
    fontSize: 14,
    color: '#888888',
    margin: 10,
    marginLeft: 16,
  },
  headerPager: {
    height: 200,
  },
  headerItem: {
    flex: 1,
    height: 200,
    flexDirection: 'row',
  },
  headerTitleContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    marginBottom: 10,
  },
  editors: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  editorsLable: {
    fontSize: 14,
    color: '#888888',
  },
  editorAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 4,
  }
});
