import { createContext, useContext } from 'react'

// true = loader finished, animations play normally
// false = loader still active, hero delays need offset
export const LoaderContext = createContext(false)
export const useLoaderDone = () => useContext(LoaderContext)
