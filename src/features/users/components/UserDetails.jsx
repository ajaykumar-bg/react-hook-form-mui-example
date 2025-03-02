import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSelectedUser } from '../redux/reducers/usersSlice';

const UserDetails = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.users);

  if (loading) return <div data-testid="loading-details">Loading user details...</div>;
  if (error) return <div data-testid="error-details">Error: {error}</div>;
  if (!user) return null;

  return (
    <div className="user-details" data-testid="user-details">
      <h2>User Details</h2>
      <div>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
        <p><strong>Company:</strong> {user.company?.name}</p>
        <p><strong>Address:</strong> {`${user.address?.street}, ${user.address?.city}, ${user.address?.zipcode}`}</p>
      </div>
      <button 
        onClick={() => dispatch(clearSelectedUser())}
        data-testid="back-button"
      >
        Back to List
      </button>
    </div>
  );
};

export default UserDetails;