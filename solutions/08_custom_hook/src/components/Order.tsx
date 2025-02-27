import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMenuItems, getOrder } from "../data/repository";
import { getNumberOfDiners, getOrderTotal, toCurrency } from "../data/utilities";
import './Order.css';
import { Order as OrderType } from "../types/Order";
import { MenuItem } from "../types/MenuItem";


export const Order = (): ReactElement => {
  const orderId: number = +(useParams().orderId || 0);
  const [order, setOrder] = useState<OrderType>();
  const [menuItems, setMenuItems] = useState<Array<MenuItem>>();
  useEffect(() => {
    getOrder(orderId)
      .then(o => setOrder(o))
      .catch(err => console.log(err));
    getMenuItems()
      .then(mi => setMenuItems(mi));
  }, [orderId]);
  return (
    <section className="Order">
      <h2>Order {orderId}</h2>
      <p><span className="label">Customer:</span> {order?.userId}</p>
      <p><span className="label">Number of guests:</span> {order && getNumberOfDiners(order)}</p>
      <p><span className="label">Credit card:</span> {order?.creditCard?.pan}, <span className="label">expiry:</span> {order?.creditCard?.expiryMonth}/{order?.creditCard?.expiryYear}</p>
      <p><span className="label">Area:</span> {order?.area}</p>
      <p><span className="label">Location:</span> {order?.location}</p>
      <p><span className="label">Order time:</span> {order?.orderTime?.toLocaleString()}</p>
      <table>
        <tbody>
          {order?.items?.map(item => (
            <tr key={item.id} className="orderLine">
              <td>{item.itemID && getMenuItem(item.itemID)?.name}</td>
              <td>{toCurrency(item.price ?? 0)}</td>
              <td>(for {item.firstName})</td>
            </tr>
          ))}
          <tr className="taxLine"><td>Tax</td><td>{toCurrency(order?.tax ?? 0)}</td></tr>
          <tr className="tipLine"><td>Tip</td><td>{toCurrency(order?.tip ?? 0)}</td></tr>
          <tr className="totalLine"><td>Total</td><td>{order && getOrderTotal(order)}</td></tr>
        </tbody>
      </table>
    </section>
  )
  function getMenuItem(id: number) {
    return menuItems?.find(mi => mi.id === id)
  }
}
