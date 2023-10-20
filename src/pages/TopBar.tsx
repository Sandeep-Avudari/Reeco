import React from 'react';

const TopBar = () => {
    return <div className='nav-bar'>
        <div className="container">
            <nav className='flex-d'>
                <ul className='flex-d'>
                    <li className='flex-item'><a className='reeco-title'>Reeco</a></li>
                    <li className='flex-item'><a href='/store'>Store</a></li>
                    <li className='flex-item'><a href="/orders">Orders</a></li>
                    <li className='flex-item'><a href='/analytics'>Analytics</a></li>
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