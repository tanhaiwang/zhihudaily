'use strict';
import {
    API_THEME_URL,
    API_THEMES_URL,
    API_LATEST_URL,
    KEY_THEME_TOPDATA,
    FETCH_STORIES_LIST,
    RECEIVE_STORIES_LIST,
    FETCH_THEMES_LIST,
    RECEIVE_THEMES_LIST,
} from '../constant';

export function fetchStories (id, isRefreshing) {
    let url = `${API_THEME_URL}/${id}`;
    if (id == 'latest') {
        url = API_LATEST_URL;
    }

    return dispath => {
        dispath(fetchStoriesList(isRefreshing, false, id));
        return fetch(url)
            .then(response => response.json())
            .then(list => {
                dispath(receiveStoriesList(list, id))
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
            .then(response => reponse.json())
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
        loading: false,
        list,
    }
}
