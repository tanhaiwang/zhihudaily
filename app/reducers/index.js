'use strict';
import { combineReducers } from 'redux';
import {
    FETCH_THEMES_LIST,
    RECEIVE_THEMES_LIST,
    FETCH_STORIES_LIST,
    RECEIVE_STORIES_LIST,
    OPEN_DRAWER,
    CLOSE_DRAWER,
    FETCH_STORY_DETAIL,
    RECEIVE_STORY_DETAIL
} from '../constant';



function stories (state = { loading: false, isRefreshing: false, list: {}}, action) {
    switch (action.type) {
        case FETCH_STORIES_LIST:
            return Object.assign({}, state, {
                loading: action.loading,
                isRefreshing: action.isRefreshing,
            });
        case RECEIVE_STORIES_LIST:
            let oldList = state.list[action.id] || [];
            let exists = oldList.findIndex(item => {
                return item.date == action.list.date;
            })
            if (exists !== -1) {
                return state;
            }
            let newList = [...oldList, action.list].sort((a, b) => parseInt(b.date) - parseInt(a.date));

            const list = Object.assign(state.list, {
                [action.id]: newList
            });

            return Object.assign({}, state, {
                list,
                loading: false,
                isRefreshing: false,
            });
            
        default:
            return state;
    }
}

function themes (state = { loading: true, list: [] }, action) {
    const { type } = action;
    switch (type) {
        case FETCH_THEMES_LIST:
            return Object.assign({}, state, {
                loading: true
            });
        case RECEIVE_THEMES_LIST:
            return Object.assign({}, state, {
                loading: false,
                list: action.list
            });
        default:
            return state;
    }
}

function drawer (state = false, action) {
    const { type } = action;
    switch (type) {
        case OPEN_DRAWER:
            return true;
        case CLOSE_DRAWER:
            return false;
        default:
            return state;
    }
}

function detail (state = {}, action) {
    const { type } = action;
    switch (type) {
        case FETCH_STORY_DETAIL:
            return Object.assign({}, state, {
                [action.id]: {
                    loading: true,
                }
            });
        case RECEIVE_STORY_DETAIL:
            return Object.assign({}, state, {
                [action.id]: {
                    loading: false,
                    detail: action.detail
                }
            });
        default:
            return state;
    }
}

export default combineReducers({
    themes,
    stories,
    drawer,
    detail,
});
