import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import userReducer from '../store/reducers/userReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    users: userReducer
})

const store = createStore(
   rootReducer, 
   composeEnhancers(applyMiddleware(thunkMiddleware))
);


export default store;




