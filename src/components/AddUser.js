import React, { useState } from 'react';
import { addUser } from '../services/api';
import './AddUser.css';

const AddUser = ({ onUserAdded }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      await addUser({ name });
      setName('');  // Réinitialiser le champ après l'ajout
      onUserAdded();  // Appeler la fonction pour mettre à jour la liste
    }
  };

  return (
    <form className="add-user" onSubmit={handleSubmit}>
      <h2>Ajouter un utilisateur</h2>
      <input
        type="text"
        placeholder="Nom de l'utilisateur"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddUser;
