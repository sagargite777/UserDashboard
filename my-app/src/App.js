import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <UserList />
      <Router>
        <Routes>
          <Route path="/" exact element={UserList} />
          <Route path="/user/:id" element={UserDetails} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;