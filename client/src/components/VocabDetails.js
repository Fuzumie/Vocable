import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const VocabDetails = ({ vocabulary }) => {
  const { user } = useAuthContext();
  const [collapsed, setCollapsed] = useState(true);
  const [newName, setNewName] = useState(vocabulary.name);
  const [editing, setEditing] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/vocab/${vocabulary._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        // Handle deletion if needed
      }
    } catch (error) {
      console.error('Error deleting vocabulary:', error);
    }
  };

  const handleRename = async () => {
    try {
      const response = await axios.put(`/api/vocab/${vocabulary._id}`, {
        name: newName,
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log(response.data)
    } catch (error) {
      console.error('Error renaming vocabulary:', error);
    }
  };

  return (
    <div className="vocab-details">
      <div className="vocab-header" onClick={() => setCollapsed(!collapsed)}>
        <h4>{vocabulary.name}</h4>
        <div>
          {editing ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button onClick={handleRename}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <span
                className="vocab-details_edit"
                onClick={() => setEditing(true)}
              >
                edit
              </span>
              <span
                className="vocab-details_delete"
                onClick={handleDelete}
              >
                delete
              </span>
            </>
          )}
        </div>
      </div>
      {!collapsed && (
        <ul className="word-list">
          {vocabulary.words.map((word) => (
            <li key={word._id}>
              <strong>{word.word}:</strong> {word.definition}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VocabDetails;