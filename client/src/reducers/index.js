import {combineReducers} from 'redux';
import authReducer from "./authReducer";
import {reducer as formReducer} from "redux-form";
import booksReducer from "./booksReducer";

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    books: booksReducer
})