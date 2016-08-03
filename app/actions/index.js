'use strict';
import {
    API_THEME_URL,
    API_THEMES_URL,
    API_LATEST_URL,
    API_HOME_URL,
    API_STORY_URL,
    KEY_THEME_TOPDATA,
    FETCH_STORIES_LIST,
    RECEIVE_STORIES_LIST,
    FETCH_THEMES_LIST,
    RECEIVE_THEMES_LIST,
    OPEN_DRAWER,
    CLOSE_DRAWER,
    FETCH_STORY_DETAIL,
    RECEIVE_STORY_DETAIL,
    RECEIVE_THEME_STORIES_LIST,
} from '../constant';

export function fetchStories (id, isRefreshing, date) {
    let url = `${API_THEME_URL}/${id}`;
    if (id == 'latest') {
        url = API_LATEST_URL;
        if (date) {
            url = `${API_HOME_URL}/${date}`
        }
    } else {
        if (date) {
            url = `${url}/before/${date}`
        }
    }
    return dispath => {
        dispath(fetchStoriesList(isRefreshing, false, id));

        return fetch(url)
            .then(response => response.json())
            .then(list => {
                if (id == 'latest') {
                    dispath(receiveStoriesList(list, id))
                } else {
                    dispath(receiveThemeStoriesList(list, id))
                }
                
            })
    }
}

export function fetchStoriesList (isRefreshing, loading, id) {
    return {
        type: FETCH_STORIES_LIST,
        isRefreshing,
        loading,
        id
    }
}

export function receiveThemeStoriesList (list, id) {
    return {
        type: RECEIVE_THEME_STORIES_LIST,
        id,
        list,
        lastId: list.stories[list.stories.length - 1].id
    }
}

export function receiveStoriesList (list, id) {
    return {
        type: RECEIVE_STORIES_LIST,
        id,
        list
    }
}

export function fetchThemes () {

    return dispatch => {
        dispatch(fetchThemesList());
        return fetch(`${API_THEMES_URL}`)
            .then(response => response.json())
            .then(list => {
                dispatch(receiveThemesList(list.others))
            })
    }
}

export function fetchThemesList () {
    return {
        type: FETCH_THEMES_LIST,
        loading: true
    }
}

export function receiveThemesList (list) {
    return {
        type: RECEIVE_THEMES_LIST,
        loading: true,
        list,
    }
}

export function openDrawer () {
    return {
        type: OPEN_DRAWER
    }
}

export function closeDrawer () {
    return {
        type: CLOSE_DRAWER
    }
}

export function fetchStory (id) {
    return dispatch => {
        dispatch(fetchStoryDetail(id));
        return fetch(`${API_STORY_URL}/${id}`)
            .then(response => response.json())
            .then(detail => {
                dispatch(receiveStoryDetail(id, detail));
            })
    }
}

export function fetchStoryDetail (id) {
    return {
        type: FETCH_STORY_DETAIL,
        id,
        loading: true
    }
}

export function receiveStoryDetail (id, detail) {
    return {
        type: RECEIVE_STORY_DETAIL,
        id,
        loading: false,
        detail
    }
}
