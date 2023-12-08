// src/redux/reducers.js
import { combineReducers } from 'redux';
import usersReducer from './userSlice';
import { api } from './apiSlice';

const rootReducer = combineReducers({
  users: usersReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
