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
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import {
    fetchStories,
    openDrawer,
    closeDrawer,
} from '../actions';
import {
    WEEKDAY
} from '../constant';

import Story from '../components/Story';
import ThemeList from './Themes';
import ViewPager from 'react-native-viewpager';
import * as Util from '../common/util';
import Loading from '../components/Loading';
import StoryPage from '../pages/Story';

export default class StoriesList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            themeId: props.theme ? props.theme.id : 'latest',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }),
            headerDataSource: new ViewPager.DataSource({
                pageHasChanged: (p1, p2) => p1 !== p2
            }),
        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this.selectStory = this.selectStory.bind(this);
        this._renderPage = this._renderPage.bind(this);
        this.renderSectionHeader = this.renderSectionHeader.bind(this);
        this.selectStory = this.selectStory.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
    }

    componentDidMount () {
       
    }

    componentWillUnmount () {
        // save data in to db
    }

    componentWillReceiveProps (nextProps) {
        const { theme } = nextProps;

    }
    _renderPage (story, pageID) {
        return (<TouchableOpacity style={{flex: 1}} onPress={() => this.selectStory(story)} >
                    <Image source={{uri: story.image}} style={styles.headerItem}>
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
        const { theme, stories, openDrawer } = this.props;
        const { themeId } = this.state;
        const currentList = stories.list[themeId];

        if (theme) {
            const themeId = theme ? theme.id : 0;
            const topData = stories.list[themeId];
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
                      dataSource={this.state.headerDataSource.cloneWithPages(currentList[0].top_stories)}
                      style={styles.listHeader}
                      renderPage={this._renderPage}
                      isLoop={true}
                      autoPlay={true} 
                    />
                    
                    <View style={styles.menuIcon}>
                        <TouchableOpacity onPress={openDrawer}>
                            <Image style={{width: 36, height: 36}} source={require('../images/ic_menu_white.png')} />
                        </TouchableOpacity>
                    </View>
                    
                 </View>
            );
        }
    }

    _renderFooter () {
        const { stories } = this.props;
        const { isRefreshing } = stories;
        if (isRefreshing) {
            return (<View style={{height: 30, marginTop: 10}}>
                        <Loading size="small" loadingText="正在加载数据..." />
                      </View>)
        } else {
            return (<View />)
        }
    }

    getSectionTitle (str) {
        const date = Util.parseDateFromYYYYMMdd(str);
        if (date.toDateString() == new Date().toDateString()) {
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
            component: StoryPage,
        });
    }

    renderRow (story, sectionID, rowID, highlightRowFunc) {
        return (<Story
                    key={story.id}
                    onSelect={() => this.selectStory(story)}
                    onHighlight={() => highlightRowFunc(sectionID, rowID)}
                    onUnhighlight={() => highlightRowFunc(null, null)}
                    story={story}
                />);
    }

    onEndReached () {
        const { theme, fetchStories, stories } = this.props;
        let currentList;
        if (theme == null) {
            currentList = stories.list['latest'];
            fetchStories('latest', true, currentList[currentList.length - 1].date);
        }
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
        const { stories, theme } = this.props;
        const { themeId } = this.state;
        const currentList = stories.list[themeId] || [];
        let newDateBold   = {};
        let newSectionIDs = [];
        let listData = currentList.map(item => {
               return {
                    date: item.date, 
                    stories: item.stories
                };
            });
        listData.map(item => {
            newSectionIDs.push(item.date);
            newDateBold[item.date] = item.stories;
        });
        console.log('currentList', currentList);
        const content = !currentList.length ?
            (<Loading />) :
            (<ListView
              ref="listview"
              style={styles.listview}
              dataSource={this.state.dataSource.cloneWithRowsAndSections(newDateBold, newSectionIDs, null)}
              renderRow={this.renderRow}
              onEndReached={this.onEndReached}
              renderSectionHeader={this.renderSectionHeader}
              automaticallyAdjustContentInsets={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps={true}
              showsVerticalScrollIndicator={false}
              renderHeader={this._renderHeader}
              renderFooter={this._renderFooter}
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
  },
  menuIcon: {
    position: 'absolute',
    top: 20,
    left: 10
  },
});

const mapStateToProps = (state, ownProps) => {
    const { stories, drawer } = state;
    return {
        stories,
        drawer
    }
}

const mapDispatchToProps = (dispath, ownProps) => {
	return {
        fetchStories: (id, isRreshing, date) => {
            dispath(fetchStories(id, isRreshing, date));
        },
        openDrawer: () => {
            dispath(openDrawer());
        },
        closeDrawer: () => {
            dispath(closeDrawer());
        }
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesList);
