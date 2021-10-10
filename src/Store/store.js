import admin from "./adminReducer";
import user from "./userReducer";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

const Reducer = combineReducers({
  admin,
  user,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(Reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
