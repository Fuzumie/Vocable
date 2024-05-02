import { VocabsContext } from '../context/VocabsContext'
import { useContext } from 'react'

export const useVocabsContext = () => {
  const context = useContext(VocabsContext)

  if (!context) {
    throw Error('useVocabsContext must be used inside an VocabsContextProvider')
  }

  return context
}