'use strict';
import { combineReducers } from 'redux';
import {
    FETCH_THEMES_LIST,
    RECEIVE_THEMES_LIST,
    FETCH_STORIES_LIST,
    RECEIVE_STORIES_LIST,
} from '../constant';

function stories (state = { loading: false, isRefreshing: false, list: {}}, action) {
    switch (action.type) {
        case FETCH_STORIES_LIST:
            return Object.assign({}, state, {
                loading: action.loading,
                isRefreshing: action.isRefreshing,
            });
        case RECEIVE_STORIES_LIST:
            const list = Object.assign(state.list, {
                [action.id]: action.list
            });
            return Object.assign({}, state, {
                list,
                loading: false
            });
        default:
            return state;
    }
}

function themes (state = { loading: true, list: [] }, action) {
    const { type } = action;
    switch (type) {
        case FETCH_THEMES_LIST:
            return Object.assign(state, {
                loading: true
            });
        case RECEIVE_THEMES_LIST:
            return Object.assign(state, {
                loading: false,
                list: action.list
            });
        default:
            return state;
    }
}

export default combineReducers({
    themes,
    stories
});
