"use client";
// import { People } from './People'
import { Suspense } from 'react';
import Joke from './Joke';

export function App() {
  return (
    <>
      <section>
        <Suspense fallback={<p>waiting for message...</p>}>
          <Joke />
        </Suspense>
      </section>
    </>
  )
}

export default App
