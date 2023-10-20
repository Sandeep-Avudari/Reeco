import React, { useEffect, useState } from 'react';
import OrderItemView from '../Components/orderItemView';
import { useSelector, useDispatch } from 'react-redux';
import { IOrder, IOrdersModel } from '../../../Models/ordersModel';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllOrdersList } from '../../../store/integration';
import moment from 'moment'
import { setOrderById } from '../../../store/ordersSlice';
import UpdateStatusModel from '../Components/statusUpdateModel';
import { ESTATUS, getAMountFormat, isOrderDone } from '../../utilities';
import OrderItemEditAction from '../Components/orderItemEditAction';

const OrderManager = () => {
    const dispatch = useDispatch() as any;
    const { orderid } = useParams();
    const navigate = useNavigate();
    const [searchKey, setSearchKey] = useState('');
    const order: IOrder | undefined = useSelector((state: any) => (state.ordersReducer as IOrdersModel).orders?.find(item => item.orderId === orderid));
    const orderItems = order?.items;
    useEffect(() => {
        if (!order)
            dispatch(getAllOrdersList());
        else {

        }
    }, [order]);
    const handleOrderAppr = () => {
        if (!isOrderDone(order?.status || 0, order?.shippingDate))
            dispatch(setOrderById(order?.id))
    }
    const getTotalOrderAmount = () => {
        return getAMountFormat(orderItems?.reduce((total, ele) => (total + (ele.price * ele.quantity)), 0) || 0);
    }
    const filteredOrders = searchKey !== "" ? orderItems?.filter((item: any) => {
        return Object.keys(item).find(key => {
            return (item[key])?.toString()?.toLowerCase()?.includes(searchKey.toLowerCase())
        }
        );
    }) : orderItems;

    return <><div className='order-nav'>
        <div className="container">
            <nav className='flex-d'>
                <ul className='flex-d flex-dir-column'>
                    <li className='flex-item '>{`Orders > `}<a className='und-scroll pointer'>Order {orderid}</a></li>
                    <li className='flex-item'><strong className='font-size-order'>Order {orderid}</strong></li>
                </ul>
                <ul className='flex-d just-content-bottom'>
                    <li className='flex-item'><button className='button button-white' type='button' onClick={() => navigate(-1)} >Back</button></li>
                    <li className='flex-item'><button className='button button-green' onClick={handleOrderAppr}>{order?.status === ESTATUS.Approved ? "Approved order" : 'Approve order'}</button></li>
                </ul>
            </nav>
        </div>
    </div>
        <div className='body-container scroll-bar'>
            <div className="container">
                <nav className='flex-d flex-dir-column'>
                    <ul className='flex-d body-level-bar inner-container'>
                        <li className=' bdy-l-bar-itm w'><a className='pointer'><span className='opacity-lite'>Supplier</span> <h3>{order?.supplier}</h3></a></li>
                        <li className=' bdy-l-bar-itm w'><a className='pointer'><span className='opacity-lite'>Shipper date</span> <h3>{order?.shippingDate ? moment(order?.shippingDate).format("MMM Do YY") : '-'}</h3></a></li>
                        <li className=' bdy-l-bar-itm w'><a className='pointer'><span className='opacity-lite'>Total</span> <h3>{getTotalOrderAmount()}</h3></a></li>
                        <li className=' bdy-l-bar-itm w'><a className='pointer'><span className='opacity-lite'>Category
                            <div className='flex-d p-small'>
                                <i className="fa fa-bandcamp s" aria-hidden="true"></i>
                                <i className="fa fa-code-fork " aria-hidden="true"></i>
                                <i className="fa fa-snowflake-o " aria-hidden="true"></i>
                            </div>
                            <div className='flex-d p-small'>
                                <i className="fa fa-bug" aria-hidden="true"></i>
                                <i className="fa fa-ravelry" aria-hidden="true"></i>
                                <i className="fa fa-wpexplorer" aria-hidden="true"></i>
                            </div>
                        </span></a></li>
                        <li className=' bdy-l-bar-itm w'><a className='pointer'><span className='opacity-lite'>Department</span><h3>{order?.department}</h3></a></li>
                        <li className=' bdy-l-bar-itm'><a className='pointer'><span className='opacity-lite'>Status</span><h3>{order?.status === ESTATUS.Approved ? 'Approved' :
                            ((order?.shippingDate && (new Date(order?.shippingDate) < new Date())) ? "Shipped" : 'Awaiting your approvel')}</h3></a></li>
                    </ul>
                    <div className='table-container inner-container flex-d flex-dir-column'>
                        <div className='flex-d search-table-tap'>
                            <div className='flex-d search-group'>
                                <input placeholder='Search....' onChange={(e: any) => setSearchKey(e.target.value)} />
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </div>
                            <div className='flex-d align-item-center'>
                                <button className='button button-white'>Add item</button>
                                <i className="fa fa-print fa-lg" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className='table-main'>
                            {(filteredOrders || [])?.length > 0 ?
                                <table >
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Product Name</th>
                                            <th>Brand</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredOrders?.map(item =>
                                            <tr key={item.id}>
                                                <OrderItemView id={item.id} />
                                            </tr>)
                                        }
                                    </tbody>
                                </table> :
                                <div className='flex-d just-center'>No Records found</div>}
                        </div>
                    </div>
                </nav>
            </div >
        </div >
        <UpdateStatusModel orderid={orderid} />
        <OrderItemEditAction />
    </>
}
export default React.memo(OrderManager);