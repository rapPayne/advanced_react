import { useNavigate } from 'react-router-dom';
import { getOrderTotal, getNumberOfDiners } from "../data/utilities";
import { Order } from '../types/Order';
import { ReactElement, useContext } from 'react';
import { UserContext } from '../App';
interface Props {
  order: Order;
}
export const OrderSummary = ({ order }: Props): ReactElement | undefined => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  if (order?.userId === user?.id)
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