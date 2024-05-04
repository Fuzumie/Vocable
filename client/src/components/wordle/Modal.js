import React, { useState, useEffect } from "react";
import axios from "axios";
import { useVocabsContext } from "../../hooks/useVocabsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import {handleCreateVocabulary} from '../../components/VocabDetails';
import "./Wordle.css"
export default function Modal({ isCorrect, solution, turn, definition, onCloseModal }) {
  const { vocabs, dispatch } = useVocabsContext();
  const [selectedVocabulary, setSelectedVocabulary] = useState("");
  const [addedToVocabulary, setAddedToVocabulary] = useState(false);
  const { user } = useAuthContext();
  const token = user ? user.token : null; 
  const [newVocabularyName, setNewVocabularyName] = useState('');
  const [showModal, setShowModal] = useState(false);
  

  useEffect(() => {
    const fetchVocabs = async () => {
      try {
        const response = await axios.get("/api/vocab", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: "SET_VOCABS", payload: response.data });
      } catch (error) {
        console.error("Error fetching vocabularies:", error);
      }
    };

    if (user) {
      fetchVocabs();
    }
  }, [dispatch, token, user]);

  const handleAddToVocabulary = async () => {
    try {
      const response = await axios.post(
        `/api/vocab/addword/${selectedVocabulary}`,
        {
          word: solution,
          definition: definition,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ); // Adjust the API endpoint as per your backend route
      if (response.status === 200) {
        setAddedToVocabulary(true);
      }
    } catch (error) {
      console.error("Error adding word to vocabulary:", error);
    }
  };
  
  const createVocabulary = async () => {
    await handleCreateVocabulary(newVocabularyName, token, dispatch, setShowModal, setNewVocabularyName);
  };
  
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <p className="solution">{solution}</p>
          <p className="definition">{definition}</p>
          <p>You found the solution in {turn} turn/s.</p>
          {user && (
            <>
              <label>Select Vocabulary:</label>
              {vocabs && vocabs.length > 0 ? (
                <select
                  value={selectedVocabulary}
                  onChange={(e) => setSelectedVocabulary(e.target.value)}
                >
                  <option value="">--Select Vocabulary--</option>
                  {vocabs.map((vocabulary) => (
                    <option key={vocabulary._id} value={vocabulary._id}>
                      {vocabulary.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p>Please create a vocabulary.</p>
              )}
              <button onClick={handleAddToVocabulary}>Add to Vocabulary</button>
           
          
            <button onClick={() => setShowModal(true)}>Create Vocabulary</button>
            {showModal && (
            <div className="modal-create_vocab">
              <div className="modal-content">
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
           </>
          )}
          <button onClick={() => window.location.reload()}>Play again</button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>You Lost!</h1>
          <p className="solution">{solution}</p>
          <p className="definition">{definition}</p>
          <p>Better luck next time!</p>
          {user && (
            <>
              <label>Select Vocabulary:</label>
              {vocabs && vocabs.length > 0 ? (
                <select
                  value={selectedVocabulary}
                  onChange={(e) => setSelectedVocabulary(e.target.value)}
                >
                  <option value="">--Select Vocabulary--</option>
                  {vocabs.map((vocabulary) => (
                    <option key={vocabulary._id} value={vocabulary._id}>
                      {vocabulary.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p>Please create a vocabulary.</p>
              )}
              <button onClick={handleAddToVocabulary}>Add to Vocabulary</button>
           
            <button onClick={() => setShowModal(true)}>Create Vocabulary</button>
            {showModal && (
            <div className="modal-create_vocab">
              <div className="modal-content">
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
           </>
          )}
          <button onClick={() => window.location.reload()}>Play again</button>
        </div>
      )}
      {addedToVocabulary && (
        <div>
          <p>Word added to vocabulary!</p>
        </div>
      )}
      <span className="close-main" onClick={onCloseModal}>&times;</span>
    </div>
  );
}
