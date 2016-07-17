'use strict';
import { combineReducers } from 'redux';

function storiesList (state = [], action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default combineReducers({
    storiesList
});
