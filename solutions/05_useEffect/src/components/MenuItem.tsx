import { MenuItem as MenuItemType } from '../types/MenuItem';
import { toCurrency } from '../data/utilities';
import { CSSProperties, ReactElement } from 'react';

interface Props {
  menuItem: MenuItemType;
  addToCart: (menuItem: MenuItemType) => void;
}

export const MenuItem = ({ menuItem, addToCart }: Props): ReactElement => {
  return (
    <section style={styles.itemCard}>
      <div>
        <img src={menuItem.imageUrl} alt={menuItem.name} style={styles.image} />
      </div>
      <div className="menuDetails">
        <h2 style={styles.itemName}>{menuItem.name}</h2>
        <p style={styles.description}>{menuItem.description}</p>
        <p style={styles.price}>{toCurrency(menuItem.price ?? 0)}</p>
        <div style={styles.addButtonContainer}>
          <button onClick={() => addToCart(menuItem)}>Add</button>
        </div>
      </div>
    </section>
  )
}


const styles: { [P: string]: CSSProperties } = {
  itemCard: {
    border: "2px solid var(--dark2)",
    margin: "20px",
    flex: "1 0 250px",
  },
  image: {
    width: "100%", height: 200,
    backgroundSize: "cover",
  },
  itemName: {
    margin: "5px 10px",
  },
  description: {
    padding: '0 10px',
  },
  price: {
    textAlign: 'right',
    padding: '0 10px',
    fontWeight: 'bold',
  },
  addButtonContainer: {
    textAlign: 'right',
    margin: '0 10px 10px auto',
  }
};