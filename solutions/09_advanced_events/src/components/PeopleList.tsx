import { ReactElement, useEffect, useRef, useState } from "react";
import { Person as PersonType } from "../types/Person";
import { Person } from "./Person";
import './PeopleList.css';

export const PeopleList = (): ReactElement => {
  const [people, setPeople] = useState<Array<PersonType>>([]);
  const loading = useRef<boolean>(false);

  useEffect(() => {
    fetchPeople();
    const handleScroll = () => {
      if (loading.current) return;
      //console.log(document.documentElement.scrollHeight, window.innerHeight, window.scrollY);
      const pixelsFromBottom = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY);
      if (pixelsFromBottom < 100) {
        fetchPeople();
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="PeopleList">
      <h1>People List</h1>
      <button onClick={() => fetchPeople()}>fetch 10 more people</button>
      <section>
        {people.map(person => <Person key={person.email} person={person} />)}
      </section>
    </section>
  );

  function fetchPeople() {
    loading.current = true;
    fetch(`https://randomuser.me/api?results=10`)
      .then(res => res.json())
      .then(res => res.results)
      .then(ppl => setPeople(people => [...people, ...ppl]))
      .then(() => loading.current = false);
  }
}