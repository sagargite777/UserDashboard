import React from 'react';
import { useSelector } from 'react-redux';

const UserDetails = () => {
  const selectedUser = useSelector((state) => state.users.selectedUser);
  console.log('Selected User:', selectedUser);


  if (!selectedUser) {
    return <p>Select a user from the list to view details.</p>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {selectedUser.first_name} {selectedUser.last_name}</p>
      <p>Email: {selectedUser.email}</p>
      <p>Status: {selectedUser.status}</p>
      <img src={selectedUser.avatar} alt={`Avatar of ${selectedUser.first_name}`} />
    </div>
  );
};

export default UserDetails;
