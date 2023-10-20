import React from 'react';
import imag1 from '../../../images/Avocado Hass.jpg'
import { useSelector, useDispatch } from 'react-redux';
import { IOrderItem, IOrdersModel } from '../../../Models/ordersModel';
import { useParams } from 'react-router-dom';
import { ESTATUS, getAMountFormat, isOrderDone } from '../../utilities';
import { openUpdateStatusModel, setActionData, updateOrderItemStatus } from '../../../store/ordersSlice';

const OrderItemView = ({ id }: { id: number }) => {
    const { orderid } = useParams();
    const dispatch = useDispatch() as any;
    const activeItem: IOrderItem | undefined = useSelector((state: any) => (state.ordersReducer as IOrdersModel).orders?.find(x => x.orderId === orderid)?.items?.find(item => item.id === id));
    const orderStatus: number = useSelector((state: any) => (state.ordersReducer as IOrdersModel).orders?.find(x => x.orderId === orderid)?.status || 0);
    const shippingDate: string | undefined = useSelector((state: any) => (state.ordersReducer as IOrdersModel).orders?.find(x => x.orderId === orderid)?.shippingDate);
    const totalAmount = (price: number, quantity: number) => {
        let val = price * quantity;
        return isNaN(val) ? 0 : getAMountFormat(val);
    }
    const isOrderDoneVal = isOrderDone(orderStatus, shippingDate);
    const getPriceFormat = (price: number) => {
        return `${getAMountFormat(price)}/1 item`;
    }
    const getQuantityFormat = (quantity: number) => {
        return `${quantity} * 1 item`;
    }
    const handleCSSforStatus = (orderItem: IOrderItem | undefined) => {
        if (orderItem?.oldPrice || orderItem?.oldQuantity)
            return "approved-bg";
        else
            switch (orderItem?.status || 0) {
                case ESTATUS.Added:
                    return ''
                case ESTATUS.Approved:
                    return 'approved-bg'
                case ESTATUS.Missing:
                    return 'missing-bg'
                case ESTATUS.Missing_Urgent:
                    return 'missing-urgent-bg'
                default:
                    return ''
            }
    }
    const handleStatusMessage = (orderItem: IOrderItem | undefined) => {
        if (orderItem?.oldPrice && orderItem?.oldQuantity)
            return "Quantity and Price Updated";
        else if (orderItem?.oldPrice)
            return "Price Updated";
        else if (orderItem?.oldQuantity)
            return "Quantity Updated";
        else
            switch (orderItem?.status || 0) {
                case ESTATUS.Added:
                    return ''
                case ESTATUS.Approved:
                    return 'Approved'
                case ESTATUS.Missing:
                    return 'Missing'
                case ESTATUS.Missing_Urgent:
                    return 'Missing-Urgent'
                default:
                    return ''
            }
    }
    const handleItemStatus = (updatedStatus: number) => {
        if (!isOrderDoneVal)
            dispatch(updateOrderItemStatus({ orderid, id, updatedStatus }))
    }
    return <>
        <td><img src={imag1} /></td>
        <td>{activeItem?.productName}</td>
        <td>{activeItem?.brand}</td>
        <td >
            <span>{getPriceFormat(activeItem?.price || 0)}</span><br />
            {Boolean(activeItem?.oldPrice) && <span className='line-through' >{getAMountFormat(activeItem?.oldPrice || 0)}</span>}
        </td>
        <td >
            <span>{getQuantityFormat(activeItem?.quantity || 0)}</span><br />
            {Boolean(activeItem?.oldQuantity) && <span className='line-through'>{activeItem?.oldQuantity}</span>}
        </td>
        <td >
            <span>{totalAmount(activeItem?.price || 0, activeItem?.quantity || 0)}</span><br />
            {(Boolean(activeItem?.oldPrice) || Boolean(activeItem?.oldQuantity)) &&
                <span className='line-through'>{totalAmount(activeItem?.oldPrice || activeItem?.price || 0, activeItem?.oldQuantity || activeItem?.quantity || 0)}</span>}
        </td>
        <td>
            <span className={`status-col ${handleCSSforStatus(activeItem)} ft-sm`}>{handleStatusMessage(activeItem)}</span>
        </td>
        <td {...isOrderDoneVal ? { title: 'Unable to update, Bez of Order is Approved or Shipped' } : {}}>
            <i className={`fa fa-check action-icon ${ESTATUS.Approved === activeItem?.status ? 'approved-icon' : ""} ${isOrderDoneVal ? 'curser-close' : ''}`} aria-hidden="true" onClick={() => handleItemStatus(ESTATUS.Approved)}></i>
            <i className={`fa fa-times action-icon ${[ESTATUS.Missing, ESTATUS.Missing_Urgent].includes(activeItem?.status || 0) ? 'cancel-icon' : ''}${isOrderDoneVal ? 'curser-close' : ''}`} aria-hidden="true"
                onClick={() => { !isOrderDoneVal && dispatch(openUpdateStatusModel(activeItem)) }}></i>
            <span className={`action-icon ${isOrderDoneVal ? 'curser-close' : ''}`} onClick={() => { !isOrderDoneVal && dispatch(setActionData(activeItem)) }}>Edit</span>
        </td>
    </>
}
export default React.memo(OrderItemView);