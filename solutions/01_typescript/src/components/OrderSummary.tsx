import { useNavigate } from 'react-router-dom';
import { getOrderTotal, getNumberOfDiners } from "../data/utilities";
import { Order } from '../types/order';
import { User } from '../types/user';
import { ReactElement } from 'react';
interface Props {
  order: Order;
  user: User | undefined;
}
export const OrderSummary = ({ order, user }: Props): ReactElement | undefined => {
  const navigate = useNavigate();
  if (order?.userID === user?.id)
    return (
      <>
        <tr onClick={() => navigate(`/orders/${order?.id}`)}>
          <td>{order?.id}</td>
          <td>{order?.orderTime?.toLocaleString()}</td>
          <td>{getOrderTotal(order)}</td>
          <td>{getNumberOfDiners(order)}</td>
        </tr>
      </>
    )
}