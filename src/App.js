import React, { useState } from 'react';
//import AddUser from './components/AddUser';
import UserList from './components/UserList';
import GiftSuggestions from './components/GiftSuggestions';
import AddSuggestion from './components/AddSuggestion';
import './App.css';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(0);

  //const handleUserAdded = () => {
    //setUpdateTrigger(updateTrigger + 1);
  //};

  const handleSuggestionAdded = () => {
    setUpdateTrigger(updateTrigger + 1);
  };

  const handleSelectUser = (userId, userName) => {
    setSelectedUser(userId);
    setSelectedUserName(userName);
  };
//<AddUser onUserAdded={handleUserAdded} />
  return (
    <div className="App">
      <h1>Secret Santa</h1>
      <UserList onSelectUser={handleSelectUser} selectedUserId={selectedUser} updateTrigger={updateTrigger} />
      {selectedUser && (
        <>
          <GiftSuggestions userId={selectedUser} userName={selectedUserName} updateTrigger={updateTrigger} />
          <AddSuggestion userId={selectedUser} onSuggestionAdded={handleSuggestionAdded} />
        </>
      )}
    </div>
  );
}

export default App;