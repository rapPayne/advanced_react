// import db from './assets/characters.json';
import { useState } from "react";
import { Character } from "./Character";

export function App() {
  const [id, setId] = useState(1);
  return (
    <>
      <input type="number" onChange={e => setId(e.target.value)} value={id} />
      <Character id={id} />
    </>
  )
}
