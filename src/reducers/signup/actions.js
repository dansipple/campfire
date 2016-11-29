import * as types from './actionTypes';

export function updateProperty(property) {
        return {type: types.UPDATE_PROPERTY, payload: property};
}

