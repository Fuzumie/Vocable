import { useAuthContext } from './useAuthContext'
import { useVocabContext } from './useVocabContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchVocabs } = useVocabContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchVocabs({ type: 'SET_VOCABS', payload: null })
  }

  return { logout }
}