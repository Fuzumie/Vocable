import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { useVocabsContext } from '../hooks/useVocabsContext';
import VocabDetails, {handleCreateVocabulary} from '../components/VocabDetails';

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
  
  const createVocabulary = async () => {
    await handleCreateVocabulary(newVocabularyName, token, dispatch, setShowModal, setNewVocabularyName);
  };

  const calculateWinRate = () => {
    if (userInfo && userInfo.games > 0) {
      const winRate = (userInfo.wins / userInfo.games) * 100;
      return winRate.toFixed(2); // Round to 2 decimal places
    }
    return null; // Return null if user has not played a single game
  };
  
  return (
    <div>
      <h1 className='stats-h1'>Dashboard</h1>
      {userInfo && (
        <div className='stats'>
          <p>Games Played: {userInfo.games}</p>
          <p>Wins: {userInfo.wins}</p>
          <p>Loses: {userInfo.loses}</p>
          {userInfo && userInfo.games > 0 && (
          <p>Win Rate: {calculateWinRate()}%</p>
      )}
      </div>
      )}
      <div className='vocab'>
          {vocabs &&
            vocabs.map((vocabulary) => (
              <VocabDetails key={vocabulary._id} vocabulary={vocabulary} />
            ))}
        
      <button className='create-vocab-button' onClick={() => setShowModal(true)}>Create Vocabulary</button>
      {showModal && (
        <div className="modal-dashboard">
          <div className="modal-dashboard-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Create Vocabulary</h2>
            <input
              type="text"
              value={newVocabularyName}
              onChange={(e) => setNewVocabularyName(e.target.value)}
              placeholder="New Vocabulary Name"
            />
            <button onClick={createVocabulary}>Create</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Dashboard;