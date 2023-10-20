import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Avocado from '../../../images/Avocado Hass.jpg'
import { IOrderItem, IOrdersModel } from '../../../Models/ordersModel';
import { useDispatch, useSelector } from 'react-redux';
import { getAMountFormat } from '../../utilities';
import { editOrderItem, setActionData } from '../../../store/ordersSlice';
import { useParams } from 'react-router-dom';

const customStyles = {
    content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '400px',
        borderRadius: "18px"
    },
};
const reasonOptions = ["Missing Product", "Quantity is not the same", "Price is not the same", "Other"];

const OrderItemEditAction = () => {
    const { orderid } = useParams();
    const dispatch = useDispatch() as any;
    const actionData: IOrderItem | undefined = useSelector((state: any) => (state.ordersReducer as IOrdersModel).actionData);
    const [state, setState] = useState({ price: 1, quantity: 1, reason: '' });
    useEffect(() => {
        setState({ price: actionData?.price || 1, quantity: actionData?.quantity || 1, reason: actionData?.reason || '' });
    }, [actionData]);
    let trimText = actionData?.productName?.slice(0, 50);
    const handlePrice = (e: any) => {
        setState((pre => ({ ...pre, price: e.target.value > 1 ? e.target.value : pre.price })))
    }
    const handleQuantity = (val: number) => {
        setState(pre => ({ ...pre, quantity: (pre.quantity + val) > 0 ? (pre.quantity + val) : pre.quantity }))
    }
    const handleCancel = () => {
        dispatch(setActionData(undefined));
    }
    const handleReason = (val: string) => {
        setState((pre) => ({ ...pre, reason: val }));
    }
    const handleSubmit = () => {
        dispatch(editOrderItem({ ...state, orderid, id: actionData?.id }))
    }
    return <Modal
        isOpen={Boolean(actionData)}
        style={customStyles}
        ariaHideApp={false}
        overlayClassName="Overlay"
    >
        <div className='model-main flex-d flex-dir-column'>
            <div className='flex-d align-end-i'><i className="fa fa-times action-icon" aria-hidden="true" onClick={handleCancel}></i></div>
            <div className='flex-d flex-dir-column'>
                <div>
                    <h3>{`${trimText}${(actionData?.productName?.length || 0) > (trimText?.length || 1) ? '...' : ''}`}</h3>
                    <span>{actionData?.brand}</span>
                </div>
                <div className='flex-d price'>
                    <div className='flex-d flex-dir-column price-edit'>
                        <img src={Avocado} width={'120px'} height={'120px'} />
                    </div>
                    <div className='flex-d flex-dir-column price-edit'>
                        <span>Price</span>
                        <span>Quantity</span>
                        <span>Total</span>
                    </div>
                    <div className='flex-d flex-dir-column price-edit'>
                        <div className='flex-d just-center'>
                            <input type='number' value={state.price} onChange={handlePrice} name='price' />
                        </div>
                        <div className='flex-d'>
                            <i className="fa fa-minus-circle fa-lg" aria-hidden="true" onClick={() => handleQuantity(-1)}></i>
                            <input disabled={true} value={state.quantity} />
                            <i className="fa fa-plus-circle fa-lg" aria-hidden="true" onClick={() => handleQuantity(1)}></i>
                        </div>
                        <span>{getAMountFormat((isNaN(state.price) ? 0 : state.price) * state.quantity)}</span>
                    </div>
                </div>
                <div>
                    <dl>
                        <dt>Choose Reason <span>{'(Optional)'}</span></dt>
                        <dd >
                            {reasonOptions.map((item, ind) => <a key={ind} className={`pointer ${state.reason === item ? 'active' : ""}`} onClick={() => handleReason(item)}>{item}</a>)}
                        </dd>
                    </dl>
                </div>
            </div>
            <div className='flex-d just-end'>
                <div>
                    <button className='button-m success' onClick={handleCancel}>Cancel</button>
                    <button className='button button-green' onClick={handleSubmit}>Send</button>
                </div>
            </div>
        </div>
    </Modal >
}
export default React.memo(OrderItemEditAction)