import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ userId }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleChangePassword = async () => {
    try {
      await axios.post(`/api/users/${userId}/change-password`, {
        currentPassword,
        newPassword,
      });
      // Optionally, display a success message or update the UI
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div className="user-profile-container">
      {userProfile ? (
        <table className="user-profile-table">
          <tbody>
            <tr><td colSpan="2"><h2>User Profile</h2></td></tr>
            <tr><td>Name:</td><td>{userProfile.name}</td></tr>
            <tr><td>Email:</td><td>{userProfile.email}</td></tr>
            {/* Add other user information here */}
            <tr><td colSpan="2">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                /></td>
            </tr>
            <tr><td colSpan="2">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                /></td>
            </tr>
            <tr><td colSpan="2"><button onClick={handleChangePassword}>Change Password</button></td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;