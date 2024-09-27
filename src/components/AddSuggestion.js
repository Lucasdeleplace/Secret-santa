import React, { useState } from 'react';
import { addSuggestion } from '../services/api';
import './AddSuggestion.css';  // Import du fichier CSS

const AddSuggestion = ({ userId, onSuggestionAdded  }) => {
  const [giftSuggestion, setGiftSuggestion] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSuggestion = {
      userId,
      giftSuggestion,
      price,
      description,
    };

    if (giftSuggestion.trim()) {
      await addSuggestion(newSuggestion);
      setGiftSuggestion('');
      setPrice('');
      setDescription('');
      onSuggestionAdded();
    }
  }
  return (
    <form className="add-suggestion" onSubmit={handleSubmit}>
      <h2>Ajouter une suggestion</h2>
      <input
        type="text"
        placeholder="Nom du cadeau"
        value={giftSuggestion}
        onChange={(e) => setGiftSuggestion(e.target.value)}
      />
      <input
        type="number"
        placeholder="Prix"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddSuggestion;
