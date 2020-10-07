import React from "react";
import ReactDOM from 'react-dom';
import App from "./components/App";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducers from './reducers';
import reduxThunk from 'redux-thunk'


//installation for redux DevTools extension
import {applyMiddleware, compose} from "redux";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
)