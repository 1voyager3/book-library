import _ from 'lodash';
import {
    ADD_BOOK, FETCH_BOOKS, FETCH_BOOK, DELETE_BOOK, EDIT_BOOK
} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_BOOKS:
            // _.mapKeys -  lodash function which transform an array to an object using second argument as a key of new object
            // {} - it creates a new object
            // first property ...state - it takes all current records inside our state object
            // ..._.mapKeys(action.payload, 'id') - is calls mapKeys function
            // action.payload - it is list of streams that we just got back from our api-server
            // then it creates a new object using mapKey function that is going to be "id"
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_BOOK:
            return { ...state, [action.payload.id]: action.payload };
        case ADD_BOOK:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_BOOK:
            return { ...state, [action.payload.id]: action.payload}
        case DELETE_BOOK:
            return _.omit(state, action.payload)
        default:
            return state;
    }
}