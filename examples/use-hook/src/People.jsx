import { Person } from './Person'
import { use } from 'react'
export const People = () => {
  const people = use(fetchPeople())
  console.log({ people })
  return (
    <>
      <h1>People</h1>
      {people.map(p => <Person person={p} key={p.id} />)}
    </>
  )


  async function fetchPeople() {
    const res = await fetch(`https://randomuser.me/api/?results=2`)
    if (!res.ok) {
      console.error(`Error fetching people.`, res.status);
      throw 'Failed to fetch people'
    }
    const resJson = await res.json().then((p, i) => ({ ...p, id: i + 100 }));
    const ppl = resJson.results;
    return ppl;
  }
}