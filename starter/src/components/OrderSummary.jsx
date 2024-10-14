import { useNavigate } from 'react-router-dom';
import { getOrderTotal, getNumberOfDiners } from "../data/utilities";

export const OrderSummary = ({ order, user }) => {
  const navigate = useNavigate();
  if (order?.userId === user?.id)
    return (
      <>
        <tr onClick={() => navigate(`/orders/${order?.id}`)}>
          <td>{order?.id}</td>
          <td>{order?.orderTime.toLocaleString()}</td>
          <td>{getOrderTotal(order)}</td>
          <td>{getNumberOfDiners(order)}</td>
        </tr>
      </>
    )
}