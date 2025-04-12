import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(apiUrl+'users/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Status: {user.is_active ? 'Active' : 'Inactive'}</p>
          <p>Superuser: {user.is_superuser ? 'Yes' : 'No'}</p>
          <p>Verified: {user.is_verified ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
