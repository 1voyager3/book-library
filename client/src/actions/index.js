import mediaLib from "../apis/mediaLib";
import {
    SIGN_IN, SIGN_OUT,
    ADD_BOOK, FETCH_BOOKS, FETCH_BOOK, DELETE_BOOK, EDIT_BOOK
} from "./types";
import history from "../history";


// gapi.auth2.getAuthInstance().currentUser.get().getId()
// this argument passed to know google user ID in order to be able to get info
// of created list of media, to create, edit and delete the media
// reference in onAuthChange method in GoogleOAuth component
export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

// action creator through redux-thunk
// it has to be returned dispatch function
export const addBook = (formValues) => {
    // getState is function of state define in auth: authReducer in reducers/index.js
    // when we return a function (below) from an action creator, the function
    // gets called automatically by redux-thunk with two arguments: dispatch and getState
    // getState function allows us to reach into redux store and pull out some piece of information
    return async (dispatch, getState) => {

        // getState() is going to return the entire state object and
        // the we can get access through auth property and get userId
        const { userId } = getState().auth;

        console.log(userId)

        // post request:
        // first argument is the key of db.json,
        // second argument is the object of titles and descriptions and so on
        // here we are posting data to the db.json
        // { ...formValues, userId} combines to objects into a new one
        const response = await mediaLib.post('/books', { ...formValues, userId});

        // it used the dispatch function to get list of data from db.json
        // here we are dispatching to reducer and getting data from db.json
        // and respectively updating the state
        dispatch({
            type: ADD_BOOK,
            payload: response.data
        });

        // here we trigger a Programmatic Navigation when User clicks on Submit form in AddBook component
        // then to get User back to the root route (home page) in order to API responds with error,
        // book was not added and User do not know
        // API has to respond with success or error response
        history.push('/');
    }
};

export const fetchBooks = () => async dispatch => {
    const response = await mediaLib.get('/books');

    dispatch({
        type: FETCH_BOOKS,
        payload: response.data
    })
}

export const fetchBook = (id) => async dispatch => {
    const response = await mediaLib.get(`/books/${id}`);

    dispatch({
        type: FETCH_BOOK,
        payload: response.data
    })
}

export const editBook = (id, formValues) => async dispatch => {
    // "PUT" request updates all properties of a record
    // "PATCH" request updates some properties of a record
    // we are using the "patch" request instead of "put" to update only
    // editing properties and to avoid overwriting all properties without "userId"
    const response = await mediaLib.patch(`/books/${id}`, formValues);

    dispatch({
        type: EDIT_BOOK,
        payload: response.data
    });
    history.push('/');
}

export const deleteBook = (id) => async dispatch => {
    await mediaLib.delete(`/books/${id}`);

    dispatch({
        type: DELETE_BOOK,
        payload: id
    });
    history.push('/');
}