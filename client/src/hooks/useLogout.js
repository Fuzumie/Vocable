import { useAuthContext } from './useAuthContext'
import { useVocabsContext } from './useVocabsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchVocabs } = useVocabsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchVocabs({ type: 'SET_VOCABS', payload: null })
  }

  return { logout }
}