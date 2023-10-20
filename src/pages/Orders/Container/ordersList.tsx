import React from 'react';
import { connect } from "react-redux";
import * as  Integration from '../../../store/integration';
import { IOrder, IOrdersModel } from '../../../Models/ordersModel';
import { resetOrdersReducer } from '../../../store/ordersSlice';
import OrderView from '../Components/orderView';
import { getAllOrdersList } from '../../../store/integration';

interface IProps {
    orders: IOrder[] | undefined;
    resetOrdersReducer: any;
    getAllOrdersList: any;
}

class OrdersList extends React.Component<IProps, any>{
    constructor(props: any) {
        super(props);
        this.state = { searchKey: '' };
    }
    componentDidMount() {
        this.props.resetOrdersReducer();
        !this.props.orders && this.props.getAllOrdersList();
    }
    componentWillUnmount() {
        this.props.resetOrdersReducer();
    }

    render() {
        let filterValues = this.state.searchKey ? this.props.orders?.filter(ite => ite.orderId.toLowerCase()?.includes(this.state.searchKey?.toLowerCase())) : this.props.orders
        return (
            <div className='body-container scroll-bar t-1'>
                {(this.props.orders || [])?.length > 0 ?
                    <div className="container">
                        <nav className='flex-d flex-dir-column'>
                            <div className='table-container inner-container flex-d flex-dir-column'>
                                <div className='flex-d search-table-tap'>
                                    <div className='flex-d search-group'>
                                        <input placeholder='Search....' onChange={(e) => this.setState({ searchKey: e.target.value })} />
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </div>
                                </div>
                                {(filterValues || [])?.length > 0 ? <div className='table-main orderList'>
                                    <table >
                                        <thead>
                                            <tr>
                                                <th>Order Id</th>
                                                <th>Supplier</th>
                                                <th>Ordered Date</th>
                                                <th>Shipping Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(this.props.orders || []).map(item => <tr key={item.id}>
                                                <OrderView item={item} />
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div> : <div className='flex-d just-center align-item-center max-h500'>No Orders found for Search</div>}
                            </div>
                        </nav>
                    </div> :
                    <div className='flex-d just-center align-item-center max-h500'>No Orders found for Request</div>}
            </div>
        )
    }
}
const mapStateToProps = (state: any) => ({ orders: (state.ordersReducer as IOrdersModel).orders });

export default connect(mapStateToProps, { resetOrdersReducer, getAllOrdersList })(OrdersList);
