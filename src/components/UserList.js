import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';
import './UserList.css';

const UserList = ({ onSelectUser, updateTrigger, selectedUserId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [updateTrigger]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-list">
      <h2>Liste des Participants</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id} onClick={() => onSelectUser(user._id, user.name)} className={user._id === selectedUserId ? 'selected' : ''}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;