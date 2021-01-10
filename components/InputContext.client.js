import { createContext, useContext } from 'react'

export const InputContext = createContext()
export function useLocation() {
  return useContext(InputContext)
}
