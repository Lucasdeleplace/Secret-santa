import React, { useEffect, useState } from 'react';
import { getGiftSuggestions } from '../services/api';
import './GiftSuggestions.css';

const GiftSuggestions = ({ userId, userName, updateTrigger }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!userId) return;
      try {
        const fetchedSuggestions = await getGiftSuggestions(userId);
        setSuggestions(fetchedSuggestions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [userId, updateTrigger]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="gift-suggestions">
      <h2>Suggestions de cadeaux pour {userName}</h2>
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion._id}>
            <strong>{suggestion.giftSuggestion}</strong> - {suggestion.price} €
            <p>{suggestion.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GiftSuggestions;