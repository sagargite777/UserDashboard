// UserList.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleUserStatus, fetchUsers, selectUser } from '../features/user/userSlice';
import { Paper, Grid, Typography, Button, TextField } from '@mui/material';
import './style.css';
import UserDetails from './UserDetails';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [userDetailsVisible, setUserDetailsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleToggleStatus = (user) => {
    dispatch(toggleUserStatus(user));
  };

  const filteredUsers = users.users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (user) => {
    console.log("list",user)
    dispatch(selectUser(user));
    setUserDetailsVisible(true);
  };

  return (
    <div className="dashboard-container">
      <h2>User List Dashboard</h2>
      <TextField
        label="Search by Name or Email"
        variant="outlined"
        size="small"
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Grid container spacing={2}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id} onClick={() => handleUserClick(user)}>
            <Paper elevation={3} style={{ padding: '10px' }} className="user-card">
              <Typography variant="h5">Name: {user.first_name}</Typography>
              <Typography>Email: {user.email}</Typography>
              <Typography>Status: {user.status}</Typography>
              <Button variant="contained" onClick={() => handleToggleStatus(user)}>
                Toggle Status
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {userDetailsVisible && <UserDetails />}
    </div>
  );
};

export default UserList;
