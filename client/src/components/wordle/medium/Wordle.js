import React, { useEffect, useState } from 'react'
import useWordle from '../../../hooks/useWordle'
import axios from 'axios'
import { useAuthContext } from '../../../hooks/useAuthContext'
import './Wordle.css'

// components
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle({ solution }) {
  
  const [userInfo, setUserInfo] = useState(null);
  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup } = useWordle(solution)
  const [showModal, setShowModal] = useState(false)
  const { user } = useAuthContext()
  const token = user.token
  
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
    if (userInfo) {
      const updateUserInfo = async () => {
        try {
          const updatedGames = userInfo.games + 1;
          const updatedWins = isCorrect ? userInfo.wins + 1 : userInfo.wins;
          const updatedLoses = isCorrect ? userInfo.loses : userInfo.loses + 1;

          const response = await axios.put(
            '/api/user',
            {
              games: updatedGames,
              wins: updatedWins,
              loses: updatedLoses,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // Handle successful response if needed
          console.log(response.data);
        } catch (error) {
          console.error('Error updating user information:', error);
        }
      };

      if (turn > 5 || isCorrect) {
        updateUserInfo();
      }
    }
  }, [userInfo, isCorrect, turn, token]);
  
  
  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn])

  return (
    <div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
    </div>
  )
}