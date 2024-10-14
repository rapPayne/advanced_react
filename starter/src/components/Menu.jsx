import { useEffect, useState } from 'react';
import { getMenuItems } from '../data/repository';
import { MenuItem } from './MenuItem';

export const Menu = ({ addToCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    getMenuItems()
      .then(mi => setMenuItems(mi))
  }, []);
  return (
    <>
      <h1>Menu</h1>
      <section style={styles.wrapper} id="itemsWrapper">
        {menuItems?.map((menuItem) => <MenuItem menuItem={menuItem} addToCart={addToCart} key={menuItem.id} />)}
      </section>
    </>
  )
}

const styles = {
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },

};