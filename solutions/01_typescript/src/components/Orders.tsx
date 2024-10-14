import { useState, useEffect, ReactElement } from 'react'
import { getOrders } from '../data/repository';
import { OrderSummary } from './OrderSummary.tsx';
import './Orders.css';
import { User } from '../types/User.ts';
import { Order } from '../types/Order.ts';

interface Props {
  user: User | undefined;
}
export const Orders = ({ user }: Props): ReactElement => {
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
          {orders?.map(order => <OrderSummary order={order} user={user} key={order.id} />)}
        </tbody>
      </table>
    </section>
  )
}

