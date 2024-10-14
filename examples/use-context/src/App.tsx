import { useState, createContext, Dispatch, SetStateAction } from 'react'
import './App.css'
import { C1 } from './components/OtherComponents'

interface SetCountType {
  count: number; setCount: Dispatch<SetStateAction<number>>;
}
export const CountContext = createContext<SetCountType | undefined>(undefined)

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CountContext.Provider value={{ count, setCount }}>
        <p>Count is {count}</p>
        <button onClick={() => setCount(count + 1)}>+</button>
        <C1 />
      </CountContext.Provider>
    </>
  )
}

export default App
