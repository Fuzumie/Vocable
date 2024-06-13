import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useVocabsContext } from "../../hooks/useVocabsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { handleCreateVocabulary } from '../../components/VocabDetails';
import "./Wordle.css"

export default function Modal({ isCorrect, solution, turn, definition, onCloseModal }) {
  const { vocabs, dispatch } = useVocabsContext();
  const [selectedVocabulary, setSelectedVocabulary] = useState("");
  const [addedToVocabulary, setAddedToVocabulary] = useState(false);
  const { user } = useAuthContext();
  const token = user ? user.token : null;
  const [newVocabularyName, setNewVocabularyName] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const modalRef = useRef(null);

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

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="modal">
      <div ref={modalRef} className="modal-content">
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
                <button className="vocab-button" onClick={handleAddToVocabulary}>Add to Vocabulary</button>
                <button className="vocab-button" onClick={() => setShowModal(true)}>Create Vocabulary</button>
                {showModal && (
                  <div className="modal-create_vocab">
                    <div className="modal-content">
                      
                      <input className="new-vocab-input"
                        type="text"
                        value={newVocabularyName}
                        onChange={(e) => setNewVocabularyName(e.target.value)}
                        placeholder="New Vocabulary Name"
                      />

                      <br></br>

                      <button className="vocab-button" onClick={createVocabulary}>Create</button>
                    </div>
                  </div>
                )}
              </>
            )}
            <br></br>
            <button className="play_again" onClick={() => window.location.reload()}>Play again</button>
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
                <button className="vocab-button" onClick={handleAddToVocabulary}>Add to Vocabulary</button>
                <button className="vocab-button" onClick={() => setShowModal(true)}>Create Vocabulary</button>
                {showModal && (
                  <div className="modal-create_vocab">
                    <div className="modal-content">
                      
                      <input className="new-vocab"
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
            <br></br>
            <button className="play_again" onClick={() => window.location.reload()}>Play again</button>
          </div>
        )}
        {addedToVocabulary && (
          <div>
            <p>Word added to vocabulary!</p>
          </div>
        )}
        
      </div>
    </div>
  );
}