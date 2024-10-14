import { useCallback, useEffect, useState, JSX } from 'react'
import { Square } from './square';
import './InfiniteScroll.css';

export const InfiniteScroll = (): JSX.Element => {
  const [squares, setSquares] = useState<Array<{ color: string }>>([])

  const fetchMoreSquares = useCallback((howMany: number = 10) => {
    return Array.from({ length: howMany }, () => ({ color: getRandomColor() }))
    function getRandomColor(): string {
      return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
    }
  }, []);

  useEffect(() => {
    // Needs to be a separate function so it can be removed. 
    const handleScroll = () => {
      const distanceToBottom = document.body.scrollHeight - window.innerHeight - window.scrollY;
      if (distanceToBottom < 500) {
        const newSquares = fetchMoreSquares();
        setSquares(oldSquares => [...oldSquares, ...newSquares]);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [fetchMoreSquares]);

  console.log('squares', squares)
  return (
    <section className='InfiniteScroll'>
      <button onClick={() => setSquares([...squares, ...fetchMoreSquares()])}>Get more</button>
      <section id="squares">
        {squares.map((s, i) => <Square {...s} number={i} key={i} />)}
      </section>
    </section>
  )
}