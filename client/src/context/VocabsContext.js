import { createContext, useReducer } from 'react'

export const VocabsContext = createContext()

export const vocabsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VOCABS': 
      return {
        vocabs: action.payload
      }
    case 'CREATE_VOCAB':
      return {
        vocabs: [action.payload, ...state.vocabs]
      }
    case 'DELETE_VOCAB':
      return {
        vocabs: state.vocabs.filter(vocab => vocab._id !== action.payload)
      }
      case 'RENAME_VOCAB':
        return {
          vocabs: state.vocabs.map(vocab => {
            if (vocab._id === action.payload.id) {
              return { ...vocab, name: action.payload.newName };
            }
            return vocab;
          })
        }
      case 'DELETE_WORD':
        return {
          vocabs: state.vocabs.map(vocab => {
            if (vocab._id === action.payload.vocabId) {
              return { 
                ...vocab, 
                words: vocab.words.filter(word => word._id !== action.payload.wordId)
              };
            }
            return vocab;
          })
        }
    default:
      return state
  }
}

export const VocabsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(vocabsReducer, {
    vocabs: null
  })

  return (
    <VocabsContext.Provider value={{...state, dispatch}}>
      { children }
    </VocabsContext.Provider>
  )
}