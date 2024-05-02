import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { useVocabsContext } from '../hooks/useVocabsContext';
import VocabDetails from '../components/VocabDetails';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { vocabs, dispatch } = useVocabsContext();
  const { user } = useAuthContext();
  const token = user.token;
  const [newVocabularyName, setNewVocabularyName] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, [token]);

  useEffect(() => {
    const fetchVocabs = async () => {
      try {
        const response = await axios.get('/api/vocab', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: 'SET_VOCABS', payload: response.data });
      } catch (error) {
        console.error('Error fetching vocabularies:', error);
      }
    };

    if (user) {
      fetchVocabs();
    }
  }, [dispatch, token, user]);


  const handleCreateVocabulary = async () => {
    try {
      const response = await axios.post('/api/vocab', {
        name: newVocabularyName,
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        setShowModal(false);
        setNewVocabularyName('');
        // Handle creation if needed
      }
    } catch (error) {
      console.error('Error creating vocabulary:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {userInfo && (
        <div>
          <p>Email: {userInfo.email}</p>
          <p>Games Played: {userInfo.games}</p>
          <p>Wins: {userInfo.wins}</p>
          <p>Loses: {userInfo.loses}</p>
          <h2>Vocabularies:</h2>
          {vocabs &&
            vocabs.map((vocabulary) => (
              <VocabDetails key={vocabulary._id} vocabulary={vocabulary} />
            ))}
        </div>
      )}
      <button onClick={() => setShowModal(true)}>Create Vocabulary</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Create Vocabulary</h2>
            <input
              type="text"
              value={newVocabularyName}
              onChange={(e) => setNewVocabularyName(e.target.value)}
              placeholder="New Vocabulary Name"
            />
            <button onClick={handleCreateVocabulary}>Create</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;