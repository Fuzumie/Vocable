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

      dispatch({ type: 'CREATE_VOCAB', payload: response.data });
      setShowModal(false);
      setNewVocabularyName('');
    
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
    
    try {
      await axios.delete(`/api/vocab/${vocabulary._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
    } catch (error) {
      console.error('Error deleting vocabulary:', error);
    }

    dispatch({ type: 'DELETE_VOCAB', payload: vocabulary._id });

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

      console.log(response.data)
    } catch (error) {
      console.error('Error renaming vocabulary:', error);
    }
    setEditing(false);
    dispatch({ type: 'RENAME_VOCAB', payload: { id: vocabulary._id, newName: newName } });
  };

  const handleDeleteWord = async (wordId) => {
    
    try {
      await axios.delete(`/api/vocab/deleteword/${vocabulary._id}/word/${wordId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
    } catch (error) {
      console.error('Error deleting word:', error);
    }

    dispatch({ type: 'DELETE_WORD', payload: { vocabId: vocabulary._id, wordId: wordId } });
  };

  return (
    <div className="vocab-details">
      <div className="vocab-header" onClick={() => setCollapsed(!collapsed)}>
        <h4>{vocabulary.name}</h4>
        
        <div className='edit-vocab'>
          {editing ? (
            <>
              <input className='input-edit-vocab'
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
              <span className="word-delete"onClick={() => handleDeleteWord(word._id)}><i class="fas fa-trash-alt"></i></span>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
};

export default VocabDetails;