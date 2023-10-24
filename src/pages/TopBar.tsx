import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {

    return <div className='nav-bar'>
        <div className="container">
            <nav className='flex-d'>
                <ul className='flex-d'>
                    <li className='flex-item'><a className='reeco-title'>Reeco</a></li>
                    <li className='flex-item'><Link to={'/store'} >Store</Link></li>
                    <li className='flex-item'><Link to={'/orders'} >Orders</Link></li>
                    <li className='flex-item'><Link to={'/analytics'} >Analytics</Link></li>
                </ul>
                <ul className='flex-d'>
                    <li className='flex-item'><a className='pointer'><i className="fa fa-shopping-cart" style={{ color: "white" }} aria-hidden="true"></i></a></li>
                    <li className='flex-item'><a className='pointer'>Hello, James</a></li>
                </ul>
            </nav>
        </div>
    </div>
}
export default React.memo(TopBar);