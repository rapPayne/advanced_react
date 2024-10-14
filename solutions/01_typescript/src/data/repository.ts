import { MenuItem } from "../types/MenuItem";
import { Order } from "../types/Order";
import { User } from "../types/User";

const baseUrl = `/api`;
let jwtToken = "";

/**
 * Fetches all menuItems
 * @returns {Promise<Array<MenuItem>>} The menu items
 */
export const getMenuItems = (): Promise<Array<MenuItem>> => {
  const url = `${baseUrl}/menuItems`;
  return fetch(url)
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error(`Can't fetch menuItems: ${res.status} ${res.statusText}`)
    })
}

/**
 * Fetches all orders
 * @returns {Promise<Array<Order>>} The orders
 */
export const getOrders = (): Promise<Array<Order>> => {
  const url = `${baseUrl}/orders`;
  return fetch(url, {
    headers: {
      "Authorization": `Bearer ${jwtToken}`,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error(`Can't fetch orders: ${res.status} ${res.statusText}`)
    })
}

/**
 * Fetches one order
 * @param {number} The order id
 * @returns {Promise<Order>} The order
 */
export const getOrder = (id: number): Promise<Order> => {
  const url = `${baseUrl}/orders/${id}`;
  return fetch(url, {
    headers: {
      "Authorization": `Bearer ${jwtToken}`,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error(`Can't fetch order ${id}: ${res.status} ${res.statusText}`)
    })
}

/**
 * Authenticates the user
 * @param username {string} The username
 * @param password {string} The password (unhashed)
 * @returns {Promise<User>} The user along with a JWT token - a string
 */
export const login = (username: string, password: string) => {
  const url = `${baseUrl}/login`;
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => {
      if (res.ok)
        return res
      else
        throw new Error('Bad username or password')
    })
    .then(res => { jwtToken = res.headers.get('Authorization')?.split(' ')[1] ?? ""; return res; })
    .then(res => res.json())
    .then(res => ({ ...res, token: jwtToken }))
}

/**
 * Registers a user with our system
 * @param {user} User The user to be registered
 * @returns {user} The new registered user
 */
export const register = (user: User) => {
  const url = `${baseUrl}/register`;
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(res => {
      if (res.ok)
        return res
      else
        throw new Error('Could not create the new user. Try again')
    })
    .then(res => { jwtToken = res.headers.get('Authorization')?.split(' ')[1] ?? ""; return res; })
    .then(res => res.json())
}

/**
 * Submits an order to the server with form of payment
 * @param orderDetails {any} The cart, CC info, and tip 
 * @returns {<Promise<any>>} A message and orderId
 */
export const placeOrder = (orderDetails: any) => {
  const url = `${baseUrl}/placeOrder`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(orderDetails)
  })
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error(`Can't place your order: ${res.status} ${res.statusText}`)
    })
}