import { useState, useEffect, ReactElement } from 'react'
import { getOrders } from '../data/repository.ts';
import { OrderSummary } from './OrderSummary.tsx';
import './Orders.css';
import { Order } from '../types/Order.ts';

export const Orders = (): ReactElement => {
  const [orders, setOrders] = useState<Array<Order>>([]);
  useEffect(() => {
    getOrders()
      .then((res) => res.map((o) => ({ ...o, orderTime: new Date(o.orderTime ?? ""), pickupTime: new Date(o.pickupTime ?? "") })))
      .then((o) => setOrders(o))
      .catch(err => console.error(err))
  }, []);
  return (
    <section className='Orders'>
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Date/Time</th>
            <th>Total</th>
            <th># Guests</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map(order => <OrderSummary order={order} key={order.id} />)}
        </tbody>
      </table>
    </section>
  )
}

export default Orders;