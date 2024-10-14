import { JSX } from 'react'
import { SimulatedEditor } from './SimulatedEditor';
import { InfiniteScroll } from './InfiniteScroll';

function App(): JSX.Element {

  // useEffect(() => {
  //   const handleFocus = e => console.log('focusing', e);
  //   window.addEventListener('focus', handleFocus);
  //   return () => window.removeEventListener('focus', handleFocus);
  // }, []);
  // useEffect(() => {
  //   const handleFocus = e => console.log('blurring', e);
  //   window.addEventListener('blur', handleFocus);
  //   return () => window.removeEventListener('blur', handleFocus);
  // }, []);

  return (
    <main onBlur={console.warn} onFocus={console.error} className="App">
      <SimulatedEditor />
      <InfiniteScroll />
    </main>
  )
}

export default App
