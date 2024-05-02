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
        vocabs: state.vocabs.filter((w) => w._id !== action.payload._id)
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