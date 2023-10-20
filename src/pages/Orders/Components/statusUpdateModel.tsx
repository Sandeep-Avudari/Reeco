import React from 'react';
import Modal from 'react-modal';
import { IOrderItem, IOrdersModel } from '../../../Models/ordersModel';
import { useSelector, useDispatch } from 'react-redux';
import { openUpdateStatusModel, updateOrderItemStatus } from '../../../store/ordersSlice';
import { ESTATUS } from '../../utilities';

const customStyles = {
    content: {
        top: '75%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '240px',
        borderRadius: "18px"
    },
};
const UpdateStatusModel = ({ orderid }: { orderid: string | undefined }) => {
    const dispatch = useDispatch() as any;
    const orderItem: IOrderItem | undefined = useSelector((state: any) => (state.ordersReducer as IOrdersModel).statusUpdateModelData);
    const handleItemStatus = (updatedStatus: number) => {
        dispatch(updateOrderItemStatus({ orderid, id: orderItem?.id, updatedStatus }))
    }
    let trimText = orderItem?.productName.slice(0, 30);
    return <Modal
        ariaHideApp={false}
        isOpen={Boolean(orderItem)}
        style={customStyles}
        overlayClassName="Overlay"
    >
        <div className='model-main flex-d flex-dir-column '>
            <div className='flex-d header-pop'><span className='str-opcty'>Missing Product</span><i className="fa fa-times action-icon" aria-hidden="true" onClick={() => dispatch(openUpdateStatusModel(undefined))}></i></div>
            <div>{`is ${trimText}${(orderItem?.productName?.length || 0) > (trimText?.length || 1) ? '...' : ''} Urgent ?`}</div>
            <div className='flex-d just-end'>
                <div>
                    <button type='button' className='button-m' onClick={() => handleItemStatus(ESTATUS.Missing)}>No</button>
                    <button type='button' className='button-m' onClick={() => handleItemStatus(ESTATUS.Missing_Urgent)}> Yes</button>
                </div>
            </div>
        </div>
    </Modal >
}
export default React.memo(UpdateStatusModel);