import { use, Suspense } from 'react'

const fetchData = async () => {
  const res = await fetch('https://api.chucknorris.io/jokes/random')
  return res.json()
}

const JokeItem = ({ jokePromise }) => {
  const joke = use(jokePromise)
  return <h2>{joke.value}</h2>
}

export default function Joke() {
  const jokePromise = fetchData();
  return (
    <>
      <Suspense fallback={<p>Waiting for message...</p>}>
        <JokeItem jokePromise={jokePromise} />
      </Suspense >
    </>
  )
}