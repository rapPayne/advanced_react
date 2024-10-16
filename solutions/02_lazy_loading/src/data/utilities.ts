import { CartItem } from "../types/CartItem";
import { Order } from "../types/Order";

const taxRate = 0.0825;

export const getOrderTotal = (order: Order) =>
  toCurrency((order?.tax ?? 0)
    + (order?.tip ?? 0)
    + (order?.items ?? []).reduce((prev, curr) => prev + (curr.price ?? 0), 0)
  );

/**
 * Returns the number of diners on the ticket. Each item can store
 * a name who the cartItem is for. The number of unique names
 * is assumed to be the number of diners.
 * @param order {Order}
 * @returns {number}
 */
export const getNumberOfDiners = (order: Order) => {
  const diners: Array<string> = [];
  let totalDiners = 0;
  order.items?.forEach(i => diners.includes(i.firstName ?? "no name") || totalDiners++);
  return totalDiners;
}


export const toCurrency = (cost: number) =>
  Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    .format(cost)

/**
 * Calculates the cost of all the items in a cart.
 * @param cart {Array<CartItem>} The things in the cart
 * @returns {number} Total cost of all the items
 */
export const getCartTotal = (cart: Array<CartItem>) =>
  cart.reduce((prev, curr) => prev + curr.price, 0)

export const calculateTax = (cost: number) => cost * taxRate;

/**
 * Returns the max id in the current cart plus one - the *next* cart item id.
 * @param cart {Array<CartItem>} Things in the cart
 * @returns {number} Next id
 */
export const getNextCartItemId = (cart: Array<CartItem>) =>
  cart.reduce((prev, curr) => (prev > curr.id) ? prev : curr.id, 0) + 1;