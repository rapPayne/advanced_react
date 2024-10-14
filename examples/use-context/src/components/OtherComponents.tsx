import { ReactElement, useContext } from "react"
import { CountContext } from "../App"

export const C1 = (): ReactElement => {
  return (
    <>
      <h1>C1</h1>
      <C2 />
    </>
  )
}

const C2 = (): ReactElement => {
  return (
    <>
      <h1>C2</h1>
      <C3 />
    </>
  )
}
const C3 = (): ReactElement => {
  return (
    <>
      <h1>C3</h1>
      <C4 />
    </>
  )
}
const C4 = (): ReactElement => {
  return (
    <>
      <h1>C4</h1>
      <C5 />
    </>
  )
}
const C5 = (): ReactElement => {
  const ctx = useContext(CountContext)
  const { count, setCount } = ctx!;
  return (
    <>
      <h1>C5</h1>
      <p>Count is {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  )
}
