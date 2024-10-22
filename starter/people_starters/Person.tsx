import { CSSProperties, ReactElement } from "react";
import { Person as PersonType } from '../types/Person';
interface PersonProps {
  person: PersonType,
}
export const Person = ({ person }: PersonProps): ReactElement => {
  const p = person;
  return (
    <section id="pplWrapper" style={styles.wrapper} >
      <div style={styles.header}>
        <h1 style={styles.cardName}>{p.name.first} {p.name.last}</h1>
        <img style={styles.profilePic} src={p.picture.large} alt="" />
      </div>
      <p style={styles.personData}>Cell: {p.cell}</p>
      <p style={styles.personData}>Email: {p.email}</p>
      <address style={styles.personData}>
        {p.location.street.number} {p.location.street.name}<br />
        {p.location.city} {p.location.state} {p.location.postcode}
      </address>
    </section>

  )
}

const styles: { [P: string]: CSSProperties } = {
  wrapper: {
    margin: 40,
    backgroundColor: 'papayawhip',
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 'auto 10px',
  },
  header: {
    position: 'relative',
    height: 300,
  },
  cardName: {
    position: 'absolute', top: 0, right: 0, left: 0,
    height: '2em',
    margin: 0,
    zIndex: 1,
    color: 'white',
    background: 'linear-gradient(black, #FF000000)',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    position: 'absolute',
    height: 300,
  },
  personData: {
    paddingLeft: 10,
    marginTop: 0,
    fontWeight: 'bold',
  }
}