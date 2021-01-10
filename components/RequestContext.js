import { createContext, useContext } from 'react'

export const RequestContext = createContext()
export function useRequest() {
  return useContext(RequestContext)
}
