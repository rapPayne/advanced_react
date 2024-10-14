'use client';
import db from './assets/characters.json';

export function Character({ id }) {
  //console.log(db)
  const character = db.results.find(c => c.id === +id);
  return (
    <>
      <h1>{character?.name}</h1>
      <p>id: {character?.id}</p>
    </>
  )
}