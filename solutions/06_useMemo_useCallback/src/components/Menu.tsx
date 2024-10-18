import { CSSProperties, ReactElement, useEffect, useState } from 'react';
import { getMenuItems } from '../data/repository.ts';
import { MenuItem } from './MenuItem.tsx';
import { MenuItem as MenuItemType } from '../types/MenuItem.ts';

interface Props {
  addToCart: (menuItem: MenuItemType) => void;
}
export const Menu = ({ addToCart }: Props): ReactElement => {
  const [menuItems, setMenuItems] = useState<Array<MenuItemType>>([]);

  useEffect(() => {
    getMenuItems()
      .then((mi) => setMenuItems(mi))
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

const styles: { [P: string]: CSSProperties } = {
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
};