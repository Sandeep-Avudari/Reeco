import React from 'react';
import { IOrder } from '../../../Models/ordersModel';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderView = ({ item }: { item: IOrder }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleEdit = () => {
        let path = location.pathname;
        navigate(`${path}${path.slice(-1) === '/' ? '' : "/"}${item.orderId}`);
    }
    return <>
        <td>{item.orderId}</td>
        <td>{item.supplier}</td>
        <td>{item.orderedDate}</td>
        <td>{item.shippingDate}</td>
        <td >
            {<span className='action-icon' onClick={handleEdit}>Edit</span>}
        </td>
    </>
}
export default React.memo(OrderView);