import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { useVocabsContext } from '../hooks/useVocabsContext';

export const handleCreateVocabulary = async (newVocabularyName, token, dispatch, setShowModal, setNewVocabularyName) => {
  try {
    const response = await axios.post('/api/vocab', {
      name: newVocabularyName,
      owner: token
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      dispatch({ type: 'CREATE_VOCAB', payload: response.data });
      setShowModal(false);
      setNewVocabularyName('');
    }
  } catch (error) {
    console.error('Error creating vocabulary:', error);
  }
};

const VocabDetails = ({ vocabulary }) => {
  
  const { user } = useAuthContext();
  const token = user.token;
  const { dispatch } = useVocabsContext();
  const [collapsed, setCollapsed] = useState(true);
  const [newName, setNewName] = useState(vocabulary.name);
  const [editing, setEditing] = useState(false);
  
  const handleDelete = async () => {
    
    dispatch({ type: 'DELETE_VOCAB', payload: vocabulary._id });
    
    try {
      await axios.delete(`/api/vocab/${vocabulary._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
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
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 201) {
        dispatch({ type: 'RENAME_VOCAB', payload: { id: vocabulary._id, newName: newName } });
      }

      console.log(response.data)
    } catch (error) {
      console.error('Error renaming vocabulary:', error);
    }
  };

  const handleDeleteWord = async (wordId) => {
    
    dispatch({ type: 'DELETE_WORD', payload: { vocabId: vocabulary._id, wordId: wordId } });
    
    try {
      await axios.delete(`/api/vocab/deleteword/${vocabulary._id}/word/${wordId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming you're using localStorage to store the token
        },
      });
      // If needed, update the state to remove the deleted word
    } catch (error) {
      console.error('Error deleting word:', error);
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
              ><i class="fas fa-pencil-alt"></i>
                
              </span>
              <span
                className="vocab-details_delete"
                onClick={handleDelete}
              ><i class="fas fa-trash-alt"></i>
                
              </span>
            </>
          )}
        </div>
      </div>
      <div className ={ `word-list ${collapsed? 'inactive' : 'active'}` }>
      {!collapsed && (
        <ul>
          {vocabulary.words.map((word) => (
            <li key={word._id}>
              <strong>{word.word}:</strong> {word.definition}
              <button onClick={() => handleDeleteWord(word._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
};

export default VocabDetails;