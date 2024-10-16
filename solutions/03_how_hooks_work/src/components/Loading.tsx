import { ReactElement } from "react";
import './Loading.css'

export const Loading = (): ReactElement => {
  return (
    <section className="Loading">
      <div className="loading-spinner">
        <p>Loading... Please wait.</p>
        <div className="spinner"></div>
      </div>
    </section>
  )
}